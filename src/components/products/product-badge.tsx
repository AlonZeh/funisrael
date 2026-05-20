import { Flame, Sparkles, Sun, Home, Camera, Plus, Baby } from "lucide-react";
import type { ProductBadge as BadgeType } from "@/lib/types";

const BADGES: Record<
  BadgeType,
  { label: string; icon: React.ReactNode; className: string }
> = {
  popular: {
    label: "פופולרי",
    icon: <Flame className="h-3 w-3" />,
    className: "badge-popular"
  },
  premium: {
    label: "פרימיום",
    icon: <Sparkles className="h-3 w-3" />,
    className: "badge-premium"
  },
  summer: {
    label: "להיט קיץ",
    icon: <Sun className="h-3 w-3" />,
    className: "badge-summer"
  },
  "indoor-friendly": {
    label: "אינדור-פרנדלי",
    icon: <Home className="h-3 w-3" />,
    className: "badge-indoor"
  },
  instagram: {
    label: "Instagram",
    icon: <Camera className="h-3 w-3" />,
    className: "badge-instagram"
  },
  new: {
    label: "חדש",
    icon: <Plus className="h-3 w-3" />,
    className: "badge-new"
  },
  "perfect-for-toddlers": {
    label: "מתאים לפעוטות",
    icon: <Baby className="h-3 w-3" />,
    className: "badge-toddler"
  }
};

export function ProductBadge({ type }: { type: BadgeType }) {
  const cfg = BADGES[type];
  return (
    <span className={cfg.className}>
      {cfg.icon}
      {cfg.label}
    </span>
  );
}
