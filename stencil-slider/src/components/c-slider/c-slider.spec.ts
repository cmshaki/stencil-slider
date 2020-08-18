import { Slider } from "./c-slider";
import { newSpecPage } from "@stencil/core/testing";

describe("c-slider", () => {
  it("Checking methods and variables", async () => {
    const instance = new Slider();
    expect(instance.initialArr).toBeInstanceOf(Array);
    expect(instance.activeArr).toBeInstanceOf(Array);
    expect(instance.activeMap).toBeInstanceOf(Map);
  });
  it("Should render and provide access to props", async () => {
    const { root } = await newSpecPage({
      components: [Slider],
      html: "<c-slider></c-slider>"
    });
    expect(root.querySelector("c-image")).toBeTruthy();
    expect(root.querySelector("c-video")).toBeTruthy();
  });
});
