/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface CImage {
        "account": string;
        "alias": string;
        "crop": string;
        "gravity": string;
        "height": string;
        "sizes": string;
        "width": string;
    }
    interface CSlider {
        "activeSlideIndex"?: number;
        "carouselInnerTransitionFaster"?: string;
        "collapseOnMobile"?: boolean;
        "didLoadFunc"?: Function;
        "intervalExternalFunction"?: Function;
        "intervalTimeoutDuration"?: number;
        "lastArrowBlack"?: boolean;
        "loadLastSlideItemHalfway"?: boolean;
        "nextLabelFunc"?: Function;
        "noTransitions": boolean;
        "prevLabelFunc"?: Function;
        "radioButtonIdOffset"?: number;
        "removeArrowNavigation"?: boolean;
        "slides": number;
        "stopFirstAndLastSlideTransitions"?: boolean;
        "theme"?: boolean;
    }
    interface CVideo {
        "account": string;
        "alias": string;
        "aspectRatio": string;
        "crop": string;
        "height": string;
        "index": number;
        "intervalTimeout"?: number;
        "isActive": Array<boolean | null>;
        "mobileCollapse": boolean;
        "startInterval": Function;
        "stopInterval": Function;
        "width": string;
    }
}
declare global {
    interface HTMLCImageElement extends Components.CImage, HTMLStencilElement {
    }
    var HTMLCImageElement: {
        prototype: HTMLCImageElement;
        new (): HTMLCImageElement;
    };
    interface HTMLCSliderElement extends Components.CSlider, HTMLStencilElement {
    }
    var HTMLCSliderElement: {
        prototype: HTMLCSliderElement;
        new (): HTMLCSliderElement;
    };
    interface HTMLCVideoElement extends Components.CVideo, HTMLStencilElement {
    }
    var HTMLCVideoElement: {
        prototype: HTMLCVideoElement;
        new (): HTMLCVideoElement;
    };
    interface HTMLElementTagNameMap {
        "c-image": HTMLCImageElement;
        "c-slider": HTMLCSliderElement;
        "c-video": HTMLCVideoElement;
    }
}
declare namespace LocalJSX {
    interface CImage {
        "account"?: string;
        "alias"?: string;
        "crop"?: string;
        "gravity"?: string;
        "height"?: string;
        "sizes"?: string;
        "width"?: string;
    }
    interface CSlider {
        "activeSlideIndex"?: number;
        "carouselInnerTransitionFaster"?: string;
        "collapseOnMobile"?: boolean;
        "didLoadFunc"?: Function;
        "intervalExternalFunction"?: Function;
        "intervalTimeoutDuration"?: number;
        "lastArrowBlack"?: boolean;
        "loadLastSlideItemHalfway"?: boolean;
        "nextLabelFunc"?: Function;
        "noTransitions"?: boolean;
        "prevLabelFunc"?: Function;
        "radioButtonIdOffset"?: number;
        "removeArrowNavigation"?: boolean;
        "slides"?: number;
        "stopFirstAndLastSlideTransitions"?: boolean;
        "theme"?: boolean;
    }
    interface CVideo {
        "account"?: string;
        "alias"?: string;
        "aspectRatio"?: string;
        "crop"?: string;
        "height"?: string;
        "index"?: number;
        "intervalTimeout"?: number;
        "isActive"?: Array<boolean | null>;
        "mobileCollapse"?: boolean;
        "startInterval"?: Function;
        "stopInterval"?: Function;
        "width"?: string;
    }
    interface IntrinsicElements {
        "c-image": CImage;
        "c-slider": CSlider;
        "c-video": CVideo;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "c-image": LocalJSX.CImage & JSXBase.HTMLAttributes<HTMLCImageElement>;
            "c-slider": LocalJSX.CSlider & JSXBase.HTMLAttributes<HTMLCSliderElement>;
            "c-video": LocalJSX.CVideo & JSXBase.HTMLAttributes<HTMLCVideoElement>;
        }
    }
}
