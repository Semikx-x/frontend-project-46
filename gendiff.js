#!/usr/bin/env node

import { Command } from 'commander'
import difference from './src/diference.js'
import formatStylish from './src/stylish.js'

const gendiff = new Command()

gendiff
  .argument('<filePath1>')
  .argument('<filePath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filePath1, filePath2) => {
    const differenceResult = difference(filePath1, filePath2)
    let formatedOuput

    if (gendiff.opts().format == 'stylish') {
      formatedOuput = formatStylish(differenceResult)
    }
    console.log(formatedOuput)
  })

gendiff.parse(process.argv)

export default gendiff
