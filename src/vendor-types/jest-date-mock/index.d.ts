declare module "jest-date-mock" {
  export function set(date: string | number | Date): void;
  export function reset(): void;
  export function advanceBy(ms: number): void;
  export function advanceTo(date: string | number | Date): void;
  export function clear(): void;

  const mockDate: {
    set: typeof set;
    reset: typeof reset;
    advanceBy: typeof advanceBy;
    advanceTo: typeof advanceTo;
    clear: typeof clear;
  };

  export default mockDate;
}
