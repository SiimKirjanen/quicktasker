import { debounce } from "./debounce";

describe("debounce", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("invokes only the last call within the wait window", () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 100);
    debounced("a");
    debounced("b");
    debounced("c");
    expect(fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("c");
  });

  it("invokes again after the wait window elapses", () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 50);
    debounced("a");
    jest.advanceTimersByTime(50);
    debounced("b");
    jest.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
