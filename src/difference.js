import parseFile from './parser.js'
import createFormater from './formatters/index.js'
import readFile from './reader.js'
import buildDiff from './buildDiff.js'

function difference(filePath1, filePath2, formatName = 'stylish') {
  const readFile1 = readFile(filePath1)
  const readFile2 = readFile(filePath2)
  const parsedFile1 = parseFile(readFile1.data, readFile1.format)
  const parsedFile2 = parseFile(readFile2.data, readFile2.format)
  const diff = buildDiff(parsedFile1, parsedFile2)
  const formater = createFormater(formatName)
  return formater(diff)
}

export default difference
