import { Component, Prop, State, h } from "@stencil/core";
import Tunnel from "../data/active";

@Component({
  tag: "c-slider",
  styleUrl: "c-slider.scss"
})
export class Slider {
  @Prop() slides: number;
  @Prop() loadLastSlideItemHalfway?: boolean;
  @Prop() carouselInnerTransitionFaster?: string;
  @Prop() collapseOnMobile?: boolean;
  @Prop() removeArrowNavigation?: boolean;
  @Prop() theme?: boolean;
  @Prop() lastArrowBlack?: boolean;
  @Prop() noTransitions: boolean;
  @Prop() didLoadFunc?: Function;
  @Prop() prevLabelFunc?: Function;
  @Prop() nextLabelFunc?: Function;
  @Prop() radioButtonIdOffset?: number;
  @State() activeSlideIndex?: number;
  @State() activeArr: Array<boolean>;

  activeMap: Map<number, Array<boolean>>;
  initialArr: Array<boolean>;
  previousSlideIndex: number;

  componentWillLoad() {
    // Change the new Array constructor number to reflect the number of slides you want
    this.initialArr = new Array(this.slides).fill(false);
    this.initialArr[this.activeSlideIndex ? this.activeSlideIndex : 0] = true;
    this.activeArr = this.initialArr;
    const getCurrentActiveArr = (index: number) => {
      return this.initialArr.map((val, idx) => {
        if (val == true) return false;
        if (index == idx) return true;
        return val;
      });
    };
    this.activeMap = new Map();
    for (let i = 0; i < this.initialArr.length; i++) {
      if (i) {
        this.activeMap.set(i, getCurrentActiveArr(i));
      } else {
        this.activeMap.set(i, this.initialArr);
      }
    }
  }

  componentWillRender() {
    if (this.activeSlideIndex !== undefined) {
      if (this.activeSlideIndex !== this.previousSlideIndex) {
        if (this.activeSlideIndex > 10) {
          const newIndex = this.activeSlideIndex / 10;
          if (!this.activeArr[newIndex]) {
            this.previousSlideIndex = this.activeSlideIndex;
            this.activeArr = this.activeMap.get(newIndex);
          }
        } else {
          if (!this.activeArr[this.activeSlideIndex]) {
            this.previousSlideIndex = this.activeSlideIndex;
            this.activeArr = this.activeMap.get(this.activeSlideIndex);
          }
        }
      }
    }
  }

  componentDidLoad() {
    this.didLoadFunc ? this.didLoadFunc() : null;
  }

  handleClick(index: number) {
    const idx = this.activeArr.indexOf(true);
    if (!this.activeArr[index]) {
      this.activeArr = this.activeMap.get(index);
    }
    if (idx && this.carouselInnerTransitionFaster) {
      this.carouselInnerTransitionFaster = "";
    } else {
      this.carouselInnerTransitionFaster = " transition-faster";
    }
  }

  handleMouseOver = () => {
    if (this.loadLastSlideItemHalfway) {
      if (this.slides > 2) {
        const index = this.activeArr.indexOf(true);
        if (index === this.activeArr.length - 1) {
          this.carouselInnerTransitionFaster = " transition-faster";
        } else {
          if (this.carouselInnerTransitionFaster) {
            this.carouselInnerTransitionFaster = "";
          }
        }
      }
    }
  };

  handleMouseOut = () => {
    if (this.carouselInnerTransitionFaster) {
      this.carouselInnerTransitionFaster = "";
    }
  };

  //getPrevSlide = () => {
  //const index = this.activeArr.indexOf(true);
  //if (index > 0) return `carousel-${index - 1}`;
  //return `carousel-${this.activeArr.length - 1}`;
  //};

  //getNextSlide = () => {
  //const index = this.activeArr.indexOf(true);
  //if (index < this.activeArr.length - 1) return `carousel-${index + 1}`;
  //return "carousel-0";
  //};

