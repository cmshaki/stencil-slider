import { h } from "@stencil/core";
import { createProviderConsumer } from "@stencil/state-tunnel";

export interface State {
  isActive: Array<boolean | null>;
  mobileCollapse: boolean;
  intervalTimeout?: number;
  startInterval: Function;
  stopInterval: Function;
}

export default createProviderConsumer<State>(
  {
    isActive: [],
    mobileCollapse: false,
    intervalTimeout: 0,
    startInterval: () => null,
    stopInterval: () => null
  },
  (subscribe, child) => (
    <context-consumer subscribe={subscribe} renderer={child} />
  )
);
