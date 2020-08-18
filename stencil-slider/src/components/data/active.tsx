import { h } from "@stencil/core";
import { createProviderConsumer } from "@stencil/state-tunnel";

export interface State {
  isActive: Array<boolean | null>;
  mobileCollapse: boolean;
}

export default createProviderConsumer<State>(
  {
    isActive: [],
    mobileCollapse: false
  },
  (subscribe, child) => (
    <context-consumer subscribe={subscribe} renderer={child} />
  )
);
