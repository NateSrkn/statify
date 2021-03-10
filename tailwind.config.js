const { colors: defaultColors } = require("tailwindcss/defaultTheme");
module.exports = {
  theme: {
    extend: {
      colors: {
        ...defaultColors,
        "off-black": "#7f8ea3",
      },
    },
  },
  plugins: [],
};
