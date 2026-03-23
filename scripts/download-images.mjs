import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'public', 'images');
fs.mkdirSync(OUT, { recursive: true });

const ACCESS_KEY = 'unsplash_token'; //unsplash API access key (demo key with limited rate, replace with your own if needed)

// Search queries per category — product/studio oriented
const SEARCHES = {
  faucet: 'chrome bathroom faucet tap product',
  shower: 'shower head chrome bathroom product',
  basin:  'bathroom sink washbasin ceramic white product',
  toilet: 'toilet white ceramic bathroom product',
  bath:   'freestanding bathtub white bathroom product',
  towel:  'towel rail bar chrome bathroom product',
  acc:    'bathroom accessory soap dispenser chrome product',
};

// Files grouped by category prefix
const BY_CAT = {
  acc:    ['acc-1.jpg','acc-1b.jpg','acc-2.jpg','acc-3.jpg','acc-3b.jpg','acc-4.jpg','acc-5.jpg','acc-6.jpg','acc-6b.jpg','acc-7.jpg','acc-7b.jpg','acc-8.jpg','acc-8b.jpg','acc-9.jpg'],
  basin:  ['basin-1.jpg','basin-1b.jpg','basin-2.jpg','basin-2b.jpg','basin-3.jpg','basin-3b.jpg','basin-3c.jpg','basin-4.jpg','basin-4b.jpg','basin-5.jpg','basin-5b.jpg','basin-6.jpg','basin-7.jpg','basin-7b.jpg','basin-8.jpg','basin-8b.jpg','basin-8c.jpg'],
  bath:   ['bath-1.jpg','bath-1b.jpg','bath-2.jpg','bath-2b.jpg','bath-2c.jpg','bath-3.jpg','bath-3b.jpg','bath-4.jpg','bath-4b.jpg','bath-5.jpg','bath-5b.jpg','bath-6.jpg','bath-6b.jpg'],
  faucet: ['faucet-1.jpg','faucet-1b.jpg','faucet-1c.jpg','faucet-2.jpg','faucet-2b.jpg','faucet-3.jpg','faucet-3b.jpg','faucet-4.jpg','faucet-4b.jpg','faucet-5.jpg','faucet-5b.jpg','faucet-6.jpg','faucet-6b.jpg','faucet-7.jpg','faucet-7b.jpg','faucet-8.jpg','faucet-8b.jpg','faucet-9.jpg','faucet-9b.jpg'],
  shower: ['shower-1.jpg','shower-1b.jpg','shower-1c.jpg','shower-2.jpg','shower-2b.jpg','shower-3.jpg','shower-3b.jpg','shower-4.jpg','shower-4b.jpg','shower-4c.jpg','shower-5.jpg','shower-5b.jpg','shower-6.jpg','shower-6b.jpg','shower-7.jpg','shower-7b.jpg','shower-8.jpg','shower-8b.jpg'],
  toilet: ['toilet-1.jpg','toilet-1b.jpg','toilet-1c.jpg','toilet-2.jpg','toilet-2b.jpg','toilet-3.jpg','toilet-3b.jpg','toilet-4.jpg','toilet-4b.jpg','toilet-5.jpg'],
  towel:  ['towel-1.jpg','towel-1b.jpg','towel-2.jpg','towel-2b.jpg','towel-3.jpg','towel-3b.jpg','towel-4.jpg','towel-5.jpg','towel-5b.jpg'],
};

function apiGet(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.unsplash.com',
      path,
      headers: {
        'Authorization': `Client-ID ${ACCESS_KEY}`,
        'Accept-Version': 'v1',
      },
    };
    const req = https.get(options, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`API ${res.statusCode}: ${data}`));
          return;
        }
        resolve(JSON.parse(data));
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('API timeout')); });
  });
}

function downloadUrl(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest)) { resolve('skip'); return; }
    function get(url, depth = 0) {
      if (depth > 8) { reject(new Error('Too many redirects')); return; }
      const req = https.get(url, {
        headers: { 'User-Agent': 'BathHub/1.0', 'Accept': 'image/jpeg,image/*' }
      }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const next = res.headers.location.startsWith('http') ? res.headers.location : new URL(res.headers.location, url).toString();
          res.resume(); get(next, depth + 1); return;
        }
        if (res.statusCode !== 200) { res.resume(); reject(new Error(`HTTP ${res.statusCode}`)); return; }
        const f = fs.createWriteStream(dest);
        res.pipe(f);
        f.on('finish', () => { f.close(); resolve('ok'); });
        f.on('error', (e) => { fs.unlink(dest, () => {}); reject(e); });
      });
      req.on('error', reject);
      req.setTimeout(30000, () => { req.destroy(); reject(new Error('Timeout')); });
    }
    get(url);
  });
}

const totalFiles = Object.values(BY_CAT).flat().length;
console.log(`Fetching Unsplash search results for ${Object.keys(BY_CAT).length} categories...`);
console.log(`Total files to download: ${totalFiles}\n`);

let downloaded = 0, skipped = 0, failed = 0;

for (const [cat, files] of Object.entries(BY_CAT)) {
  const query = SEARCHES[cat];
  console.log(`[${cat}] Searching: "${query}" (need ${files.length} photos)`);

  let photos = [];
  try {
    // Request enough photos — may need multiple pages if per_page < needed
    const needed = files.length;
    const perPage = Math.min(30, needed);
    const data = await apiGet(`/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=squarish&content_filter=high`);
    photos = data.results;
    console.log(`  Found ${data.total} total, got ${photos.length} results`);
    // If we need more than 30, get page 2 as well
    if (needed > 30 && data.total_pages >= 2) {
      const data2 = await apiGet(`/search/photos?query=${encodeURIComponent(query)}&per_page=30&orientation=squarish&content_filter=high&page=2`);
      photos = photos.concat(data2.results);
    }
  } catch (e) {
    console.error(`  FAIL search: ${e.message}`);
    failed += files.length;
    continue;
  }

  // Small delay between API calls to be polite
  await new Promise(r => setTimeout(r, 400));

  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    const photo = photos[i % photos.length]; // cycle if we have fewer photos than files
    if (!photo) { console.log(`  SKIP ${filename} — no photo available`); failed++; continue; }

    // Use raw URL with crop params for a clean 600x600 product shot
    const imgUrl = photo.urls.raw + '&w=600&h=600&fit=crop&crop=entropy&q=85&fm=jpg';
    const dest = path.join(OUT, filename);

    try {
      const result = await downloadUrl(imgUrl, dest);
      if (result === 'skip') {
        process.stdout.write(`  SKIP ${filename} (exists)\n`);
        skipped++;
      } else {
        process.stdout.write(`  OK   ${filename}\n`);
        downloaded++;
      }
    } catch (e) {
      process.stdout.write(`  FAIL ${filename}: ${e.message}\n`);
      failed++;
    }

    await new Promise(r => setTimeout(r, 150));
  }

  console.log('');
}

console.log('==========================================');
console.log(`Done. Downloaded: ${downloaded}, Skipped: ${skipped}, Failed: ${failed}`);
console.log(`Total files: ${totalFiles}`);
