import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";
import { reactOutputTarget } from "@stencil/react-output-target";

// https://stenciljs.com/docs/config

export const config: Config = {
  namespace: "stencil-slider",
  taskQueue: "async",
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: "../../stencil-slider",
      proxiesFile: "../react-wrapper/src/components.ts",
      excludeComponents: ["context-consumer"]
    }),
    {
      type: "dist",
      esmLoaderPath: "../loader"
    },
    {
      type: "www",
      serviceWorker: null
    }
  ],
  plugins: [sass()]
};
