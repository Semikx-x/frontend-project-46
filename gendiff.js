#!/usr/bin/env node

import { Command } from 'commander'
import parseFile from './prarser.js'

const gendiff = new Command()

gendiff
  .argument('<filePath1>')
  .argument('<filePath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format')
  .action((filePath1, filePath2) => {
    console.log(`${parseFile(filePath1)} ${parseFile(filePath2)}`)
    });

gendiff.parse(process.argv)

export default gendiff
