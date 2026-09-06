import { Trash2, Bookmark } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useShortlist } from "@/hooks/use-shortlist";

export default function ShortlistDrawer() {
  const { shortlist, removeCard, isLoaded } = useShortlist();

  if (!isLoaded) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-white/10 text-white rounded-full"
        >
          <Bookmark className="size-5" />
          {shortlist.length > 0 && (
            <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {shortlist.length}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md border-l border-border bg-background/95 backdrop-blur-xl flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-left font-heading text-xl text-foreground flex items-center gap-2">
            <Bookmark className="size-5 text-primary" />
            Your Shortlist
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex-1 overflow-y-auto">
          {shortlist.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
              <Bookmark className="mb-4 size-12 opacity-20" />
              <p>Your shortlist is empty.</p>
              <p className="mt-2 text-sm">Take the quiz to find cards you like.</p>
            </div>
          ) : (
            <div className="grid gap-4 pr-4">
              {shortlist.map((card) => (
                <div
                  key={card.id}
                  className="relative rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:bg-secondary/30"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                        {card.issuer}
                      </p>
                      <Link
                        to="/cards/$slug"
                        params={{ slug: card.slug }}
                        search={{ from: "results" }}
                        className="mt-1 text-base font-bold text-foreground hover:underline"
                      >
                        {card.name}
                      </Link>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCard(card.id)}
                      className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive -mr-2 -mt-2"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded bg-background/50 p-2">
                      <span className="text-muted-foreground block mb-0.5">Fee</span>
                      <span className="font-semibold text-foreground truncate block">
                        {card.joiningFee}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-foreground/80 line-clamp-2 leading-relaxed">
                    <span className="text-primary font-medium mr-1">Best for:</span>
                    {card.bestFor}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
