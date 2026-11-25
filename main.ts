// Everyday Wonder, Two Days to Find the Line
// make.fun bounty: u-pangg7-everyday-wonder-two-days-to-find-the-line-970432d3
//
// Writes one sentence (1-200 characters) about a small moment of wonder
// in everyday life to /output/entry.txt, validating it against the bounty
// gate first: UTF-8 text, 1 to 200 characters, not only white space.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "My phone's autocorrect turned 'on my way' into 'on my weigh', and suddenly the text knew more about my evening than I did.";

const MAX_CHARS = 200;

function validate(text: string): void {
  if (typeof text !== "string" || text.length === 0) {
    throw new Error("entry is empty");
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only white space");
  }
  if (text.length > MAX_CHARS) {
    throw new Error(
      `entry is ${text.length} characters, over the ${MAX_CHARS}-character limit`,
    );
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

validate(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`wrote ${ENTRY.length}-character entry to /output/entry.txt`);
