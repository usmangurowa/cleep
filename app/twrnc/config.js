const { plugin } = require("twrnc");

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#E11D48",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        container: `px-7 lg:p-10 tablet:p-12`,
        "container-sm": `px-5 lg:p-8 tablet:p-10`,
        // "h-screen": {
        //   height,
        // },
        // "w-screen": {
        //   width,
        // },
        // "min-h-screen": {
        //   minHeight: height,
        // },
        // "min-w-screen": {
        //   minWidth: width,
        // },
        // "safe-top": {
        //   paddingTop: Constants.statusBarHeight,
        // },
        // "resize-mode-center": {
        //   resizeMode: "center",
        // },
        // "resize-mode-contain": {
        //   resizeMode: "contain",
        // },
        // "resize-mode-cover": {
        //   resizeMode: "cover",
        // },
        // "font-averta": {
        //   fontFamily: "Averta",
        // },
        // "font-averta-bold": {
        //   fontFamily: "Averta-Bold",
        // },
      });
    }),
  ],
};
