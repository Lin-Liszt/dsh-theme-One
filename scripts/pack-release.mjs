#!/usr/bin/env node
/**
 * Build the Release asset: `dist/milkwhite-theme.tgz`.
 *
 * Versionless on purpose: the market entry points at a fixed tag
 * (`releases/download/v<version>/milkwhite-theme.tgz`), so the asset name never changes.
 */
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'dist');
fs.mkdirSync(out, { recursive: true });

const packed = spawnSync(`npm pack --pack-destination "${out}"`, {
  cwd: root,
  shell: true,
  stdio: 'inherit',
});
if (packed.status !== 0) process.exit(packed.status ?? 1);

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const produced = path.join(out, `${pkg.name}-${pkg.version}.tgz`);
if (!fs.existsSync(produced)) {
  console.error(`expected ${produced} — npm pack produced something else`);
  process.exit(1);
}

const asset = path.join(out, `${pkg.name}.tgz`);
fs.rmSync(asset, { force: true });
fs.renameSync(produced, asset);

const sha256 = createHash('sha256').update(fs.readFileSync(asset)).digest('hex');
const size = (fs.statSync(asset).size / 1024 / 1024).toFixed(1);
console.log(`\nasset   ${path.relative(root, asset)}  (${size} MB)`);
console.log(`sha256  ${sha256}`);
