import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, CreditCard, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CardProps {
  card: any;
  rank: number;
}

function SingleResultCard({ card, rank }: CardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: rank * 0.1 }}
      className="mb-4 overflow-hidden rounded-2xl border border-border bg-card shadow-lg backdrop-blur-md"
    >
      <div className="cursor-pointer p-5 sm:p-6" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                #{rank}
              </span>
              <span className="text-xs font-semibold uppercase text-muted-foreground">
                {card.issuer}
              </span>
            </div>
            <h3 className="mt-2 text-xl font-bold text-foreground">{card.name}</h3>
          </div>
          <CreditCard className="size-8 text-primary shrink-0" />
        </div>

        <div className="mt-4 grid gap-2 text-sm text-foreground/80">
          <div className="flex justify-between border-b border-border/50 pb-2">
            <span className="text-muted-foreground">Joining Fee:</span>
            <span className="font-medium text-foreground text-right">{card.joiningFee}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Annual Fee:</span>
            <span className="font-medium text-foreground text-right">{card.annualFee}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center border-t border-border pt-3 text-xs font-medium text-lavender hover:text-primary transition-colors">
          {expanded ? "Hide details" : "See full details"}
          <ChevronDown
            className={`ml-1 size-4 transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-border bg-background/50 px-5 pb-5 pt-3 sm:px-6"
          >
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold text-primary">Key Benefits</h4>
                <ul className="mt-2 space-y-2">
                  {card.benefits.map((benefit: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span className="text-foreground/90">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-primary">Lounge Access</h4>
                <p className="mt-1 text-foreground/90">{card.loungeAccess}</p>
              </div>

              <div>
                <h4 className="font-semibold text-primary">Best For</h4>
                <p className="mt-1 text-foreground/90">{card.bestFor}</p>
              </div>

              {card.invite && (
                <div>
                  <h4 className="font-semibold text-primary">Eligibility</h4>
                  <p className="mt-1 text-foreground/90">{card.invite}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ResultCard({ results, onReset }: { results: any[]; onReset: () => void }) {
  return (
    <div className="w-full max-w-2xl px-4 sm:px-0">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 text-center">
        <h2 className="text-3xl font-bold font-heading text-foreground">Your Top Matches</h2>
        <p className="mt-2 text-lavender">We've ranked the best cards based on your preference.</p>
      </motion.div>

      {results.map((card, i) => (
        <SingleResultCard key={card.id} card={card} rank={i + 1} />
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <Button
          variant="outline"
          onClick={onReset}
          className="gap-2 border-border bg-background text-foreground hover:bg-secondary hover:text-foreground"
        >
          <RefreshCcw className="size-4" />
          Retake Quiz
        </Button>
      </motion.div>
    </div>
  );
}
