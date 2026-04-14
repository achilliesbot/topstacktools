export default function RatingBadge({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const isHigh = rating >= 8.5;
  const isMid = rating >= 7 && rating < 8.5;

  const colorClasses = isHigh
    ? "bg-evergreen/10 text-evergreen"
    : isMid
    ? "bg-wood/10 text-wood"
    : "bg-red/10 text-red";

  const sizeClasses = {
    sm: "text-xs px-2.5 py-1 rounded-lg",
    md: "text-sm px-3 py-1.5 rounded-xl",
    lg: "text-2xl px-4 py-2 rounded-2xl font-bold",
  };

  return (
    <span className={`inline-flex items-center font-bold tabular-nums ${colorClasses} ${sizeClasses[size]}`}>
      {rating.toFixed(1)}
    </span>
  );
}
