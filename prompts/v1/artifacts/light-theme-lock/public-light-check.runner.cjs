const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");
const { encrypt } = require("n-krypta");
const { encode } = require("base-64");

const baseUrl = "http://127.0.0.1:4175";
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const secret = "b16e839a-2e0c-4a4c-9962-9693cdccb82c";
const storedDark = encrypt(encode("dark"), secret);
const outDir = path.resolve("prompts/v1/artifacts/light-theme-lock");

const routes = [
  "/",
  "/sign-in",
  "/apply",
  "/apply/operator/casino",
  "/apply/operator/form",
  "/apply/operator/verification",
  "/apply/payment/invoice",
  "/verify/email/otp",
  "/document/license/verification",
  "/documents/licenses/TEST-001",
  "/logout",
  "/complete/login",
  "/authorizing/login",
  "/auth/login",
  "/process/auth/login",
  "/auth/login/redirect",
];

const screenshotRoutes = new Map([
  ["/sign-in", "sign-in-global-dark-forced-light.png"],
  ["/apply", "apply-global-dark-forced-light.png"],
  ["/verify/email/otp", "verify-email-otp-global-dark-forced-light.png"],
]);

const run = async () => {
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ executablePath: chromePath, headless: true });
  const context = await browser.newContext({
    colorScheme: "dark",
    viewport: { width: 1440, height: 1000 },
  });

  await context.addInitScript((value) => {
    localStorage.setItem("MELD-TECH.themeMode", value);
    const originalMatchMedia = window.matchMedia?.bind(window);
    window.matchMedia = (query) => {
      if (query === "(prefers-color-scheme: dark)") {
        return {
          matches: true,
          media: query,
          onchange: null,
          addEventListener: () => {},
          removeEventListener: () => {},
          addListener: () => {},
          removeListener: () => {},
          dispatchEvent: () => false,
        };
      }

      return originalMatchMedia
        ? originalMatchMedia(query)
        : {
            matches: false,
            media: query,
            onchange: null,
            addEventListener: () => {},
            removeEventListener: () => {},
            addListener: () => {},
            removeListener: () => {},
            dispatchEvent: () => false,
          };
    };
  }, storedDark);

  const page = await context.newPage();
  page.setDefaultTimeout(10000);
  const results = [];

  for (const route of routes) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(800);
    await page.waitForSelector(".theme-light", { timeout: 5000 }).catch(() => {});

    if (route === "/verify/email/otp") {
      const input = page.locator("#code-1");
      if (await input.count()) {
        await input.focus();
      }
    }

    const result = await page.evaluate(() => {
      const scope = document.querySelector(".theme-light");
      const styles = scope ? getComputedStyle(scope) : null;
      const active = document.activeElement;

      return {
        href: location.pathname,
        rootClass: document.documentElement.className,
        rootTheme: document.documentElement.dataset.theme || "",
        hasScope: Boolean(scope),
        scopeTheme: scope?.dataset.theme || "",
        colorSurface: styles?.getPropertyValue("--color-surface").trim() || "",
        colorSurfaceMuted: styles?.getPropertyValue("--color-surface-muted").trim() || "",
        colorTextPrimary: styles?.getPropertyValue("--color-text-primary").trim() || "",
        colorTextSecondary: styles?.getPropertyValue("--color-text-secondary").trim() || "",
        colorBrand: styles?.getPropertyValue("--color-brand").trim() || "",
        focusedOutlineColor: active ? getComputedStyle(active).outlineColor : "",
        focusedBorderColor: active ? getComputedStyle(active).borderColor : "",
        focusedBoxShadow: active ? getComputedStyle(active).boxShadow : "",
      };
    });

    const pass =
      result.rootTheme === "dark" &&
      result.hasScope &&
      result.scopeTheme === "light" &&
      result.colorSurface === "#ffffff";

    results.push({ route, pass, ...result });

    if (screenshotRoutes.has(route)) {
      await page.screenshot({
        path: path.join(outDir, screenshotRoutes.get(route)),
        fullPage: true,
      });
    }
  }

  fs.writeFileSync(path.join(outDir, "public-route-light-check.json"), JSON.stringify(results, null, 2));

  await browser.close();
  const failed = results.filter((entry) => !entry.pass);
  if (failed.length > 0) {
    throw new Error(`Public light check failed: ${JSON.stringify(failed, null, 2)}`);
  }

  console.log(`Public light check passed for ${results.length} routes.`);
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
