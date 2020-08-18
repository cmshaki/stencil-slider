import { newE2EPage } from "@stencil/core/testing";

describe("c-image", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<c-image></c-image>");

    const element = await page.find("c-image");
    expect(element).toHaveClass("hydrated");
  });

  it('contains a "Profile Page" button', async () => {
    const page = await newE2EPage();
    await page.setContent("<c-image></c-image>");

    const element = await page.find("app-home ion-content ion-button");
    expect(element.textContent).toEqual("Profile page");
  });
});
