import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

const backgroundVariant = cva(
  "rounded-full shadow-sm flex justify-center items-center w-fit",
  {
    variants: {
      variant: {
        default: "border border-secondary",
        success: "bg-emerald-100",
      },
      size: {
        default: "p-4",
        sm: "p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const iconVariant = cva("", {
  variants: {
    variant: {
      default: "text-primary",
      success: "text-emerald-700",
    },
    size: {
      default: "h-7 w-7",
      sm: "h-4 w-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type BackgroundVariantProps = VariantProps<typeof backgroundVariant>;
type IconVariantProps = VariantProps<typeof iconVariant>;

interface IconBadgeProps extends BackgroundVariantProps, IconVariantProps {
  icon: LucideIcon;
}

const IconBadge = ({ icon: Icon, variant, size }: IconBadgeProps) => {
  return (
    <div className={cn(backgroundVariant({ variant, size }))}>
      <Icon className={cn(iconVariant({ variant, size }))} />
    </div>
  );
};

export default IconBadge;
