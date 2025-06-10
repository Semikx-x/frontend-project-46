import { fileURLToPath } from 'url'
import difference from '../src/diference.js'
import fs from 'fs'
import path from 'path'
import { expect, test, beforeAll } from '@jest/globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
let expectedStyle
let expectedPlain
let expectedJson
let file1JSON
let file2JSON
let file1Yaml
let file2Yml

beforeAll(() => {
  expectedStyle = fs.readFileSync(getFixturePath('result.txt'), 'utf-8')
  expectedPlain = fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8')
  expectedJson = fs.readFileSync(getFixturePath('resultJson.txt'), 'utf-8')
  file1JSON = getFixturePath('file1.json')
  file2JSON = getFixturePath('file2.json')
  file1Yaml = getFixturePath('file1.yaml')
  file2Yml = getFixturePath('file2.yml')
})

test('отличие JSON', () => {
  const actualLines = difference(file1JSON, file2JSON)
  const expectedLines = expectedStyle
  expect(actualLines).toEqual(expectedLines)
})

test('отличие JSON Plain', () => {
  const actualLines = difference(file1JSON, file2JSON, 'plain')
  const expectedLines = expectedPlain
  expect(actualLines).toEqual(expectedLines)
})

test('отличие JSON Json', () => {
  const actualLines = difference(file1JSON, file2JSON, 'json')
  const expectedLines = expectedJson
  expect(actualLines).toEqual(expectedLines)
})

test('отличиеYaml', () => {
  const actualLines = difference(file1Yaml, file2Yml)
  const expectedLines = expectedStyle
  expect(actualLines).toEqual(expectedLines)
})

test('отличиеYaml Plain', () => {
  const actualLines = difference(file1Yaml, file2Yml, 'plain')
  const expectedLines = expectedPlain
  expect(actualLines).toEqual(expectedLines)
})

test('отличиеYaml Json', () => {
  const actualLines = difference(file1Yaml, file2Yml, 'json')
  const expectedLines = expectedJson
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
