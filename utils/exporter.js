#!/usr/bin/env node
const { ArgumentParser } = require('argparse');

const parser = new ArgumentParser({
  version: '0.0.1',
  addHelp: true,
  description: 'Exporter Help',
});
parser.addArgument(
  ['-i', '--in-file'],
  {
    help: 'the file we will be reading from, relavent to the current working dir',
    dest: 'in',
    required: true,
  },
);
parser.addArgument(
  ['-o', '--out-file'],
  {
    help: 'the file we will be writing to relavent to the current working dir',
    dest: 'out',
  },
);
parser.addArgument(
  ['-p', '--parser'],
  {
    help: 'a module that exports the function we will pass the lines form the file to',
  },
);
const args = parser.parseArgs();
const path = require('path');
const fs = require('fs');
const extractor = require('../lib/fileReader');

const loader = require(path.join(process.cwd(), args.parser));
const infile = args.in;
const outfile = args.out;
const p = args.parser;
console.debug(`configuring with infile= ${infile} outfile= ${outfile} `);
extractor.config({
  inFile: args.in,
  outFile: args.out,
});
console.debug(`passing the parsing function from ${p}`);
extractor.run(loader);
