import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tag } from "./index";

describe("Tag", () => {
  it("mounts with an inline (non-memoized) callback without an infinite update loop", () => {
    // Regression for "Maximum update depth exceeded": passing a fresh callback
    // reference every render must not trigger repeated state updates.
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(<Tag selectedTags={(items) => items} placeholder="add Options" />);

    const loopError = errorSpy.mock.calls.some((args) =>
      String(args[0]).includes("Maximum update depth exceeded")
    );
    expect(loopError).toBe(false);

    errorSpy.mockRestore();
  });

  it("notifies the parent with the new tags when a value is typed and Enter is pressed", async () => {
    const user = userEvent.setup();
    const onTags = vi.fn();

    render(<Tag selectedTags={onTags} placeholder="add Options" />);

    const input = screen.getByPlaceholderText("add Options");
    await user.type(input, "alpha{Enter}");

    expect(onTags).toHaveBeenLastCalledWith(["alpha"]);
    expect(screen.getByText("alpha")).toBeInTheDocument();
  });

  it("renders provided tags as chips without looping", () => {
    const onTags = vi.fn();

    render(<Tag selectedTags={onTags} tags={["one", "two"]} placeholder="add Options" />);

    expect(screen.getByText("one")).toBeInTheDocument();
    expect(screen.getByText("two")).toBeInTheDocument();
  });

  it("removes a chip and notifies the parent on delete", async () => {
    const user = userEvent.setup();
    const onTags = vi.fn();

    render(<Tag selectedTags={onTags} tags={["one", "two"]} placeholder="add Options" />);

    // MUI Chip delete control is a button/svg with a CancelIcon test id.
    const deleteIcons = screen.getAllByTestId("CancelIcon");
    await user.click(deleteIcons[0]);

    expect(onTags).toHaveBeenLastCalledWith(["two"]);
  });
});
