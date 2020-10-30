import { Component, Watch, h, Prop, State } from "@stencil/core";

@Component({
  tag: "c-text",
  styleUrl: "c-text.scss"
})
export class CText {
  @Prop() richText: string[]; // Array of strings
  @Prop() maxDesktopText: number;
  @Prop() maxMobileText: number;
  @Prop() sliderLang: string;
  @Prop() radioButtonIdOffset?: number;
  @Prop() noArrows?: boolean;
  @Prop() viewport: string;

  @State() activeArr: Array<boolean>;
  @State() textRender: any;

  activeMap: Map<number, Array<boolean>>;
  initialArr: Array<boolean>;
  dividedTextMobile: any;
  dividedTextDesktop: any;

  @Watch("viewport")
  watchViewportHandler(newValue, oldValue) {
    if (newValue !== oldValue) {
      if (newValue === "desktop") {
        this.textRender = this.dividedTextDesktop;
        this.radioButtonsCheckedFunc("desktop");
      }
      if (newValue === "mobile") {
        this.textRender = this.dividedTextMobile;
        this.radioButtonsCheckedFunc("mobile");
      }
    }
  }

  divideText(maxChars) {
    if (!this.richText) return "";
    if (this.richText.length == 1) return this.richText; // If we are on the last item return last item
    const charCounts = this.richText.map(val => {
      return val.length;
    }); // Counts the number of characters on each rich text item

    let count = 0;
    let max = charCounts.length;
    let textBlobs = [];

    const groupParts = (min: number) => {
      let totalWordCount = 0;
      let partsArr = [];
      let currentMin = min;
      while (totalWordCount < maxChars && currentMin < max) {
        totalWordCount = totalWordCount + charCounts[currentMin];
        if (totalWordCount < maxChars) {
          partsArr.push(currentMin);
        } else {
          if (currentMin == min) {
            partsArr.push(currentMin);
          }
        }
        currentMin = currentMin + 1;
      }
      return partsArr;
    };

    while (count < charCounts.length) {
      let arr = groupParts(count);
      textBlobs.push(arr);
      if (count == charCounts.length - 1) {
        count = charCounts.length;
      } else {
        count = count + arr.length;
      }
    }

    // Augment Text Blobs
    textBlobs = textBlobs.map(val => {
      return val.reduce((acc, val) => {
        if (!acc) acc = this.richText[val];
        else acc = `${acc} ${this.richText[val]}`;
        return acc;
      }, "");
    });
    return textBlobs;
  }

  radioButtonsCheckedFunc(viewport: string) {
    if (
      (viewport === "desktop" && this.dividedTextDesktop.length > 1) ||
      (viewport === "mobile" && this.dividedTextMobile.length > 1)
    ) {
      if (viewport === "desktop") {
        this.initialArr = new Array(this.dividedTextDesktop.length).fill(false);
      }
      if (viewport === "mobile") {
        this.initialArr = new Array(this.dividedTextMobile.length).fill(false);
      }
      const getCurrentActiveArr = (index: number) => {
        return this.initialArr.map((val, idx) => {
          if (index == idx) return true;
          return val;
        });
      };
      this.activeMap = new Map();
      for (let i = 0; i < this.initialArr.length; i++) {
        this.activeMap.set(i, getCurrentActiveArr(i));
      }
      this.initialArr[0] = true;
      this.activeArr = this.initialArr;
    }
  }

  componentWillLoad() {
    this.dividedTextMobile = this.divideText(this.maxMobileText);
    this.dividedTextDesktop = this.divideText(this.maxDesktopText);
    if (this.viewport === "desktop") {
      this.textRender = this.dividedTextDesktop;
      this.radioButtonsCheckedFunc("desktop");
    } else {
      this.textRender = this.dividedTextMobile;
      this.radioButtonsCheckedFunc("mobile");
    }
  }

  handleClick(index: number) {
    if (!this.activeArr[index]) {
      this.activeArr = this.activeMap.get(index);
    }
  }

  renderInputRadioButtons = () => {
    let arr = [];
    for (let i = 0; i < this.textRender.length; i++) {
      const inputProps = { checked: this.activeArr[i] };
      if (!inputProps.checked) delete inputProps.checked;
      arr[i] = (
        <input
          type="radio"
          onClick={() => this.handleClick(i)}
          name={`paragraph-${this.sliderLang}${
            this.radioButtonIdOffset ? this.radioButtonIdOffset : ""
          }`}
          id={`paragraph-${this.sliderLang}-${
            this.radioButtonIdOffset ? i + this.radioButtonIdOffset : i
          }`}
          {...inputProps}
        />
      );
    }
    return arr;
  };

  renderLabelButtons = index => {
    return (
      <aside class="paragraph-nav">
        {index > 0 ? (
          <label
            class={`arrow-up${
              index === this.textRender.length - 1 ? " anchor-down" : ""
            }`}
            htmlFor={`paragraph-${this.sliderLang}-${
              this.radioButtonIdOffset
                ? this.radioButtonIdOffset + index - 1
                : index - 1
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="black"
              width="24px"
              height="24px"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
            </svg>
          </label>
        ) : null}
        {index < this.textRender.length - 1 ? (
          <label
            class="arrow-down"
            htmlFor={`paragraph-${this.sliderLang}-${
              this.radioButtonIdOffset
                ? this.radioButtonIdOffset + index + 1
                : index + 1
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="black"
              width="24px"
              height="24px"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
            </svg>
          </label>
        ) : null}
      </aside>
    );
  };

  renderParagraphs = () => {
    return this.textRender.map((val, idx) => (
      <div class="paragraph-item">
        <div class="paragraph-inner-item">
          <p innerHTML={val}></p>
        </div>
        {this.textRender.length > 1 && !this.noArrows
          ? this.renderLabelButtons(idx)
          : null}
      </div>
    ));
  };

  render() {
    return (
      <div class="paragraphs-root">
        {this.textRender && this.activeArr && !this.noArrows
          ? this.renderInputRadioButtons()
          : null}
        <div
          class={
            this.noArrows
              ? "paragraphs-wrapper no-arrows"
              : "paragraphs-wrapper"
          }
        >
          {this.textRender ? this.renderParagraphs() : null}
        </div>
      </div>
    );
  }
}
