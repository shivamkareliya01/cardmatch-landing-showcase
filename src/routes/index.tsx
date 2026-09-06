import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Plane,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Utensils,
  WalletCards,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CardMatch — Find Your Best Credit Card" },
      {
        name: "description",
        content: "Answer a few quick questions and get a clear, personalized credit card match.",
      },
      { property: "og:title", content: "CardMatch — Find Your Best Credit Card" },
      {
        property: "og:description",
        content: "A smarter, simpler way to find the right credit card for how you spend.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: CardMatchPage,
});

const choices = [
  { label: "Travel", detail: "Flights, hotels & lounge access", icon: Plane },
  { label: "Cash back", detail: "Everyday value, kept simple", icon: CircleDollarSign },
  { label: "Dining", detail: "Restaurants, delivery & nights out", icon: Utensils },
  { label: "Everyday", detail: "Groceries, gas & daily spending", icon: ShoppingBag },
];

function scrollToQuiz() {
  document.querySelector("#quiz")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function BrandMark() {
  return (
    <span className="flex items-center gap-2.5" aria-label="CardMatch">
      <span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground">
        <WalletCards className="size-4" strokeWidth={2.4} />
      </span>
      <span className="text-[1.05rem] font-bold tracking-normal text-foreground">CardMatch</span>
    </span>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn("reveal", className)}>
      {children}
    </div>
  );
}

