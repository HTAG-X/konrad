type StavType = "Volné" | "Rezervace" | "Zamluveno" | "Prodáno";

interface StatusBadgeProps {
  stav: StavType;
  className?: string;
}

export function StatusBadge({ stav, className = "" }: StatusBadgeProps) {
  let badgeClass = "";

  switch (stav) {
    case "Volné":
      badgeClass = "badge-free";
      break;
    case "Rezervace":
      badgeClass = "badge-reserved";
      break;
    case "Zamluveno":
      badgeClass = "badge-booked";
      break;
    case "Prodáno":
      badgeClass = "badge-sold";
      break;
    default:
      badgeClass = "badge-free";
  }

  return <span className={`${badgeClass} ${className}`}>{stav}</span>;
}
