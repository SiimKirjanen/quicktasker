import { act, fireEvent, render, screen } from "@testing-library/react";
import { WPQTMultiSelect } from "./WPQTMultiSelect";

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

const options = [
  { value: "1", label: "Board 1" },
  { value: "2", label: "Board 2" },
];

function renderSelect(props: {
  autoOpen?: boolean;
  onClose?: () => void;
  loadingValues?: string[];
  selectedValues?: string[];
  onSelectionChange?: (values: string[]) => void;
}) {
  return render(
    <WPQTMultiSelect
      id="boards"
      options={options}
      selectedValues={["1"]}
      onSelectionChange={jest.fn()}
      {...props}
    />,
  );
}

async function renderOpen(selectedValues: string[]) {
  const onSelectionChange = jest.fn();
  await act(async () => {
    renderSelect({ autoOpen: true, selectedValues, onSelectionChange });
  });
  return onSelectionChange;
}

describe("WPQTMultiSelect", () => {
  it("stays closed by default", () => {
    renderSelect({});

    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("opens on mount when autoOpen is set", async () => {
    await act(async () => {
      renderSelect({ autoOpen: true });
    });

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Board 2" })).toBeInTheDocument();
  });

  it("calls onClose when the open list closes", async () => {
    const onClose = jest.fn();
    await act(async () => {
      renderSelect({ autoOpen: true, onClose });
    });
    expect(onClose).not.toHaveBeenCalled();

    await act(async () => {
      fireEvent.keyDown(screen.getByRole("listbox"), { key: "Escape" });
    });

    expect(screen.queryByRole("listbox")).toBeNull();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("shows a spinner on the loading options", async () => {
    await act(async () => {
      renderSelect({ autoOpen: true, loadingValues: ["2"] });
    });

    const spinners = screen.getAllByTestId("multi-select-option-loading");
    expect(spinners).toHaveLength(1);
    expect(screen.getByRole("option", { name: "Board 2" })).toContainElement(
      spinners[0],
    );
    expect(screen.getByRole("option", { name: "Board 2" })).toHaveAttribute(
      "aria-busy",
      "true",
    );
    expect(screen.getByRole("button", { expanded: true })).toHaveAttribute(
      "aria-busy",
      "true",
    );
  });

  it("shows no spinners when nothing is loading", async () => {
    await act(async () => {
      renderSelect({ autoOpen: true });
    });

    expect(screen.queryByTestId("multi-select-option-loading")).toBeNull();
    expect(screen.getByRole("button", { expanded: true })).toHaveAttribute(
      "aria-busy",
      "false",
    );
  });

  it("uses custom trigger content in place of the select button", () => {
    render(
      <WPQTMultiSelect
        options={options}
        selectedValues={["1"]}
        onSelectionChange={jest.fn()}
        trigger="Change"
        ariaLabel="Change boards of Bob"
        buttonTestId="change"
      />,
    );

    const button = screen.getByTestId("change");
    expect(button).toHaveTextContent(/^Change$/);
    expect(button).toHaveAccessibleName("Change boards of Bob");
  });

  describe("select all and deselect all", () => {
    it("enables both when some options are selected", async () => {
      const onSelectionChange = await renderOpen(["1"]);

      fireEvent.mouseDown(screen.getByTestId("multi-select-reset"));
      expect(onSelectionChange).toHaveBeenLastCalledWith(["1", "2"]);

      fireEvent.mouseDown(screen.getByTestId("multi-select-deselect"));
      expect(onSelectionChange).toHaveBeenLastCalledWith([]);
    });

    it("keeps deselect all shown but disabled when nothing is selected", async () => {
      const onSelectionChange = await renderOpen([]);

      const deselect = screen.getByTestId("multi-select-deselect");
      expect(deselect).toHaveAttribute("aria-disabled", "true");
      fireEvent.mouseDown(deselect);
      expect(onSelectionChange).not.toHaveBeenCalled();
      expect(screen.getByTestId("multi-select-reset")).toHaveAttribute(
        "aria-disabled",
        "false",
      );
    });

    it("keeps select all shown but disabled when everything is selected", async () => {
      const onSelectionChange = await renderOpen(["1", "2"]);

      const reset = screen.getByTestId("multi-select-reset");
      expect(reset).toHaveAttribute("aria-disabled", "true");
      fireEvent.mouseDown(reset);
      expect(onSelectionChange).not.toHaveBeenCalled();
      expect(screen.getByTestId("multi-select-deselect")).toHaveAttribute(
        "aria-disabled",
        "false",
      );
    });

    it("does not count selected values that are not options", async () => {
      // As many values as options, but option 2 is not selected.
      const onSelectionChange = await renderOpen(["1", "9"]);

      expect(screen.getByTestId("multi-select-reset")).toHaveAttribute(
        "aria-disabled",
        "false",
      );
      expect(
        screen.getByRole("button", { expanded: true }),
      ).not.toHaveTextContent("All");
      fireEvent.mouseDown(screen.getByTestId("multi-select-reset"));
      expect(onSelectionChange).toHaveBeenLastCalledWith(["1", "2"]);
    });
  });
});
