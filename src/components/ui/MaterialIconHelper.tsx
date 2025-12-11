import { cn } from "@/lib/utils";

interface IconProps {
  name: string;
  className?: string;
  filled?: boolean;
}

export const Icon = ({ name, className, filled }: IconProps) => {
  return (
    <span
      className={cn(
        "material-symbols-outlined select-none",
        filled && "fill",
        className
      )}
    >
      {name}
    </span>
  );
};
