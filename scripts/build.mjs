import { cpSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "dist");
const excluded = new Set([
  ".agents",
  ".codex",
  ".git",
  ".gitignore",
  ".wrangler",
  "dist",
  "node_modules",
  "package.json",
  "pnpm-lock.yaml",
  "pnpm-workspace.yaml",
  "scripts",
  "wrangler.jsonc",
]);

rmSync(output, { force: true, recursive: true });
mkdirSync(output, { recursive: true });

for (const entry of readdirSync(root)) {
  if (!excluded.has(entry)) {
    cpSync(resolve(root, entry), resolve(output, entry), { recursive: true });
  }
}
