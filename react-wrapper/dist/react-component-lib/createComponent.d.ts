import React from 'react';
import { HTMLStencilElement } from '@stencil/core/internal/stencil-public-runtime';
interface StencilReactInternalProps<ElementType> extends React.HTMLAttributes<ElementType> {
    forwardedRef?: React.RefObject<ElementType>;
    ref?: React.Ref<any>;
}
export declare const createReactComponent: <PropType, ElementType extends HTMLStencilElement, ContextStateType = {}, ExpandedPropsTypes = {}>(tagName: string, ReactComponentContext?: React.Context<ContextStateType>, manipulatePropsFunction?: (originalProps: StencilReactInternalProps<ElementType>, propsToPass: any) => ExpandedPropsTypes) => React.ForwardRefExoticComponent<React.PropsWithoutRef<import("./utils").StencilReactExternalProps<PropType, ElementType>> & React.RefAttributes<ElementType>>;
export {};
