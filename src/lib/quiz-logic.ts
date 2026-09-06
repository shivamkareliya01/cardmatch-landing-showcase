import cardsData from "../data/cards.json";

export interface QuizAnswers {
  category?: string;
  travelMeaning?: string;
  travelFreq?: string;
  upi?: string;
  rewardsCap?: string;
  feeTolerance?: string;
  monthlyExpense?: string;
}

export interface QuizStep {
  id: keyof QuizAnswers;
  question: string;
  options: { label: string; value: string }[];
}

export const TRAVEL_STEPS: QuizStep[] = [
  {
    id: "travelMeaning",
    question: "What does 'travel card' mean to you?",
    options: [
      { label: "Free lounge access at airports", value: "lounge" },
      { label: "Paying less on international transactions", value: "forex" },
    ],
  },
  {
    id: "travelFreq",
    question: "How often do you fly?",
    options: [
      { label: "2+ flights per month", value: "high" },
      { label: "1–2 flights per month", value: "med" },
      { label: "Few times a year", value: "low" },
    ],
  },
  {
    id: "feeTolerance",
    question: "How do you feel about annual fees?",
    options: [
      { label: "No fee — ever", value: "0" },
      { label: "Not free, but under ₹500/year", value: "500" },
      { label: "₹500 – ₹2,000/year is fine", value: "2000" },
      { label: "₹2,000 – ₹5,000/year is fine", value: "5000" },
      { label: "Doesn't matter — just show me the best", value: "unlimited" },
    ],
  },
  {
    id: "monthlyExpense",
    question: "How much is your total monthly expense?",
    options: [
      { label: "Under ₹15,000", value: "low" },
      { label: "₹15,000 – ₹50,000", value: "med" },
      { label: "₹50,000+", value: "high" },
    ],
  },
];

export const SHOPPING_BILLS_STEPS: QuizStep[] = [
  {
    id: "upi",
    question: "Do you need UPI support?",
    options: [
      { label: "Yes, I need UPI", value: "yes" },
      { label: "Doesn't matter", value: "no" },
    ],
  },
  {
    id: "rewardsCap",
    question: "What kind of rewards do you need?",
    options: [
      { label: "Higher benefits, with a monthly limit", value: "capped" },
      { label: "Lower benefits, with no monthly limits", value: "uncapped" },
    ],
  },
  {
    id: "feeTolerance",
    question: "How do you feel about annual fees?",
    options: [
      { label: "No fee — ever", value: "0" },
      { label: "Not free, but under ₹500/year", value: "500" },
      { label: "₹500 – ₹2,000/year is fine", value: "2000" },
      { label: "₹2,000 – ₹5,000/year is fine", value: "5000" },
      { label: "Doesn't matter — just show me the best", value: "unlimited" },
    ],
  },
  {
    id: "monthlyExpense",
    question: "How much is your total monthly expense?",
    options: [
      { label: "Under ₹15,000", value: "low" },
      { label: "₹15,000 – ₹50,000", value: "med" },
      { label: "₹50,000+", value: "high" },
    ],
  },
];

function extractFeeAmount(feeStr: string): number {
  if (feeStr.toLowerCase().includes("free") || feeStr === "₹0") return 0;
  const match = feeStr.match(/₹([\d,]+)/);
  if (match) {
    return parseInt(match[1].replace(/,/g, ""), 10);
  }
  return 0;
}

export function calculateRecommendation(answers: QuizAnswers) {
  // Base filter by category
  const validCards = cardsData.filter((c) => c.category === answers.category);

  // Score and rank cards
  const scored = validCards.map((card) => {
    let score = 0;
    const fee = extractFeeAmount(card.annualFee);
    const benefitsText = card.benefits.join(" ").toLowerCase();

    // 1. Fee Tolerance Filter/Weighting
    if (answers.feeTolerance) {
      if (answers.feeTolerance === "0" && fee > 0) {
        score -= 1000; // Heavily penalize if they want free but it's not
      } else if (answers.feeTolerance !== "unlimited") {
        const maxFee = parseInt(answers.feeTolerance, 10);
        if (fee > maxFee) {
          score -= 500; // Penalize if above tolerance
        } else if (fee === 0) {
          score += 10; // Bonus for free cards if within tolerance
        }
      }
    }

    // 2. Monthly Expense Weighting
    if (answers.monthlyExpense) {
      const inviteRequired =
        card.invite?.toLowerCase().includes("invite") ||
        card.invite?.toLowerCase().includes("high income");
      if (answers.monthlyExpense === "low") {
        if (fee >= 5000 || inviteRequired) score -= 1000;
        else if (fee <= 500) score += 20;
      } else if (answers.monthlyExpense === "high") {
        if (fee >= 5000 || inviteRequired) score += 30; // High spenders benefit more from premium cards
      }
    }

    // 3. Category Specific Logic
    if (answers.category === "travel") {
      // Travel meaning
      if (answers.travelMeaning === "lounge") {
        if (card.loungeAccess && !card.loungeAccess.toLowerCase().includes("not included")) {
          score += 30;
          if (card.loungeAccess.toLowerCase().includes("unlimited")) score += 20;
        } else {
          score -= 50;
        }
      } else if (answers.travelMeaning === "forex") {
        if (benefitsText.includes("forex") || benefitsText.includes("international")) {
          score += 30;
        }
      }

      // Travel Frequency
      if (answers.travelFreq === "high") {
        if (card.loungeAccess?.toLowerCase().includes("unlimited")) score += 40;
        if (fee >= 5000) score += 20; // Premium cards are better for high freq
      } else if (answers.travelFreq === "low") {
        if (fee <= 1000) score += 20;
      }
    } else {
      // Shopping / Bills Logic
      // UPI support
      if (answers.upi === "yes") {
        if (card.network === "RuPay" || benefitsText.includes("upi")) {
          score += 100; // Strong bonus for UPI
        } else {
          score -= 100;
        }
      }

      // Rewards Cap
      if (answers.rewardsCap === "capped") {
        if (benefitsText.includes("cap") || benefitsText.includes("limit")) score += 20;
      } else if (answers.rewardsCap === "uncapped") {
        if (benefitsText.includes("unlimited") || benefitsText.includes("uncapped")) score += 30;
      }
    }

    // Tie-breaker using benefits count
    score += card.benefits?.length || 0;

    return { card, score };
  });

  // Sort descending
  scored.sort((a, b) => b.score - a.score);

  return scored.map((s) => s.card);
}
