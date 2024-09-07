import { Fieldset } from "@headlessui/react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

function WPQTFieldSet({ children, className }: Props) {
  return (
    <Fieldset
      className={`wpqt-space-y-6 wpqt-rounded-xl wpqt-p-6 wpqt-sm:p-10${className}`}
    >
      {children}
    </Fieldset>
  );
}

export { WPQTFieldSet };
