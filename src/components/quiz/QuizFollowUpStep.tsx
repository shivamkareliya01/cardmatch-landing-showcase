import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { QuizStep } from "@/lib/quiz-logic";
import { cn } from "@/lib/utils";

export default function QuizFollowUpStep({
  step,
  selectedValue,
  progress,
  onSelect,
  onBack,
}: {
  step: QuizStep;
  selectedValue?: string;
  progress: number;
  onSelect: (val: string) => void;
  onBack: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col"
    >
      {/* Progress Bar Header */}
      <div className="relative border-b border-border p-4 pb-0">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="mr-1 size-4" />
            Back
          </button>
          <span className="text-xs font-bold tracking-widest text-lavender uppercase">
            {Math.round(progress)}% Complete
          </span>
        </div>

        {/* Track */}
        <div className="absolute bottom-0 left-0 h-1 w-full bg-accent/30">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-primary"
          />
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <h2 className="mb-8 text-2xl font-bold font-heading text-foreground">{step.question}</h2>

        <div className="grid gap-4">
          {step.options.map((option) => {
            const isSelected = selectedValue === option.value;
            return (
              <motion.button
                key={option.value}
                onClick={() => onSelect(option.value)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={cn(
                  "relative flex items-center justify-between rounded-xl border p-5 text-left transition-all",
                  isSelected
                    ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(212,255,61,0.15)]"
                    : "border-border bg-background hover:border-primary/50 hover:bg-secondary",
                )}
              >
                <span className="text-base font-medium text-foreground pr-4">{option.label}</span>
                <div
                  className={cn(
                    "grid size-5 shrink-0 place-items-center rounded-full border-2 transition-colors",
                    isSelected
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/30 bg-transparent",
                  )}
                >
                  {isSelected && <div className="size-2 rounded-full bg-primary-foreground" />}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
