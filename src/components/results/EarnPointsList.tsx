import { Plus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Category {
  icon: string;
  label: string;
  rate: string;
  theme: string;
}

export default function EarnPointsList({ categories }: { categories: Category[] }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const themeMap: Record<string, string> = {
    pink: "text-pink-500 bg-pink-500/10 border-pink-500/20",
    orange: "text-orange-500 bg-orange-500/10 border-orange-500/20",
    purple: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    gold: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
    green: "text-green-500 bg-green-500/10 border-green-500/20",
  };

  return (
    <div className="grid gap-3">
      {categories.map((cat, idx) => {
        const isExpanded = expandedIndex === idx;
        const themeStyles = themeMap[cat.theme] || themeMap.blue;

        return (
          <div key={idx} className="rounded-xl border border-border bg-card overflow-hidden">
            <button
              onClick={() => setExpandedIndex(isExpanded ? null : idx)}
              className="flex w-full items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{cat.icon}</span>
                <span className="font-semibold text-foreground">{cat.label}</span>
              </div>
              <Plus
                className={cn(
                  "size-5 text-muted-foreground transition-transform duration-300",
                  isExpanded && "rotate-45",
                )}
              />
            </button>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t border-border/50 bg-background/30"
                >
                  <div className="p-4">
                    <div
                      className={cn(
                        "inline-flex items-center rounded-lg border px-3 py-1.5 text-sm font-semibold",
                        themeStyles,
                      )}
                    >
                      {cat.rate}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
