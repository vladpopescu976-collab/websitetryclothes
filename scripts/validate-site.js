const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const htmlFiles = [];

function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.name === ".git" || entry.name === "node_modules") {
            continue;
        }

        const filePath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walk(filePath);
        } else if (entry.name.endsWith(".html")) {
            htmlFiles.push(filePath);
        }
    }
}

function localTarget(file, reference) {
    const clean = reference.split(/[?#]/)[0];
    if (!clean || clean.startsWith("#") || /^(https?:|mailto:|tel:|data:)/.test(clean)) {
        return null;
    }

    if (clean.startsWith("/")) {
        return path.join(root, clean.slice(1));
    }

    if (clean.startsWith(".")) {
        return path.resolve(path.dirname(file), clean);
    }

    return null;
}

walk(root);

let errors = 0;
let jsonLdCount = 0;

for (const file of htmlFiles) {
    const html = fs.readFileSync(file, "utf8");
    const relative = path.relative(root, file);

    if (relative !== "404.html" && !/<h1[\s>]/i.test(html)) {
        console.error(`Missing h1: ${relative}`);
        errors += 1;
    }

    for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
        try {
            JSON.parse(match[1]);
            jsonLdCount += 1;
        } catch (error) {
            console.error(`Invalid JSON-LD in ${relative}: ${error.message}`);
            errors += 1;
        }
    }

    for (const match of html.matchAll(/\b(?:href|src|data-defer-src)=["']([^"']+)["']/g)) {
        const target = localTarget(file, match[1]);
        if (target && !fs.existsSync(target)) {
            console.error(`Missing local reference in ${relative}: ${match[1]}`);
            errors += 1;
        }
    }
}

if (errors) {
    process.exitCode = 1;
} else {
    console.log(`Validated ${htmlFiles.length} HTML files and ${jsonLdCount} JSON-LD scripts.`);
}
