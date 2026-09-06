import { useEffect, useState } from "react";
import { WalletCards, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import ShortlistDrawer from "./ShortlistDrawer";

export default function Navbar({
  showBack = false,
  onBack,
}: {
  showBack?: boolean;
  onBack?: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/80 py-3 shadow-sm backdrop-blur-md border-b border-border"
          : "bg-transparent py-5",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-4">
          {showBack && (
            <button
              onClick={onBack}
              className="grid size-8 place-items-center rounded-full bg-secondary/50 text-foreground transition-colors hover:bg-secondary"
            >
              <ChevronLeft className="size-5" />
            </button>
          )}
          <a href="/" className="flex items-center gap-2.5" aria-label="CardWise Home">
            <span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground shadow-[0_0_10px_rgba(212,255,61,0.3)]">
              <WalletCards className="size-4" strokeWidth={2.4} />
            </span>
            <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">
              CardWis<span className="text-primary">e</span>
            </span>
          </a>
        </div>

        <div>
          <ShortlistDrawer />
        </div>
      </div>
    </header>
  );
}
