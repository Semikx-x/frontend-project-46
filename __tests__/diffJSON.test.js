import { fileURLToPath } from 'url'
import difference from '../src/difference.js'
import fs from 'fs'
import path from 'path'
import { expect, test, describe } from '@jest/globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

describe('diff', () => {
  test.each([
    { input: { filePath1: 'file1.json', filePath2: 'file2.json', format: undefined }, expected: 'result.txt' },
    { input: { filePath1: 'file1.json', filePath2: 'file2.json', format: 'plain' }, expected: 'resultPlain.txt' },
    { input: { filePath1: 'file1.json', filePath2: 'file2.json', format: 'json' }, expected: 'resultJson.txt' },
    { input: { filePath1: 'file1.yaml', filePath2: 'file2.yml', format: undefined }, expected: 'result.txt' },
    { input: { filePath1: 'file1.yaml', filePath2: 'file2.yml', format: 'plain' }, expected: 'resultPlain.txt' },
    { input: { filePath1: 'file1.yaml', filePath2: 'file2.yml', format: 'json' }, expected: 'resultJson.txt' },
  ])('diff', ({ input, expected }) => {
    const file1 = getFixturePath(input.filePath1)
    const file2 = getFixturePath(input.filePath2)
    const expectedResult = fs.readFileSync(getFixturePath(expected), 'utf-8')
    const actualLines = difference(file1, file2, input.format)
    expect(actualLines).toEqual(expectedResult)
  })
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
