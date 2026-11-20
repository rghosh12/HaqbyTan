const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
export const price = (n: number) => usd.format(n);

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://haq.example";
export const SITE_NAME = "HAQ";
