#!/usr/bin/env bash
#
# Build for Karthik Coding Challenge  Williams Sonoma 
#
echo "Creating wsi-challenge build folder..."
#
# for browser compatibility, remove `type="module"` from `<script>`
echo " "
echo -n "Removing 'type=\"module\"' from index.html <script> tag ..."
sed 's/ type="module">/>/' index.html > build/index.html
echo " done."
#
#
echo " "
echo "Copying company-supplied products JSON to build folder:"
cp -v wsi-products.json build/wsi-products.json
echo "Done."
#
#
echo " "
echo "Converting CSS file for browser compatibility with postcss:"
postcss css/wsiprods.css --output build/css/prods.css --verbose
echo "Done."
#
#
echo " "
echo "Building bundled and compatible 'products.js' with webpack/babel:"
webpack
echo "Done."
#
#
echo " "
echo "Build complete."
