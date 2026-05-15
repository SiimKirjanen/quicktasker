import { render, screen } from "@testing-library/react";
import SubmissionItem from "./SubmissionItem";

describe("SubmissionItem", () => {
  test("renders loading state when entry is undefined", () => {
    render(<SubmissionItem entry={undefined} />);
    expect(screen.getByText("Loading…")).toBeInTheDocument();
  });

  test("renders gone message when entry indicates task is gone", () => {
    render(<SubmissionItem entry={{ ok: false, gone: true }} />);
    expect(
      screen.getByText("This task is no longer available."),
    ).toBeInTheDocument();
  });

  test("renders error text when entry has an error", () => {
    render(<SubmissionItem entry={{ ok: false, error: "Boom" }} />);
    expect(screen.getByText("Boom")).toBeInTheDocument();
  });

  test("renders task name and stage when in progress", () => {
    render(
      <SubmissionItem
        entry={{
          ok: true,
          data: { name: "My task", is_done: false, stage_name: "To Do" },
        }}
      />,
    );
    expect(screen.getByText("My task")).toBeInTheDocument();
    expect(screen.getByText("To Do")).toBeInTheDocument();
  });

  test("renders Completed badge when task is done", () => {
    render(
      <SubmissionItem
        entry={{
          ok: true,
          data: { name: "Done task", is_done: true, stage_name: "Done" },
        }}
      />,
    );
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.queryByText("Done")).not.toBeInTheDocument();
  });

  test("falls back to 'In progress' when no stage_name", () => {
    render(
      <SubmissionItem
        entry={{ ok: true, data: { name: "x", is_done: false } }}
      />,
    );
    expect(screen.getByText("In progress")).toBeInTheDocument();
  });

  test("renders description when provided", () => {
    render(
      <SubmissionItem
        entry={{
          ok: true,
          data: { name: "x", is_done: false, description: "Details here" },
        }}
      />,
    );
    expect(screen.getByText("Details here")).toBeInTheDocument();
  });
});
