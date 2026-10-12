// Usage: npm run set-passcode -- <slug> <passcode>
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const [slug, code] = process.argv.slice(2);
if (!slug || !code) {
  console.error('Usage: npm run set-passcode -- <slug> <passcode>');
  process.exit(1);
}
const file = new URL('../src/data/private.ts', import.meta.url);
const hash = createHash('sha256').update(code).digest('hex');
let src = readFileSync(file, 'utf8');
const re = new RegExp(`(\\n\\s*${slug}:\\s*)'[^']*'`);
src = re.test(src)
  ? src.replace(re, `$1'${hash}'`)
  : src.replace('};', `  ${slug}: '${hash}',\n};`);
writeFileSync(file, src);
console.log(`Passcode for /${slug} updated.`);
