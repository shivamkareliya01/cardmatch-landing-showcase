import { motion, AnimatePresence } from "framer-motion";
import { Plane, ShoppingBag, Receipt, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export default function QuizCategoryStep({
  selectedCategory,
  onSelect,
  onContinue,
}: {
  selectedCategory?: string;
  onSelect: (val: string) => void;
  onContinue: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4 }}
      className="p-6 sm:p-8"
    >
      <h2 className="mb-6 text-center text-2xl font-bold font-heading text-foreground">
        Which one do you prefer more?
      </h2>

      <div className="grid gap-4">
        {OPTIONS.map((option) => {
          const isSelected = selectedCategory === option.id;
          return (
            <motion.button
              key={option.id}
              onClick={() => onSelect(option.id)}
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
                      "grid size-10 place-items-center rounded-lg transition-colors",
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
                    "grid size-6 place-items-center rounded-full border transition-colors",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/30 bg-transparent",
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
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 24 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <Button
              onClick={onContinue}
              className="cta-shimmer h-12 w-full bg-primary text-base font-bold text-primary-foreground hover:bg-primary/90"
            >
              Continue <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
