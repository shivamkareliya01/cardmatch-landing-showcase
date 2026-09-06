import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import ResultPage from "@/components/results/ResultPage";
import Footer from "@/components/Footer";
import cardsData from "@/data/cards.json";

export const Route = createFileRoute("/cards/$slug")({
  component: CardDetailRoute,
  head: ({ match }) => {
    const slug = match.params.slug;
    const card = cardsData.find((c) => c.slug === slug);
    return {
      meta: [
        { title: `${card?.name || "Credit Card"} — CardWise` },
        { name: "description", content: card?.bestFor || "View credit card details." },
      ],
    };
  },
});

function CardDetailRoute() {
  const { slug } = Route.useParams();
  const search = Route.useSearch() as { from?: string };
  const card = cardsData.find((c) => c.slug === slug);

  if (!card) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <Navbar />
        <h1 className="text-3xl font-bold font-heading">Card not found</h1>
        <p className="mt-4 text-muted-foreground">
          The credit card you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  // Create an array with just this card so ResultPage works seamlessly
  const results = [card];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <main className="pt-24 pb-12">
        <ResultPage results={results} isFromQuiz={search.from === "results"} />
      </main>
      <Footer />
    </div>
  );
}
