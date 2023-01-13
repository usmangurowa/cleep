const { plugin } = require("twrnc");
const { default: config } = require("../../config");

module.exports = {
  plugins: [plugin(config)],
  theme: {
    extends: {
      colors: {
        primary: "#E11D48",
      },
    },
  },
};
