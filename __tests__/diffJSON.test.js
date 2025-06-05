import { fileURLToPath } from 'url'
import difference from '../prarser.js'
import fs from 'fs'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
let expected

beforeAll(() => {
  expected = fs.readFileSync(getFixturePath('result.txt'), 'utf-8')
})

test('отличие', () => {
  const actualLines = difference('file1.json', 'file2.json').trim().split('\n')
  const expectedLines = expected.trim().split('\n')
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
