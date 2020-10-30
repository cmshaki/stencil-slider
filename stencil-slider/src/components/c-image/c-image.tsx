import { Component, State, Watch, Prop, h } from "@stencil/core";

@Component({
  tag: "c-image",
  styleUrl: "c-image.scss"
})
export class CloudinaryImage {
  @Prop() account: string;
  @Prop() alias: string;
  @Prop() width: number;
  @Prop() height: number;
  @Prop() crop: string;
  @Prop() gravity: string;
  @Prop() sizes: string;

  @State() cloudinary_url;

  generateImageUrl() {
    const gravity = this.gravity ? `g_${this.gravity},` : "";
    const crop = this.crop ? `c_${this.crop},` : "";
    const width = this.width ? `w_${this.width},` : "";
    const height = this.height ? `h_${this.height},` : "";
    const transformations = `${gravity}${crop}${height}${width}q_auto,f_auto,dpr_auto,fl_progressive`;
    this.cloudinary_url = `https://res.cloudinary.com/${this.account}/image/upload/${transformations}/v1/${this.alias}`;
  }

  @Watch("width")
  watchWidth(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.generateImageUrl();
    }
  }

  @Watch("height")
  watchHeight(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.generateImageUrl();
    }
  }

  componentWillLoad() {
    this.generateImageUrl();
  }

  render = () => {
    if (this.alias && this.account)
      return <img src={this.cloudinary_url} sizes={this.sizes} />;
  };
}
