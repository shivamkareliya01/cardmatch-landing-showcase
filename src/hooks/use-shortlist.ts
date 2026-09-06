import { useState, useEffect } from "react";

export interface ShortlistedCard {
  id: string;
  slug: string;
  name: string;
  issuer: string;
  joiningFee: string;
  bestFor: string;
}

export function useShortlist() {
  const [shortlist, setShortlist] = useState<ShortlistedCard[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cardwise_shortlist");
    if (saved) {
      try {
        setShortlist(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse shortlist", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const addCard = (card: any) => {
    setShortlist((prev) => {
      if (prev.find((c) => c.id === card.id)) return prev;
      const newCard: ShortlistedCard = {
        id: card.id,
        slug: card.slug,
        name: card.name,
        issuer: card.issuer,
        joiningFee: card.joiningFee,
        bestFor: card.bestFor,
      };
      const updated = [...prev, newCard];
      localStorage.setItem("cardwise_shortlist", JSON.stringify(updated));
      return updated;
    });
  };

  const removeCard = (id: string) => {
    setShortlist((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      localStorage.setItem("cardwise_shortlist", JSON.stringify(updated));
      return updated;
    });
  };

  const isShortlisted = (id: string) => {
    return shortlist.some((c) => c.id === id);
  };

  return { shortlist, isLoaded, addCard, removeCard, isShortlisted };
}