  renderInputRadioButtons = () => {
    let arr = [];
    for (let i = 0; i < this.initialArr.length; i++) {
      arr[i] = (
        <input
          type="radio"
          onClick={() => this.handleClick(i)}
          name="carousel"
          id={`carousel-${
            this.radioButtonIdOffset ? i + this.radioButtonIdOffset : i
          }`}
          checked={this.activeArr[i]}
        />
      );
    }
    return arr;
  };

  renderLabelButtons = () => {
    if (this.removeArrowNavigation) return null;
    const prevLabelProps = {
      onMouseOver: this.handleMouseOver,
      onMouseOut: this.handleMouseOut,
      onClick: () => this.prevLabelFunc(this.activeArr)
    };
    const nextLabelProps = {
      onClick: () => this.nextLabelFunc(this.activeArr)
    };
    if (!this.prevLabelFunc) {
      delete prevLabelProps.onClick;
      delete nextLabelProps.onClick;
    }
    if (!this.carouselInnerTransitionFaster) delete prevLabelProps.onMouseOut;
    if (!this.loadLastSlideItemHalfway) delete prevLabelProps.onMouseOver;
    return (
      <div
        class={`carousel-nav${this.theme ? " dark-theme" : ""}${
          this.lastArrowBlack &&
          this.activeArr.indexOf(true) === this.activeArr.length - 1
            ? " last-arrow-black"
            : ""
        }`}
      >
        <label
          htmlFor={
            this.activeArr.indexOf(true) +
              (this.radioButtonIdOffset ? this.radioButtonIdOffset : 0) >
            (this.radioButtonIdOffset ? this.radioButtonIdOffset : 0)
              ? `carousel-${
                  this.radioButtonIdOffset
                    ? this.radioButtonIdOffset +
                      this.activeArr.indexOf(true) -
                      1
                    : this.activeArr.indexOf(true) - 1
                }`
              : `carousel-${
                  this.radioButtonIdOffset
                    ? this.radioButtonIdOffset + this.activeArr.length - 1
                    : this.activeArr.length - 1
                }`
          }
          {...prevLabelProps}
        ></label>
        <label
          htmlFor={
            this.activeArr.indexOf(true) +
              (this.radioButtonIdOffset ? this.radioButtonIdOffset : 0) <
            (this.radioButtonIdOffset
              ? this.radioButtonIdOffset + this.activeArr.length - 1
              : this.activeArr.length - 1)
              ? `carousel-${
                  this.radioButtonIdOffset
                    ? this.radioButtonIdOffset +
                      (this.activeArr.indexOf(true) + 1)
                    : this.activeArr.indexOf(true) + 1
                }`
              : `carousel-${
                  this.radioButtonIdOffset ? this.radioButtonIdOffset : 0
                }`
          }
          {...nextLabelProps}
        ></label>
      </div>
    );
  };

  lastSlideWidthChecker = () => {
    if (this.loadLastSlideItemHalfway) {
      if (this.slides == 2) {
        return " load-last-slide-half two-slide";
      }
      return " load-last-slide-half";
    }
    return "";
  };

  render() {
    return (
      <div
        class={`css-carousel-${this.slides}${this.lastSlideWidthChecker()}${
          this.collapseOnMobile ? " collapse-on-mobile" : ""
        }${this.noTransitions ? " no-transitions" : ""}`}
      >
        {/* carousel controls */}
        {this.renderInputRadioButtons()}
        {/* carousel navigation */}
        {this.renderLabelButtons()}
        {/* carousel slides */}
        <div class="carousel-slides">
          <div
            class={`carousel-inner${
              this.carouselInnerTransitionFaster
                ? this.carouselInnerTransitionFaster
                : ""
            }`}
          >
            <Tunnel.Provider
              state={{
                isActive: this.activeArr,
                mobileCollapse: this.collapseOnMobile ? true : false
              }}
            >
              <slot />
            </Tunnel.Provider>
          </div>
        </div>
      </div>
    );
  }
}
