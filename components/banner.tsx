import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, TriangleAlert } from "lucide-react";

const bannerVariant = cva(
  "p-4 border text-center text-sm flex gap-2 items-center w-full rounded-md shadow-md",
  {
    variants: {
      variant: {
        warning: "bg-yellow-500/50 text-yellow-800",
        error: "bg-red-700/50 text-red-800",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  }
);

const iconMap = {
  warning: TriangleAlert,
  error: AlertCircle,
};

interface BannerProps extends VariantProps<typeof bannerVariant> {
  label: string;
}

const Banner = ({ label, variant }: BannerProps) => {
  const Icon = iconMap[variant || "warning"];
  return (
    <div className={cn(bannerVariant({ variant }))}>
      <Icon />
      {label}
    </div>
  );
};
export default Banner;
