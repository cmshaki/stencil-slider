import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "c-image",
  styleUrl: "c-image.scss"
})
export class CloudinaryImage {
  @Prop() account: string;
  @Prop() alias: string;
  @Prop() width: string;
  @Prop() height: string;
  @Prop() crop: string;
  @Prop() gravity: string;
  @Prop() sizes: string;

  private cloudinary_url;

  componentWillLoad() {
    this.gravity = this.gravity ? `g_${this.gravity},` : "";
    this.crop = this.crop ? `c_${this.crop},` : "";
    this.width = this.width ? `w_${this.width},` : "";
    this.height = this.height ? `h_${this.height},` : "";
    const transformations = `${this.gravity}${this.crop}${this.height}${this.width}q_auto,f_auto,dpr_auto,fl_progressive`;
    this.cloudinary_url = `https://res.cloudinary.com/${this.account}/image/upload/${transformations}/v1/${this.alias}`;
  }

  render = () => {
    if (this.alias && this.account)
      <img src={this.cloudinary_url} sizes={this.sizes} />;
  };
}
