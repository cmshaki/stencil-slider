import { newE2EPage } from "@stencil/core/testing";

describe("c-slider", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<c-slider></c-slider>");

    const element = await page.find("slider");
    expect(element).toHaveClass("hydrated");
  });

  it('contains a "Profile Page" button', async () => {
    const page = await newE2EPage();
    await page.setContent("<c-slider></c-slider>");

    const element = await page.find("app-home ion-content ion-button");
    expect(element.textContent).toEqual("Profile page");
  });
});
