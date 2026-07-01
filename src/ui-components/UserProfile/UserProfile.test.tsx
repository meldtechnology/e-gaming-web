import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { UserProfile } from "./index";

describe("UserProfile", () => {
  it("renders the profile shell", () => {
    const markup = renderToStaticMarkup(
      <MemoryRouter>
        <UserProfile />
      </MemoryRouter>,
    );

    expect(markup).toContain("User Profile");
    expect(markup).toContain("Personal details");
  });
});
