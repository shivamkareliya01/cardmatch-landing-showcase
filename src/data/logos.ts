export interface LogoConfig {
  text: string;
  bg?: string;
  fg: string;
  accent?: string;
  style?: string;
  circles?: string[];
}

export const issuerLogos: Record<string, LogoConfig> = {
  "HDFC Bank": { text: "HDFC BANK", bg: "#004C8F", fg: "#FFFFFF" },
  "Axis Bank": { text: "AXIS BANK", bg: "#97144D", fg: "#FFFFFF" },
  "ICICI Bank": { text: "ICICI BANK", bg: "#B02A30", fg: "#F7941D" },
  "SBI Card": { text: "SBI Card", bg: "#22409A", fg: "#FFFFFF" },
  "HSBC Bank": { text: "HSBC", bg: "#DB0011", fg: "#FFFFFF" },
  "IndusInd Bank": { text: "IndusInd Bank", bg: "#A6192E", fg: "#FFFFFF" },
  "Federal Bank": { text: "Federal Bank", bg: "#00447C", fg: "#FCB316" },
  "IDFC FIRST Bank": { text: "IDFC FIRST Bank", bg: "#8B1874", fg: "#FFFFFF" },
  "American Express": { text: "AMEX", bg: "#016FD0", fg: "#FFFFFF" },
  "RBL Bank": { text: "RBL BANK", bg: "#EE3124", fg: "#FFFFFF" },
  "Standard Chartered Bank": { text: "Standard Chartered", bg: "#0473EA", fg: "#FFFFFF" },
  "Kotak Mahindra Bank": { text: "Kotak Mahindra Bank", bg: "#ED1C24", fg: "#FFFFFF" },
  "YES Bank": { text: "YES BANK", bg: "#003DA5", fg: "#FFFFFF", accent: "#EE3124" },
  "FPL Technologies / partner banks": { text: "OneCard", bg: "#0B0B1E", fg: "#D4FF3D" },
};

export const networkLogos: Record<string, LogoConfig> = {
  Visa: { text: "VISA", fg: "#FFFFFF", style: "italic-wordmark" },
  Mastercard: { text: "mastercard", fg: "#FFFFFF", circles: ["#EB001B", "#F79E1B"] },
  RuPay: { text: "RuPay", fg: "#FFFFFF", accent: "#F7941D" },
  "American Express": { text: "AMEX", fg: "#FFFFFF" },
  "Diners Club": { text: "Diners Club", fg: "#FFFFFF" },
};
