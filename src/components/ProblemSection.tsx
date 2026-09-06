import { motion } from "framer-motion";
import { AlertCircle, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

const PROBLEMS = [
  { title: "Endless Lists", desc: "Hundreds of cards, no filter or guidance" },
  { title: "Biased Rankings", desc: "Paid placements shown as organic results" },
  { title: "Data Sold", desc: "Ask for data and share it with banks" },
  { title: "Spam Calls", desc: "Hound you to take 'that' credit card" },
];

export default function ProblemSection() {
  const scrollToQuiz = () => {
    document.querySelector("#quiz")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold font-heading tracking-tight text-foreground sm:text-5xl">
            Every credit card website looks the same.
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-16">
          <div className="grid gap-4 sm:grid-cols-2">
            {PROBLEMS.map((problem, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                className="relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-lg backdrop-blur-sm"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-destructive" />
                <div className="mb-4 inline-flex items-center gap-2 text-destructive">
                  <AlertCircle className="size-5" />
                  <h3 className="font-semibold text-foreground">{problem.title}</h3>
                </div>
                <p className="text-sm text-foreground/70">{problem.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto w-full max-w-sm perspective-[1000px]"
          >
            <div className="relative aspect-[1.58/1] w-full rotate-3 transform-gpu rounded-2xl border border-border bg-gradient-to-br from-secondary to-card p-8 shadow-2xl transition-transform hover:rotate-0 hover:scale-105 duration-500">
              <div className="flex justify-between">
                <span className="font-mono text-lg font-bold text-foreground">C/W</span>
                <CreditCard className="size-8 text-primary" />
              </div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="mb-6 h-8 w-10 rounded bg-primary/20" />
                <div className="flex justify-between text-sm tracking-widest text-muted-foreground">
                  <span>•••• 4026</span>
                  <span>PREMIUM</span>
                </div>
              </div>
            </div>

            {/* Decorative glows behind card */}
            <div className="absolute -inset-10 -z-10 rounded-full bg-destructive/10 blur-3xl" />
            <div className="absolute -inset-10 -z-10 translate-x-10 translate-y-10 rounded-full bg-primary/5 blur-3xl" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="mb-8 text-lg font-medium text-lavender sm:text-xl">
            And somehow... the 'best' card is always the one <em>they get paid to show you.</em>
          </p>
          <Button
            onClick={scrollToQuiz}
            className="cta-shimmer h-14 rounded-full bg-primary px-8 text-lg font-bold text-primary-foreground hover:bg-primary/90"
          >
            Find my best credit card <span className="ml-2">→</span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
