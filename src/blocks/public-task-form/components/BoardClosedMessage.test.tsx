import { render, screen } from "@testing-library/react";
import BoardClosedMessage from "./BoardClosedMessage";

describe("BoardClosedMessage", () => {
  test("shows disabled message when board is not enabled", () => {
    render(<BoardClosedMessage boardStatus={{ enabled: false }} />);
    expect(
      screen.getByText(
        "This board is not currently accepting task submissions.",
      ),
    ).toBeInTheDocument();
  });

  test("shows login-required message", () => {
    render(
      <BoardClosedMessage
        boardStatus={{ enabled: true, login_required: true }}
      />,
    );
    expect(
      screen.getByText(
        "You must be logged in as a WordPress user to submit a task to this board.",
      ),
    ).toBeInTheDocument();
  });

  test("shows limit-reached message", () => {
    render(
      <BoardClosedMessage
        boardStatus={{ enabled: true, limit_reached: true }}
      />,
    );
    expect(
      screen.getByText("This board has reached its submission limit."),
    ).toBeInTheDocument();
  });

  test("prefers disabled message over other flags", () => {
    render(
      <BoardClosedMessage
        boardStatus={{
          enabled: false,
          login_required: true,
          limit_reached: true,
        }}
      />,
    );
    expect(
      screen.getByText(
        "This board is not currently accepting task submissions.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("This board has reached its submission limit."),
    ).not.toBeInTheDocument();
  });

  test("renders nothing when board is open", () => {
    const { container } = render(
      <BoardClosedMessage boardStatus={{ enabled: true }} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
