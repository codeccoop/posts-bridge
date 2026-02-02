const fs = require("fs");
const crypto = require("crypto");
const esbuild = require("esbuild");

(async () => {
  await esbuild.build({
    entryPoints: ["src/index.jsx", "src/view.js"],
    bundle: true,
    minify: true,
    sourcemap: false,
    outdir: "build",
    loader: { ".png": "base64" },
    charset: "utf8",
    plugins: [
      {
        name: "clean-dist",
        setup({ onStart }) {
          onStart(() => {
            fs.rmSync("./build", { recursive: true, force: true });
            fs.mkdirSync("./build");
          });
        },
      },
      {
        name: "view-assets",
        setup({ onStart, onEnd }) {
          let hash;
          onStart(() => {
            hash = crypto.createHash("sha1");
            hash.setEncoding("hex");
          });
          onEnd(() => {
            hash.write(fs.readFileSync("./build/view.js", "utf8"));
            hash.end();
            fs.writeFileSync(
              "./build/view.asset.php",
              `<?php return ['dependencies' => [], 'version' => '${hash.read()}'];`
            );
          });
        },
      },
      {
        name: "index-assets",
        setup({ onStart, onEnd }) {
          let hash;
          onStart(() => {
            hash = crypto.createHash("sha1");
            hash.setEncoding("hex");
          });
          onEnd(() => {
            hash.write(fs.readFileSync("./build/index.js", "utf8"));
            hash.end();
            fs.writeFileSync(
              "./build/index.asset.php",
              `<?php return ['dependencies' => ['react','react-jsx-runtime','wp-api','wp-api-fetch','wp-block-editor','wp-blocks','wp-components','wp-data','wp-core-data','wp-element','wp-i18n'], 'version' => '${hash.read()}'];`
            );
          });
        },
      },
      {
        name: "copy-block-config",
        setup({ onEnd }) {
          onEnd(() => {
            fs.copyFileSync("./src/block.json", "./build/block.json");
          });
        },
      },
      {
        name: "copy-render-script",
        setup({ onEnd }) {
          onEnd(() => {
            fs.copyFileSync("./src/render.php", "./build/render.php");
          });
        },
      },
      {
        name: "rebuild-log",
        setup({ onStart, onEnd }) {
          var t;
          onStart(() => {
            t = Date.now();
          });
          onEnd(() => {
            console.log("build finished in", Date.now() - t, "ms");
          });
        },
      },
    ],
  });
})();
