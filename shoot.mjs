// Render draw.html in headless Chrome and save it as entry.png (JPEG bytes).
// The gate reads the format from the first bytes, so a JPEG named entry.png is fine.
// Puppeteer lives in the shared shots-tool checkout; resolve it from there.
import { createRequire } from 'node:module';
import { statSync } from 'node:fs';

const require = createRequire('/home/hatch/workspace/makefun/shots-tool/package.json');
const puppeteer = require('puppeteer');

const DIR = new URL('.', import.meta.url).pathname;
const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--force-color-profile=srgb'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1024, height: 1230, deviceScaleFactor: 1 });
await page.goto('file://' + DIR + 'draw.html', { waitUntil: 'networkidle0' });
await page.screenshot({ path: DIR + 'entry.png', type: 'jpeg', quality: 86 });
await browser.close();
console.log('entry.png', statSync(DIR + 'entry.png').size, 'bytes');
