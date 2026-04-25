import { formatPrice } from "@/lib/utils";

interface PriceFormatProps {
  price: number;
  className?: string;
}

export function PriceFormat({ price, className = "" }: PriceFormatProps) {
  return <span className={className}>{formatPrice(price)}</span>;
}
