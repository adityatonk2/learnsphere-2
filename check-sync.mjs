import fs from 'fs';

const locales = ['en', 'hi', 'ar', 'fr', 'es', 'pt', 'de', 'ja', 'zh'];

function flatten(obj, prefix = '') {
  let keys = [];
  for (const k of Object.keys(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    const val = obj[k];
    if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
      keys = keys.concat(flatten(val, path));
    } else if (Array.isArray(val)) {
      keys.push(`${path}[array:${val.length}]`);
    } else {
      keys.push(path);
    }
  }
  return keys;
}

const data = {};
for (const loc of locales) {
  data[loc] = JSON.parse(fs.readFileSync(`./messages/${loc}.json`, 'utf8'));
}

const enKeys = new Set(flatten(data.en));
let allGood = true;

for (const loc of locales) {
  if (loc === 'en') continue;
  const locKeys = new Set(flatten(data[loc]));
  const missing = [...enKeys].filter((k) => !locKeys.has(k));
  const extra = [...locKeys].filter((k) => !enKeys.has(k));
  if (missing.length || extra.length) {
    allGood = false;
    console.log(`\n=== ${loc} ===`);
    if (missing.length) {
      console.log(`Missing (${missing.length}):`);
      missing.forEach((k) => console.log(`  - ${k}`));
    }
    if (extra.length) {
      console.log(`Extra (${extra.length}):`);
      extra.forEach((k) => console.log(`  + ${k}`));
    }
  }
}

if (allGood) {
  console.log('All 9 locales in sync');
} else {
  process.exit(1);
}
