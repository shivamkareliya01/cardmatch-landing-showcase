import { WalletCards } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/30 pb-12 pt-16 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 border-b border-border/50 pb-12 sm:grid-cols-[1fr_auto_auto] sm:gap-16">
          <div>
            <span className="flex items-center gap-2.5" aria-label="CardWise">
              <span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground">
                <WalletCards className="size-4" strokeWidth={2.4} />
              </span>
              <span className="text-xl font-bold tracking-tight text-foreground">
                CardWis<span className="text-primary">e</span>
              </span>
            </span>
            <p className="mt-4 max-w-xs text-sm leading-6 text-foreground/70">
              Find the best credit card in 60 seconds. No sign up. No spam. Answer a few questions
              and get a card suggestion that works best for your lifestyle.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-foreground">Explore</h3>
            <div className="mt-4 grid gap-3 text-sm text-foreground/70">
              <a href="#quiz" className="hover:text-primary transition-colors">
                Credit Cards
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                About
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Scoring Methodology
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Blog
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-foreground">Legal</h3>
            <div className="mt-4 grid gap-3 text-sm text-foreground/70">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms & Conditions
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 text-xs leading-5 text-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 CardWise. All rights reserved.</p>
          <p className="max-w-xl sm:text-right text-[10px] text-foreground/40">
            Card details are for illustrative purposes — always confirm current fees and benefits on
            the issuing bank's official website before applying.
          </p>
        </div>
      </div>
    </footer>
  );
}
