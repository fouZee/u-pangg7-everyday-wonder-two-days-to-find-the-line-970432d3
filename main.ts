// Everyday Wonder, Two Days to Find the Line
// make.fun bounty: u-pangg7-everyday-wonder-two-days-to-find-the-line-970432d3
//
// Writes one sentence (1-200 characters) about a small moment of wonder
// in everyday life to /output/entry.txt, validating it against the bounty
// gate first: UTF-8 text, 1 to 200 characters, not only white space.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "Autocorrect turned my 'on my way' into 'on my weigh', and suddenly my phone knew more about my evening than I did.";

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
  // The bounty asks for exactly one sentence: a single terminal mark,
  // at the end, and no second sentence hiding inside.
  const terminators = (text.match(/[.!?]/g) ?? []).length;
  if (terminators !== 1 || !text.endsWith(".")) {
    throw new Error(
      `entry must be exactly one sentence (found ${terminators} sentence terminator(s))`,
    );
  }
}

validate(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`wrote ${ENTRY.length}-character entry to /output/entry.txt`);
