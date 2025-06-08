import parseFile from './parser'

function difference(filePath1, filePath2) {
  const parsedFile1 = parseFile(filePath1)
  const parsedFile2 = parseFile(filePath2)
  const allKeys = Array.from(new Set([...Object.keys(parsedFile1), ...Object.keys(parsedFile2)]))
  const sortedKeys = allKeys.toSorted((a, b) => a.localeCompare(b))

  const lines = sortedKeys.map((key) => {
    const has1 = Object.hasOwn(parsedFile1, key)
    const has2 = Object.hasOwn(parsedFile2, key)

    if (!has2) {
      return `- ${key}: ${parsedFile1[key]}`
    }
    if (!has1) {
      return `+ ${key}: ${parsedFile2[key]}`
    }
    if (parsedFile1[key] !== parsedFile2[key]) {
      return `- ${key}: ${parsedFile1[key]}\n+ ${key}: ${parsedFile2[key]}`
    }
    return `  ${key}: ${parsedFile1[key]}`
  })

  return `{\n${lines.join('\n')}\n}`
}

export default difference
