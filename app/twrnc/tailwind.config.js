const { plugin } = require("twrnc");

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#E11D48",
        "primary-dark": "#FFB3B6",
        warning: "#FCDC4D",
        error: "#EF2D56",
        success: "#2FBF71",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        container: `px-7 lg:px-10 tablet:px-12`,
        "container-sm": `px-5 lg:p-8 tablet:p-10`,
      });
    }),
  ],
};
