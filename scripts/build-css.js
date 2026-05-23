const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const sources = [
    "css/base.css",
    "css/hero-phone.css",
    "css/sections.css",
    "css/seo-pages.css",
    "css/responsive.css"
];

function minify(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\s+/g, " ")
        .replace(/\s*([{}:;,>+~])\s*/g, "$1")
        .replace(/;}/g, "}")
        .replace(/\s*!important/g, "!important")
        .trim();
}

const banner = "/* Generated from css/*.css by scripts/build-css.js. Do not edit directly. */\n";
const css = sources
    .map((source) => fs.readFileSync(path.join(root, source), "utf8"))
    .join("\n");

fs.writeFileSync(path.join(root, "styles.bundle.css"), banner + minify(css) + "\n");
console.log(`Built styles.bundle.css from ${sources.length} source files.`);
