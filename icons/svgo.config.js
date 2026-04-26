module.exports = {
  plugins: [
    {
      name: "removeAttrs",
      params: {
        attrs: ["fill", "clip-path", "clip-rule"],
        active: true,
      },
    },
    {
      name: "preset-default",
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
  ],
};
