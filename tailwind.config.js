// eslint-disable-next-line
const withMT = require("@material-tailwind/react/utils/withMT");

// eslint-disable-next-line
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
});
