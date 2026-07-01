import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "./Pagination";

describe("Pagination primitive", () => {
  it("disables previous and next at collection bounds", async () => {
    const user = userEvent.setup();
    const onPrevious = vi.fn();
    const onNext = vi.fn();

    render(
      <Pagination
        pageInfo={{ page: 1, totalPages: 1, previous: 0, next: 0 }}
        onPrevious={onPrevious}
        onNext={onNext}
      />,
    );

    const previous = screen.getByRole("button", { name: "Previous" });
    const next = screen.getByRole("button", { name: "Next" });

    expect(previous).toBeDisabled();
    expect(next).toBeDisabled();

    await user.click(previous);
    await user.click(next);

    expect(onPrevious).not.toHaveBeenCalled();
    expect(onNext).not.toHaveBeenCalled();
  });

  it("enables both directions when page info exposes previous and next pages", async () => {
    const user = userEvent.setup();
    const onPrevious = vi.fn();
    const onNext = vi.fn();

    render(
      <Pagination
        pageInfo={{ page: 2, totalPages: 3, previous: 1, next: 3 }}
        onPrevious={onPrevious}
        onNext={onNext}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Previous" }));
    await user.click(screen.getByRole("button", { name: "Next" }));

    expect(onPrevious).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
