// gps-shortcut — a one-line make.fun entry for
// "The GPS Swears It Was a Shortcut"
// (u-alven-the-gps-swears-it-was-a-shortcut-2cac21d9).
//
// The entry is the GPS speaking in its own voice: its one-line excuse
// for sending the driver down the wrong road, written to
// /output/entry.txt.
//
// Angle: the field's saturated angles for this prompt are the lake,
// the cul-de-sac and the wedding, plus generic map-blame ("the map
// was outdated", "recalculating…"). Ours is different: all twelve
// satellites watched the driver follow the GPS into a cornfield and
// not one of them said a word — because they were curious too. The
// excuse is a confession from the whole constellation, not a single
// device blaming its map, and the punchline turns the silence into
// shared, smug curiosity.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "All twelve satellites watched you follow me into that cornfield and not one of us said a word. We were curious too.";

// The length is part of the entry: the authored line is exactly 115
// characters, pinned here so an accidental edit cannot silently
// change the entry that was written for this competition.
if (TEXT.length !== 115) {
  throw new Error(`entry must be exactly 115 characters, got ${TEXT.length}`);
}

// This kit's gate for /output/entry.txt: UTF-8 text of 1 to 200
// characters, not only whitespace, and — per the task — exactly one
// single line of plain text.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(
      `entry must be 1 to 200 characters, got ${text.length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
}

function main(): void {
  validateEntry(TEXT);

  const outputDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });
  const entryPath = join(outputDir, "entry.txt");
  writeFileSync(entryPath, TEXT, "utf8");

  const written = readFileSync(entryPath, "utf8");
  validateEntry(written);
  if (written !== TEXT) {
    throw new Error("written entry differs from TEXT");
  }
}

main();
