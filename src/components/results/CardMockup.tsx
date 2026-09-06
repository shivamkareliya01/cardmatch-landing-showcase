import { Wifi } from "lucide-react";
import { cn } from "@/lib/utils";
import { issuerLogos, networkLogos } from "@/data/logos";

interface CardMockupProps {
  name: string;
  issuer: string;
  network: string;
  className?: string;
}

export default function CardMockup({ name, issuer, network, className }: CardMockupProps) {
  const issuerConf = issuerLogos[issuer];
  const networkConf = networkLogos[network];

  if (!issuerConf && import.meta.env.DEV) {
    console.warn(`Missing issuer logo config for: "${issuer}"`);
  }
  if (!networkConf && import.meta.env.DEV) {
    console.warn(`Missing network logo config for: "${network}"`);
  }

  return (
    <div className={cn("relative mx-auto w-full max-w-sm perspective-[1000px]", className)}>
      <div className="relative aspect-[1.58/1] w-full rounded-2xl border border-white/10 bg-gradient-to-br from-[#1A1A2E] via-[#0D0D1A] to-[#050510] p-6 shadow-2xl overflow-hidden">
        {/* Glows */}
        <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/20 blur-[50px]" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-lavender/20 blur-[50px]" />

        {/* Top Row */}
        <div className="flex items-start justify-between relative z-10">
          
          {/* Issuer Badge */}
          {issuerConf ? (
            <div 
              className="flex items-center gap-1.5 px-2 py-0.5 rounded shadow-sm text-[10px] font-bold tracking-wider uppercase border border-white/10"
              style={{ backgroundColor: issuerConf.bg, color: issuerConf.fg }}
            >
              {issuerConf.text}
              {issuerConf.accent && (
                <div 
                  className="size-1.5 rounded-full" 
                  style={{ backgroundColor: issuerConf.accent }} 
                />
              )}
            </div>
          ) : (
            <div className="font-mono text-sm font-bold tracking-widest text-lavender uppercase">
              {issuer}
            </div>
          )}

          {/* Network Badge */}
          {networkConf ? (
            <div className="flex items-center gap-2">
              {networkConf.circles && (
                <div className="flex -space-x-1.5 opacity-90">
                  {networkConf.circles.map((color, i) => (
                    <div 
                      key={i} 
                      className="size-5 rounded-full mix-blend-screen" 
                      style={{ backgroundColor: color }} 
                    />
                  ))}
                </div>
              )}
              <div 
                className={cn(
                  "text-lg font-bold tracking-wide",
                  networkConf.style === "italic-wordmark" && "italic text-xl"
                )}
                style={{ color: networkConf.fg }}
              >
                {networkConf.text}
                {networkConf.accent && (
                  <span style={{ color: networkConf.accent }} className="ml-0.5 inline-block -translate-y-px">
                    ▶
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="text-sm font-bold text-lavender/80 italic">
              {network}
            </div>
          )}
        </div>

        {/* Chip */}
        <div className="mt-8 flex items-center gap-3 relative z-10">
          <div className="h-8 w-11 rounded bg-gradient-to-br from-yellow-200 to-yellow-600 shadow-inner overflow-hidden relative">
            <div className="absolute inset-y-0 left-1/2 w-[1px] bg-black/20" />
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/20" />
            <div className="absolute inset-x-0 top-1/4 h-[1px] bg-black/20" />
            <div className="absolute inset-x-0 bottom-1/4 h-[1px] bg-black/20" />
          </div>
          <Wifi className="size-5 rotate-90 text-white/60" />
        </div>

        {/* Number */}
        <div className="mt-6 flex justify-between font-mono text-lg tracking-[0.2em] text-white/90 drop-shadow-md relative z-10">
          <span>••••</span>
          <span>••••</span>
          <span>••••</span>
          <span>4186</span>
        </div>

        {/* Bottom Row */}
        <div className="mt-4 flex items-end justify-between relative z-10">
          <div className="font-medium text-white/90 uppercase tracking-widest truncate max-w-[200px] text-sm">
            {name}
          </div>
          <div className="font-mono text-xs text-white/50">VALID 12/28</div>
        </div>
      </div>
    </div>
  );
}
