import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const buildDir = "build";
const assetDir = join(buildDir, "assets");

const budgets = {
  cssBytes: 100 * 1024,
  totalJsBytes: 2.75 * 1024 * 1024,
  largestJsBytes: 1.6 * 1024 * 1024,
};

const formatKb = (bytes) => `${(bytes / 1024).toFixed(2)} kB`;

if (!existsSync(buildDir) || !existsSync(join(buildDir, "index.html"))) {
  throw new Error("Missing Vite build output. Run `npm run build` before `npm run build:check`.");
}

if (!existsSync(assetDir)) {
  throw new Error("Missing Vite asset directory at build/assets.");
}

const assets = readdirSync(assetDir).map((name) => {
  const path = join(assetDir, name);
  return {
    name,
    path,
    size: statSync(path).size,
  };
});

const cssAssets = assets.filter((asset) => asset.name.endsWith(".css"));
const jsAssets = assets.filter((asset) => asset.name.endsWith(".js"));
const totalCssBytes = cssAssets.reduce((total, asset) => total + asset.size, 0);
const totalJsBytes = jsAssets.reduce((total, asset) => total + asset.size, 0);
const largestJs = jsAssets.reduce((largest, asset) => (asset.size > largest.size ? asset : largest), {
  name: "",
  size: 0,
});

const failures = [];

if (totalCssBytes > budgets.cssBytes) {
  failures.push(`CSS total ${formatKb(totalCssBytes)} exceeds budget ${formatKb(budgets.cssBytes)}.`);
}

if (totalJsBytes > budgets.totalJsBytes) {
  failures.push(`JS total ${formatKb(totalJsBytes)} exceeds budget ${formatKb(budgets.totalJsBytes)}.`);
}

if (largestJs.size > budgets.largestJsBytes) {
  failures.push(
    `Largest JS asset ${largestJs.name} is ${formatKb(largestJs.size)}, exceeding budget ${formatKb(
      budgets.largestJsBytes,
    )}.`,
  );
}

console.log("Build output check");
console.log(`CSS total: ${formatKb(totalCssBytes)}`);
console.log(`JS total: ${formatKb(totalJsBytes)}`);
console.log(`Largest JS: ${largestJs.name || "n/a"} ${formatKb(largestJs.size)}`);

if (failures.length) {
  throw new Error(failures.join("\n"));
}
