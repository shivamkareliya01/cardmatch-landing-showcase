import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import QuizFlow from "@/components/quiz/QuizFlow";
import ResultPage from "@/components/results/ResultPage";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CardWise — Find Your Best Credit Card" },
      {
        name: "description",
        content: "Answer a few quick questions and get a clear, personalized credit card match.",
      },
    ],
  }),
  component: CardWiseApp,
});

function CardWiseApp() {
  const [results, setResults] = useState<any[] | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />

      {results ? (
        <main className="pt-24 pb-12">
          <ResultPage results={results} isFromQuiz={true} />
        </main>
      ) : (
        <main>
          <Hero />
          <QuizFlow
            onComplete={(data) => {
              setResults(data);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
          <ProblemSection />
          <SolutionSection />
        </main>
      )}

      <Footer />
    </div>
  );
}
