import { newE2EPage } from "@stencil/core/testing";

describe("c-video", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<c-video></c-video>");

    const element = await page.find("c-video");
    expect(element).toHaveClass("hydrated");
  });

  it('contains a "Profile Page" button', async () => {
    const page = await newE2EPage();
    await page.setContent("<c-video></c-video>");

    const element = await page.find("app-home ion-content ion-button");
    expect(element.textContent).toEqual("Profile page");
  });
});
