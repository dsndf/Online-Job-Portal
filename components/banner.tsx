import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, TriangleAlert } from "lucide-react";

const bannerVariant = cva(
  "p-4  text-center text-sm flex gap-2 items-center w-full rounded-md shadow-md",
  {
    variants: {
      variant: {
        warning:
          "dark:bg-yellow-500/20 dark:text-yellow-500 text-yellow-800 bg-yellow-500/50",
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
