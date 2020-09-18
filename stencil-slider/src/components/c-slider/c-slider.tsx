import { Component, Prop, State, Watch, h } from "@stencil/core";
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
  @Prop() activeSlideIndex?: number;
  @Prop() intervalTimeoutDuration?: number;
  @Prop() stopFirstAndLastSlideTransitions?: boolean;
  @Prop() intervalExternalFunction?: Function;
  @State() activeArr: Array<boolean>;
  @State() stopTransitions: boolean;

  intervalTimeout: any;
  activeMap: Map<number, Array<boolean>>;
  initialArr: Array<boolean>;
  previousSlideIndex: number;
  intervalFunc: Function;

  @Watch("activeSlideIndex")
  watchHandler(newValue, oldValue) {
    if (newValue !== undefined) {
      if (newValue !== oldValue) {
        if (newValue > 9) {
          const newIndex = newValue / 10;
          if (!this.activeArr[newIndex]) {
            this.activeArr = this.activeMap.get(newIndex);
          }
        } else {
          if (!this.activeArr[this.activeSlideIndex]) {
            this.activeArr = this.activeMap.get(newValue);
          }
        }
      }
    }
  }

  componentWillLoad() {
    // Change the new Array constructor number to reflect the number of slides you want
    this.initialArr = new Array(this.slides).fill(false);
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
    this.initialArr[
      this.activeSlideIndex
        ? this.activeSlideIndex > 9
          ? this.activeSlideIndex / 10
          : this.activeSlideIndex
        : 0
    ] = true;
    this.activeArr = this.initialArr;
    this.intervalFunc = () => {
      if (this.intervalExternalFunction) {
        this.intervalExternalFunction(this.activeArr.indexOf(true));
      }
      const index = this.activeArr.indexOf(true);
      if (index === this.activeArr.length - 1) {
        if (this.stopFirstAndLastSlideTransitions) {
          if (!this.stopTransitions) {
            this.stopTransitions = true;
          }
        }
        this.activeArr = this.activeMap.get(0);
      } else {
        if (this.stopFirstAndLastSlideTransitions) {
          if (this.stopTransitions) {
            this.stopTransitions = false;
          }
        }
        this.activeArr = this.activeMap.get(index + 1);
      }
    };
    if (this.intervalTimeoutDuration) {
      this.intervalTimeout = setInterval(
        this.intervalFunc,
        this.intervalTimeoutDuration
      );
    }
  }

  componentDidLoad() {
    this.didLoadFunc ? this.didLoadFunc() : null;
  }

  disconnectedCallback() {
    if (this.intervalTimeout) clearTimeout(this.intervalTimeout);
  }

  startInterval = () => {
    this.intervalTimeout = setInterval(
      this.intervalFunc,
      this.intervalTimeoutDuration
    );
  };

  stopInterval = () => {
    if (this.intervalTimeout) clearTimeout(this.intervalTimeout);
  };

  handleClick(index: number) {
    const idx = this.activeArr.indexOf(true);
    if (this.intervalTimeoutDuration) {
      if (this.intervalTimeout) {
        clearTimeout(this.intervalTimeout);
      }
      this.intervalTimeout = setInterval(
        this.intervalFunc,
        this.intervalTimeoutDuration
      );
    }
    if (this.stopFirstAndLastSlideTransitions) {
      if (idx === this.activeArr.length - 1 && index === 0) {
        this.stopTransitions = true;
      } else if (idx === 0 && index === this.activeArr.length - 1) {
        this.stopTransitions = true;
      } else {
        if (this.stopTransitions) this.stopTransitions = false;
      }
    }
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
      const inputProps = { checked: this.activeArr[i] };
      if (!inputProps.checked) delete inputProps.checked;
      arr[i] = (
        <input
          type="radio"
          onClick={() => this.handleClick(i)}
          name={`carousel${
            this.radioButtonIdOffset ? this.radioButtonIdOffset : ""
          }`}
          id={`carousel-${
            this.radioButtonIdOffset ? i + this.radioButtonIdOffset : i
          }`}
          {...inputProps}
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
        }${
          this.noTransitions || this.stopTransitions ? " no-transitions" : ""
        }`}
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
                mobileCollapse: this.collapseOnMobile ? true : false,
                intervalTimeout: this.intervalTimeoutDuration,
                startInterval: this.startInterval,
                stopInterval: this.stopInterval
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
