// postcss config: convert CSS custom properties to static

const postcssCustomProperties = require('postcss-custom-properties');

module.exports = {
  plugins: [
    postcssCustomProperties({
      preserve: false
    })
  ]
}
