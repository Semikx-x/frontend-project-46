#!/usr/bin/env node

import { Command } from 'commander';

const gendiff = new Command();

gendiff
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1');

gendiff.parse(process.argv);

export default gendiff;