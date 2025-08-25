import type { LabelHTMLAttributes } from "react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  labelFor?: string;
  className?: string;
} & Omit<LabelHTMLAttributes<HTMLLabelElement>, "htmlFor" | "className">;

function WPQTLabel({ children, labelFor, className = "", ...rest }: Props) {
  return (
    <label htmlFor={labelFor} className={`wpqt-mb-1 ${className}`} {...rest}>
      {children}
    </label>
  );
}

export { WPQTLabel };
