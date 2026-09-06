import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Link, useRouter } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  CheckCircle2,
  Home,
  ThumbsDown,
  ThumbsUp,
  ArrowRight,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CardMockup from "./CardMockup";
import EarnPointsList from "./EarnPointsList";
import ThingsToKnow from "./ThingsToKnow";
import { useShortlist } from "@/hooks/use-shortlist";
import { cn } from "@/lib/utils";

interface ResultPageProps {
  results: any[];
  isFromQuiz?: boolean;
}

export default function ResultPage({ results, isFromQuiz = false }: ResultPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const { addCard, removeCard, isShortlisted } = useShortlist();

  const card = results[currentIndex];
  const shortlisted = card ? isShortlisted(card.id) : false;

  useEffect(() => {
    if (isFromQuiz && currentIndex === 0) {
      // Fire confetti
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#D4FF3D", "#B8B5FF", "#FF69B4", "#FFD700"],
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#D4FF3D", "#B8B5FF", "#FF69B4", "#FFD700"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isFromQuiz, currentIndex]);

  if (!card) return null;

  const handleNextMatch = () => {
    setFeedback(null);
    setCurrentIndex((prev) => (prev + 1) % results.length);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShortlist = () => {
    if (shortlisted) {
      removeCard(card.id);
    } else {
      addCard(card);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6 md:py-16">
      <AnimatePresence mode="wait">
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {isFromQuiz && (
            <div className="mb-8 flex flex-col items-center">
              <span className="mb-2 rounded-full bg-primary/20 px-4 py-1 text-xs font-bold tracking-[0.2em] text-lavender uppercase">
                We found a perfect match!
              </span>
            </div>
          )}

          {/* Mockup */}
          <CardMockup
            name={card.name}
            issuer={card.issuer}
            network={card.network}
            className="mb-6 w-full max-w-sm sm:max-w-md"
          />

          <h1 className="text-center text-3xl font-bold font-heading text-foreground sm:text-4xl underline decoration-primary/50 underline-offset-4">
            {card.name}
          </h1>
          <p className="mt-2 text-center text-sm font-bold tracking-widest text-muted-foreground uppercase">
            {card.issuer}
          </p>

          <div className="mt-12 w-full space-y-12">
            {/* Why It Fits */}
            <section>
              <h2 className="mb-6 text-xl font-bold text-foreground">Why It Fits</h2>
              <div className="grid gap-4 sm:grid-cols-1">
                {card.whyItFits?.map((reason: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-sm"
                  >
                    <div className="grid size-8 shrink-0 place-items-center rounded-full bg-primary">
                      <Check className="size-5 text-primary-foreground" strokeWidth={3} />
                    </div>
                    <span className="text-lg font-medium text-foreground">{reason}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Fees */}
            <section className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-5 text-center shadow-sm">
                <div className="text-3xl font-bold text-foreground">
                  {card.joiningFee.toLowerCase().includes("free") ? "FREE" : card.joiningFee}
                </div>
                <div className="mt-2 text-xs font-bold tracking-widest text-muted-foreground">
                  JOINING FEE
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-5 text-center shadow-sm">
                <div className="text-3xl font-bold text-foreground">
                  {card.annualFee.toLowerCase().includes("free") ? "FREE" : card.annualFee}
                </div>
                <div className="mt-2 text-xs font-bold tracking-widest text-muted-foreground">
                  ANNUAL FEE
                </div>
              </div>
            </section>

            {/* Earn Points */}
            <section>
              <h2 className="mb-6 text-xl font-bold text-foreground">Earn Points</h2>
              <EarnPointsList categories={card.earnCategories || []} />
            </section>

            {/* Things to Know */}
            {card.thingsToKnow && card.thingsToKnow.length > 0 && (
              <section>
                <ThingsToKnow items={card.thingsToKnow} />
              </section>
            )}

            {/* Actions */}
            <section className="mt-12 flex flex-col items-center border-t border-border pt-12">
              <div className="mb-8 w-full">
                <Button
                  onClick={handleShortlist}
                  className="h-14 w-full bg-foreground text-background hover:bg-foreground/90 text-lg font-bold"
                >
                  {shortlisted ? (
                    <>
                      <CheckCircle2 className="mr-2 size-5 text-primary" />
                      Shortlisted
                    </>
                  ) : (
                    <>
                      <Bookmark className="mr-2 size-5" />
                      Shortlist Card
                    </>
                  )}
                </Button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Shortlisting will help you compare multiple credit cards.
                </p>
              </div>

              {isFromQuiz && (
                <>
                  <div className="mb-10 flex items-center justify-center gap-6">
                    <span className="text-sm font-medium text-foreground/80">
                      Did you find this recommendation helpful?
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setFeedback("up")}
                        className={cn(
                          "rounded-full border-border transition-colors",
                          feedback === "up" && "bg-primary/20 text-primary border-primary",
                        )}
                      >
                        <ThumbsUp className="size-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setFeedback("down")}
                        className={cn(
                          "rounded-full border-border transition-colors",
                          feedback === "down" &&
                            "bg-destructive/20 text-destructive border-destructive",
                        )}
                      >
                        <ThumbsDown className="size-4" />
                      </Button>
                    </div>
                  </div>

                  <Button
                    variant="link"
                    onClick={handleNextMatch}
                    className="group mb-6 text-base text-lavender hover:text-primary"
                  >
                    Check your next best match
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </>
              )}

              <Link
                to="/"
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <Home className="mr-2 size-4" />
                Homepage
              </Link>

              <p className="mt-8 max-w-sm text-center text-xs leading-5 text-muted-foreground/60">
                Recommendation based on your choices. No obligation to apply.
              </p>
            </section>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