function Quiz() {
  const [selected, setSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState(false);

  if (matched) {
    return (
      <div className="quiz-panel overflow-hidden" aria-live="polite">
        <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <span className="eyebrow text-primary"><Sparkles className="size-3.5" /> Your match</span>
            <h3 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">The Meridian Reserve</h3>
            <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
              A strong fit for {selected?.toLowerCase()} rewards, with flexible points and no foreign transaction fees.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                ["3×", "Top category"],
                ["60K", "Welcome points"],
                ["$0", "Foreign fees"],
              ].map(([value, label]) => (
                <div key={label} className="border-l border-border pl-3">
                  <div className="text-xl font-semibold text-foreground">{value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
            <Button className="cta-shimmer mt-7 h-12 px-6" onClick={() => setMatched(false)}>
              View full match <ArrowRight />
            </Button>
          </div>
          <div className="match-card relative mx-auto aspect-[1.58/1] w-full max-w-sm rotate-2 p-6">
            <div className="flex items-start justify-between">
              <WalletCards className="size-8 text-primary" />
              <span className="text-xs font-semibold uppercase text-foreground">Meridian</span>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="mb-4 h-6 w-8 rounded-sm bg-accent/70" />
              <div className="flex justify-between text-xs text-muted-foreground"><span>•••• 4492</span><span>RESERVE</span></div>
            </div>
          </div>
        </div>
        <button className="restart-link" onClick={() => { setSelected(null); setMatched(false); }}>
          <RotateCcw className="size-3.5" /> Start over
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-panel p-5 sm:p-8">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 border-b border-border pb-5">
        <div className="min-w-0">
          <span className="eyebrow text-accent">Question 1 of 3</span>
          <h3 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">What do you want your card to do?</h3>
        </div>
        <span className="shrink-0 text-xs font-medium text-muted-foreground">~ 60 sec</span>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {choices.map(({ label, detail, icon: Icon }) => {
          const active = selected === label;
          return (
            <button
              key={label}
              type="button"
              aria-pressed={active}
              onClick={() => setSelected(label)}
              className={cn("quiz-choice", active && "quiz-choice-active")}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-secondary text-secondary-foreground"><Icon className="size-5" /></span>
              <span className="min-w-0 text-left"><strong className="block text-sm text-foreground">{label}</strong><span className="mt-0.5 block text-xs text-muted-foreground">{detail}</span></span>
              <span className="choice-check">{active && <Check className="size-3.5" />}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="h-1 overflow-hidden rounded-full bg-secondary"><div className="h-full w-1/3 rounded-full bg-primary" /></div>
        <Button disabled={!selected} className="cta-shimmer h-11 px-5" onClick={() => setMatched(true)}>
          Continue <ArrowRight />
        </Button>
      </div>
    </div>
  );
}

function CardMatchPage() {
  const [quizVisible, setQuizVisible] = useState(false);

  useEffect(() => {
    const quiz = document.querySelector("#quiz");
    if (!quiz) return;
    const observer = new IntersectionObserver(
      ([entry]) => setQuizVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.08 },
    );
    observer.observe(quiz);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <header className="absolute inset-x-0 top-0 z-30 border-b border-border/60">
        <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center px-5 sm:px-8">
          <BrandMark />
          <Button variant="ghost" className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline-flex" onClick={scrollToQuiz}>How it works <ChevronDown /></Button>
          <Button size="icon" variant="ghost" aria-label="Go to quiz" className="sm:hidden" onClick={scrollToQuiz}><ChevronDown /></Button>
        </div>
      </header>

      <section className="hero-grid relative min-h-[92svh] border-b border-border pt-32 sm:pt-36">
        <div className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="eyebrow mx-auto w-fit text-primary"><Sparkles className="size-3.5" /> Smarter card discovery</div>
            <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.02] tracking-normal sm:text-7xl lg:text-[5.5rem]">
              Your spending has a pattern. <span className="text-accent">Your card should match it.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
              Skip the comparison charts. Answer a few simple questions and find a card that fits how you actually live.
            </p>
            <Button size="lg" className="cta-shimmer mt-8 h-13 px-7 text-sm" onClick={scrollToQuiz}>Find my match <ArrowRight /></Button>
            <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Clock3 className="size-3.5 text-primary" /> Takes 60 seconds</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="size-3.5 text-primary" /> No credit check</span>
            </div>
          </div>
          <div id="quiz" className="mx-auto mt-14 max-w-4xl scroll-mt-24"><Quiz /></div>
        </div>
      </section>

      <section id="how" className="bg-surface py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <span className="eyebrow text-lavender">The old way</span>
              <h2 className="mt-5 max-w-lg text-4xl font-semibold leading-tight sm:text-5xl">Choosing a card shouldn’t feel like homework.</h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
              {[
                ["47 open tabs", "Every review says something different."],
                ["Tiny-print math", "Points, caps, credits, exceptions."],
                ["Biased lists", "The top card is rarely your top card."],
                ["Decision fatigue", "More research. Still no clear answer."],
              ].map(([title, copy], index) => (
                <article key={title} className="bg-card p-6 sm:p-7">
                  <span className="text-xs font-semibold text-primary">0{index + 1}</span>
                  <h3 className="mt-8 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-24">
          <Reveal className="relative min-h-[340px] sm:min-h-[440px]">
            <div className="tilted-card absolute left-[8%] top-8 aspect-[1.58/1] w-[72%] -rotate-6 p-6 sm:p-8">
              <div className="flex justify-between"><span className="text-sm font-bold">M/01</span><CreditCard className="size-6 text-primary" /></div>
              <div className="absolute bottom-7 left-7 text-sm text-muted-foreground">Built around your life</div>
            </div>
            <div className="sticky-note absolute bottom-1 right-[3%] w-48 rotate-3 p-5 sm:w-56 sm:p-6">
              <Sparkles className="size-5" />
              <p className="mt-5 text-lg font-semibold leading-6 text-background">The best card isn’t universal. It’s personal.</p>
            </div>
          </Reveal>
          <Reveal>
            <span className="eyebrow text-primary">A better match</span>
            <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">Clear answers, based on what matters to you.</h2>
            <p className="mt-6 text-base leading-7 text-muted-foreground">CardMatch turns your priorities into a focused recommendation. No endless tables, no finance degree required.</p>
            <ul className="mt-8 space-y-4">
              {["Personalized to your spending", "Plain-English tradeoffs", "Independent, focused guidance"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm"><span className="grid size-6 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="size-3.5" /></span>{item}</li>
              ))}
            </ul>
            <Button className="cta-shimmer mt-9 h-12 px-6" onClick={scrollToQuiz}>Find my card <ArrowRight /></Button>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-lavender py-20 text-background sm:py-24">
        <Reveal className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <span className="eyebrow text-background/70">Ready when you are</span>
          <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl">One minute. One clear match.</h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-background/70">Tell us what matters. We’ll narrow the field and show you why your match fits.</p>
          <Button className="mt-8 h-12 bg-background px-6 text-foreground shadow-none hover:bg-background/90" onClick={scrollToQuiz}>Start the quiz <ArrowRight /></Button>
        </Reveal>
      </section>

      <footer id="privacy" className="bg-surface pb-28 pt-14 sm:pb-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 border-b border-border pb-12 sm:grid-cols-[1fr_auto_auto] sm:gap-16">
            <div><BrandMark /><p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">A simpler way to find the credit card that fits your priorities.</p></div>
            <div><h3 className="text-xs font-semibold uppercase text-foreground">Explore</h3><div className="mt-4 grid gap-3 text-sm text-muted-foreground"><button className="text-left hover:text-foreground" onClick={scrollToQuiz}>Take the quiz</button><a href="#how" className="hover:text-foreground">How it works</a></div></div>
            <div><h3 className="text-xs font-semibold uppercase text-foreground">Company</h3><div className="mt-4 grid gap-3 text-sm text-muted-foreground"><a href="mailto:hello@cardmatch.example" className="hover:text-foreground">Contact</a><a href="#privacy" className="hover:text-foreground">Privacy</a></div></div>
          </div>
          <div className="mt-6 flex flex-col gap-3 text-xs leading-5 text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><p>© 2026 CardMatch. All rights reserved.</p><p className="max-w-2xl sm:text-right">CardMatch provides educational recommendations, not financial advice. Terms and eligibility vary by issuer.</p></div>
        </div>
      </footer>

      <div className={cn("fixed inset-x-3 bottom-3 z-40 transition-all sm:hidden", quizVisible && "pointer-events-none translate-y-20 opacity-0")}>
        <Button className="cta-shimmer h-12 w-full shadow-xl" onClick={scrollToQuiz}>Find my match <ArrowRight /></Button>
      </div>
    </main>
  );
}