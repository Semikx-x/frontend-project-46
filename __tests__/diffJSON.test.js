import { fileURLToPath } from 'url'
import difference from '../src/diference.js'
import fs from 'fs'
import path from 'path'
import { expect, test, beforeAll } from '@jest/globals'
import formatStylish from '../src/stylish.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
let expected
let file1JSON
let file2JSON
let file1Yaml
let file2Yml

beforeAll(() => {
  expected = fs.readFileSync(getFixturePath('result.txt'), 'utf-8')
  file1JSON = getFixturePath('file1.json')
  file2JSON = getFixturePath('file2.json')
  file1Yaml = getFixturePath('file1.yaml')
  file2Yml = getFixturePath('file2.yml')
})

test('отличие JSON', () => {
  const actualLines = formatStylish(difference(file1JSON, file2JSON))
  const expectedLines = expected
  expect(actualLines).toEqual(expectedLines)
})

test('отличиеYaml', () => {
  const actualLines = formatStylish(difference(file1Yaml, file2Yml))
  const expectedLines = expected
  expect(actualLines).toEqual(expectedLines)
})

test('нет файла2', () => {
  expect(() => {
    difference('file1.JSON')
  }).toThrow()
})

test('нет аргументов', () => {
  expect(() => {
    difference()
  }).toThrow()
})

test('неподерживаемый формат', () => {
  expect(() => {
    difference(getFixturePath('result.txt'))
  }).toThrow()
})
