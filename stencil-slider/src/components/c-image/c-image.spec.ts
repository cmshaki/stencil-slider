import { CloudinaryImage } from "./c-image";
import { newSpecPage } from "@stencil/core/testing";

describe("c-image", () => {
  it("Should render while giving access to props", async () => {
    const { root } = await newSpecPage({
      components: [CloudinaryImage],
      html: `<c-image width="7" height="7" crop="scale" account="dijazdrvc" alias="papers.co-be05-space-stuart-fantacy-art-illustration-blue-red-1366x768_gxydwm"></c-image>`
    });
    expect(root.width).toEqual("w_7,");
    expect(root.height).toEqual("h_7,");
    expect(root.crop).toEqual("c_scale,");
    expect(root.alias).toEqual(
      "papers.co-be05-space-stuart-fantacy-art-illustration-blue-red-1366x768_gxydwm"
    );
    expect(root.account).toEqual("dijazdrvc");
    expect(root.querySelector("img")).toBeTruthy();
  });
});
