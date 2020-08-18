import { CloudinaryVideo } from "./c-video";
import { newSpecPage } from "@stencil/core/testing";

describe("c-video", () => {
  it("Should variables and methods should be working", async () => {
    const instance = new CloudinaryVideo();
    instance.index = 1;
    instance.account = "test";
    instance.isActive = [true];
    expect(instance.index).toEqual(1);
    expect(instance.poster).toBeTruthy();
    expect(instance.account).toEqual("test");
    expect(instance.isActive).toEqual(true);
  });
  it("Should render properly", async () => {
    const { root } = await newSpecPage({
      components: [CloudinaryVideo],
      html: `<c-video account="dijazdrvc" isActive=true index=1 alias="spink/coverr--girl-with-dog-near-lake-and-mountains-in-new-zealand-1585909449252_l93x8y"></c-video>`
    });
    const videoEl = root.querySelector(
      ".video-js.vjs-default-skin"
    ) as HTMLVideoElement;
    expect(root.alias).toEqual(
      "spink/coverr--girl-with-dog-near-lake-and-mountains-in-new-zealand-1585909449252_l93x8y"
    );
    expect(root.querySelector(".video-wrapper")).toBeTruthy();
    expect(videoEl).toBeTruthy();
    expect(videoEl.paused).toBeFalsy();
  });
});
