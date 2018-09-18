module.exports = {
  presets: [
    ["@babel/preset-env", {
      "modules": false
    }]
  ],
  plugins: ["transform-vue-jsx", "@babel/plugin-transform-runtime"],
  env: {
    test: {
      presets: [
        "@babel/preset-env"
      ],
      plugins: [
        "transform-vue-jsx",
        "@babel/plugin-transform-modules-commonjs",
        "dynamic-import-node"
      ]
    }
  }
}
