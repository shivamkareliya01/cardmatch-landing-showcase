import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero-grid relative flex min-h-[70svh] flex-col justify-center pt-24 pb-8">
      <div className="mx-auto max-w-7xl px-5 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto mb-8 flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" />
            <span>60 seconds • 1 recommendation • NOT sponsored by any banks</span>
          </div>

          <h1 className="mx-auto max-w-4xl text-balance font-heading text-5xl font-bold leading-[1.1] tracking-tight sm:text-7xl">
            <span className="block text-foreground">Find the right credit card</span>
            <span className="block text-lavender mt-2">for you!</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-16 max-w-xl rounded-2xl border border-border bg-card/60 p-4 shadow-xl backdrop-blur-md"
        >
          <p className="text-sm font-medium text-foreground/80">
            Answer the question below to get started…
          </p>
        </motion.div>
      </div>
    </section>
  );
}
