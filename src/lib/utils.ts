export function formatPrice(price: number | null | undefined): string {
  if (price === null || price === undefined) {
    return "Na dotaz";
  }
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
    maximumFractionDigits: 0,
  }).format(price);
}
