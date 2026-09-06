import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SolutionSection() {
  const scrollToQuiz = () => {
    document.querySelector("#quiz")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold font-heading leading-tight text-primary sm:text-5xl">
            CardWise flips the model.
          </h2>
          <div className="mt-6 space-y-4 text-lg text-foreground/80">
            <p>Instead of showing you 100 cards, we ask a few smart questions.</p>
            <p>And give you the one card that actually fits your life.</p>
          </div>

          <Button
            onClick={scrollToQuiz}
            className="cta-shimmer mt-10 h-14 rounded-full bg-primary px-8 text-lg font-bold text-primary-foreground hover:bg-primary/90"
          >
            Find my best credit card <span className="ml-2">→</span>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -top-4 left-1/2 z-10 h-8 w-24 -translate-x-1/2 rotate-2 bg-white/10 backdrop-blur-sm shadow-sm" />
          <div className="sticky-note rounded-lg bg-primary p-8 text-primary-foreground shadow-2xl">
            <Sparkles className="mb-6 size-6" />
            <div className="space-y-4 font-mono text-xl font-bold">
              <p># NO ADS.</p>
              <p># NO SPONSORSHIP.</p>
              <p># NO DATA SHARED.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
