/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      transitionDuration: { 
        '2000': '2000ms',
      }
    }
  },

  plugins: [
    require("@tailwindcss/typography"),
    require("@catppuccin/tailwindcss")({
      // prefix to use, e.g. `text-pink` becomes `text-ctp-pink`.
      // default is `false`, which means no prefix
      prefix: false,
      // which flavour of colours to use by default, in the `:root`
      defaultFlavour: "frappe",
    })
  ]
} as Config;
