import { State, Component, Prop, Element, h } from "@stencil/core";
import Tunnel from "../data/active";
import videojs from "video.js";

@Component({
  tag: "c-video",
  styleUrl: "c-video.scss"
})
export class CloudinaryVideo {
  @Element() el: CloudinaryVideo;
  @Prop() account: string;
  @Prop() width: number;
  @Prop() height: number;
  @Prop() crop: string;
  @Prop() aspectRatio: string;
  @Prop() alias: string;
  @Prop() isActive: Array<boolean | null>;
  @Prop() mobileCollapse: boolean;
  @Prop() intervalTimeout?: number;
  @Prop() startInterval: Function;
  @Prop() stopInterval: Function;
  @Prop() index: number;

  @State() fullVideo: string;
  //@State() preview: string;
  @State() poster: string;
  @State() currentWindowWidth: number | undefined;

  private videoEl: any;
  private videoJsEl: any;
  private mouseEnterEvent: boolean;
  private ellipsisRadio: HTMLInputElement;
  private vjsControlBar: HTMLDivElement;
  private videoWrapper: HTMLDivElement;
  private elllipsisTimeout: any;

  componentWillLoad() {
    this.mouseEnterEvent = false;
    const cropFmt = this.crop ? `c_${this.crop},` : "";
    const heightFmt = this.height ? `h_${this.height},` : "";
    const widthFmt = this.width ? `w_${this.width},` : "";
    const aspectRatioFmt = this.aspectRatio ? `ar_${this.aspectRatio},` : "";
    const transformations = `/${aspectRatioFmt}${cropFmt}${heightFmt}${widthFmt}q_auto/`;
    this.fullVideo = `https://res.cloudinary.com/${this.account}/video/upload${transformations}${this.alias}.mp4`;
    //this.preview = `https://res.cloudinary.com/${this.account}/video/upload/so_0,du_2/l_video:${this.alias},fl_splice,so_12/du_2/fl_layer_apply/l_video:${this.alias},fl_splice,so_24/du_2/fl_layer_apply/l_video:${this.alias},fl_splice,so_36/du_2/fl_layer_apply/l_video:${this.alias},fl_splice,so_48/du_2/fl_layer_apply/l_video:${this.alias},fl_splice,so_80/du_2/fl_layer_apply/${this.alias}.mp4`;
    this.poster = `https://res.cloudinary.com/${this.account}/video/upload${transformations}${this.alias}.jpg`;
    this.resizeVideoHandle();
    window.addEventListener("resize", () => this.resizeVideoHandle());
  }

  componentDidLoad() {
    this.videoJsEl = videojs(this.videoEl, {
      controlBar: {
        progressControl: {
          seekBar: true
        },
        children: ["playToggle", "progressControl", "muteToggle"]
      }
    });
    this.videoPlayback();
    this.vjsControlBar = this.videoWrapper.querySelector(".vjs-control-bar");
    this.vjsControlBar.addEventListener("mouseenter", this.fireMouseEnter);
    this.vjsControlBar.addEventListener("mouseleave", this.fireMouseLeave);
  }

  componentDidUpdate() {
    this.videoPlayback();
  }

  disconnectedCallback() {
    if (this.elllipsisTimeout) clearTimeout(this.elllipsisTimeout);
    if (this.videoJsEl) this.videoJsEl.dispose();
    if (this.vjsControlBar) {
      this.vjsControlBar.removeEventListener("mouseenter", this.fireMouseEnter);
      this.vjsControlBar.removeEventListener("mouseleave", this.fireMouseLeave);
    }
    window.removeEventListener("resize", () => this.resizeVideoHandle());
  }

  videoPlayback = () => {
    if (window.innerWidth > 640 && this.isActive[this.index]) {
      this.videoJsEl.muted(true);
      this.videoJsEl.play();
    } else {
      if (!this.videoJsEl.paused) this.videoJsEl.pause();
    }
  };

  resizeVideoHandle = () => {
    if (this.currentWindowWidth) {
      if (
        (this.currentWindowWidth < 641 && window.innerWidth > 640) ||
        (this.currentWindowWidth > 640 && window.innerWidth < 641)
      ) {
        this.videoPlayback();
        this.currentWindowWidth = window.innerWidth;
      }
    } else {
      this.currentWindowWidth = window.innerWidth;
    }
  };

  fireMouseEnter = () => {
    if (this.intervalTimeout) {
      this.stopInterval();
    }
    this.mouseEnterEvent = true;
  };

  fireMouseLeave = () => {
    this.mouseEnterEvent = false;
    if (this.currentWindowWidth > 640) {
      this.elllipsisTimeout = setTimeout(() => {
        if (!this.mouseEnterEvent) this.ellipsisRadio.checked = false;
        this.startInterval();
      }, 10000);
    }
  };

  renderEllipsisOrPlay = () => {
    if (this.currentWindowWidth > 640) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="black"
          width="24"
          height="24"
          class="control-ellipsis"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
      );
    } else {
      return (
        <div class="custom-video-play" onClick={() => this.videoJsEl.play()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="36"
            viewBox="0 0 24 24"
            width="36"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M8 5v14l11-7z" fill="black" />
          </svg>
          <span>PLAY FILM</span>
        </div>
      );
    }
  };

  render() {
    return (
      <div class="video-wrapper" ref={el => (this.videoWrapper = el)}>
        <input
          type="radio"
          name="ellipsis"
          id={`ellipsis${this.index}`}
          ref={el => (this.ellipsisRadio = el)}
        />
        <label htmlFor={`ellipsis${this.index}`}>
          {this.renderEllipsisOrPlay()}
        </label>
        <video
          class="video-js vjs-default-skin"
          ref={el => (this.videoEl = el)}
          poster={this.poster}
          preload="auto"
          loop
        >
          <source
            src={this.fullVideo.replace(/mp4$/g, "webm")}
            type="video/webm"
          />
          <source src={this.fullVideo} type="video/mp4" />
          <source
            src={this.fullVideo.replace(/mp4$/g, "ogv")}
            type="video/ogg"
          />
          Your browser doesn't support the video tag.
        </video>
      </div>
    );
  }
}

Tunnel.injectProps(CloudinaryVideo, [
  "isActive",
  "mobileCollapse",
  "intervalTimeout",
  "startInterval",
  "stopInterval"
]);
