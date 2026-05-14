declare module "*.css";
declare module "*.png";

declare module "@wordpress/blocks" {
  export function registerBlockType(name: string, settings: unknown): unknown;
}

declare module "@wordpress/block-editor" {
  export function useBlockProps(): Record<string, unknown>;
  export const InspectorControls: React.ComponentType<{
    children?: React.ReactNode;
  }>;
}

declare module "@wordpress/components" {
  export const PanelBody: React.ComponentType<{
    title?: string;
    initialOpen?: boolean;
    children?: React.ReactNode;
  }>;
  export const SelectControl: React.ComponentType<{
    label?: string;
    value?: string;
    options?: { label: string; value: string }[];
    onChange?: (value: string) => void;
  }>;
  export const Spinner: React.ComponentType;
  export const TextControl: React.ComponentType<{
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
  }>;
}
