import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Plane, ShoppingBag, Receipt, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResultCard from "./ResultCard";
import cardsData from "@/data/cards.json";
import { cn } from "@/lib/utils";

const OPTIONS = [
  {
    id: "travel",
    title: "Travel",
    icon: Plane,
    bullets: [
      "Free airport lounge access",
      "Airline miles & flight rewards",
      "Low or zero forex markup",
    ],
  },
  {
    id: "shopping",
    title: "Shopping",
    icon: ShoppingBag,
    bullets: [
      "Cashback on Amazon & Flipkart",
      "Rewards on Swiggy & Zomato",
      "Extra points on online shopping",
    ],
  },
  {
    id: "bills",
    title: "Bills & Utility",
    icon: Receipt,
    bullets: [
      "Fuel surcharge waiver at pumps",
      "Cashback on groceries & essentials",
      "Rewards on rent & bill payments",
    ],
  },
];

export default function QuizCard() {
  const [selected, setSelected] = useState<string | null>(null);
  const [results, setResults] = useState<any[] | null>(null);

  const handleContinue = () => {
    if (!selected) return;

    // Filter by category
    const filtered = cardsData.filter((c) => c.category === selected);

    // Ranking Logic: Prioritize "lifetime free" first, then break ties by number of benefits
    const ranked = [...filtered].sort((a, b) => {
      const aIsFree = a.joiningFee.toLowerCase().includes("lifetime free");
      const bIsFree = b.joiningFee.toLowerCase().includes("lifetime free");

      if (aIsFree && !bIsFree) return -1;
      if (!aIsFree && bIsFree) return 1;

      // Tie breaker: number of benefits
      return (b.benefits?.length || 0) - (a.benefits?.length || 0);
    });

    setResults(ranked.slice(0, 3));
  };

  const handleReset = () => {
    setSelected(null);
    setResults(null);
  };

  if (results) {
    return (
      <div
        id="quiz"
        className="mx-auto flex w-full max-w-4xl flex-col items-center py-12 scroll-mt-20"
      >
        <ResultCard results={results} onReset={handleReset} />
      </div>
    );
  }

  return (
    <div id="quiz" className="mx-auto w-full max-w-[540px] px-4 py-4 scroll-mt-20 mb-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl border border-border bg-card/60 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl p-6 sm:p-8"
      >
        <h2 className="mb-6 text-center text-2xl font-bold font-heading text-foreground">
          Which one do you prefer more?
        </h2>

        <div className="grid gap-4">
          {OPTIONS.map((option) => {
            const isSelected = selected === option.id;
            return (
              <motion.button
                key={option.id}
                onClick={() => setSelected(option.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={cn(
                  "relative flex flex-col items-start rounded-xl border p-4 text-left transition-all",
                  isSelected
                    ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(212,255,61,0.15)]"
                    : "border-border bg-background hover:border-primary/50 hover:bg-secondary",
                )}
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "grid size-10 place-items-center rounded-lg",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-foreground",
                      )}
                    >
                      <option.icon className="size-5" />
                    </span>
                    <span className="text-lg font-semibold text-foreground">{option.title}</span>
                  </div>
                  <div
                    className={cn(
                      "grid size-6 place-items-center rounded-full border",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/30",
                    )}
                  >
                    {isSelected && <Check className="size-4" />}
                  </div>
                </div>

                <div className="ml-[3.25rem] mt-3 space-y-1.5">
                  {option.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-lavender" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <Button
                onClick={handleContinue}
                className="cta-shimmer h-12 w-full bg-primary text-base font-bold text-primary-foreground hover:bg-primary/90"
              >
                Continue <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
