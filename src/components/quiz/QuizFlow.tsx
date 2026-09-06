import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import QuizCategoryStep from "./QuizCategoryStep";
import QuizFollowUpStep from "./QuizFollowUpStep";
import {
  QuizAnswers,
  TRAVEL_STEPS,
  SHOPPING_BILLS_STEPS,
  calculateRecommendation,
} from "@/lib/quiz-logic";

export default function QuizFlow({ onComplete }: { onComplete: (results: any[]) => void }) {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  // -1 represents the category step
  const [stepIndex, setStepIndex] = useState(-1);

  const activeBranch =
    answers.category === "travel" ? TRAVEL_STEPS : answers.category ? SHOPPING_BILLS_STEPS : [];

  const handleCategorySelect = (category: string) => {
    setAnswers({ category });
  };

  const handleCategoryContinue = () => {
    if (answers.category) {
      setStepIndex(0);
    }
  };

  const handleStepSelect = (value: string) => {
    const currentStep = activeBranch[stepIndex];
    const newAnswers = { ...answers, [currentStep.id]: value };
    setAnswers(newAnswers);

    // Auto-advance after a tiny delay for the glow effect to register
    setTimeout(() => {
      if (stepIndex < activeBranch.length - 1) {
        setStepIndex(stepIndex + 1);
      } else {
        // Finished!
        const results = calculateRecommendation(newAnswers);
        onComplete(results);
      }
    }, 300);
  };

  const handleBack = () => {
    if (stepIndex === 0) {
      setStepIndex(-1); // Back to category
    } else {
      setStepIndex(stepIndex - 1);
    }
  };

  const progress = stepIndex >= 0 ? ((stepIndex + 1) / activeBranch.length) * 100 : 0;

  return (
    <div id="quiz" className="mx-auto w-full max-w-[540px] px-4 py-4 scroll-mt-20 mb-24">
      <div className="rounded-2xl border border-border bg-card/60 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl overflow-hidden">
        <AnimatePresence mode="wait">
          {stepIndex === -1 ? (
            <QuizCategoryStep
              key="category"
              selectedCategory={answers.category}
              onSelect={handleCategorySelect}
              onContinue={handleCategoryContinue}
            />
          ) : (
            <QuizFollowUpStep
              key={`step-${stepIndex}`}
              step={activeBranch[stepIndex]}
              selectedValue={answers[activeBranch[stepIndex].id as keyof QuizAnswers]}
              progress={progress}
              onSelect={handleStepSelect}
              onBack={handleBack}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
