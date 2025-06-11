import { isObject } from '../buildDiff.js'

const stringify = (value, depth, createIndent) => {
  if (!isObject(value)) return String(value)
  const indent = createIndent(depth)
  const entries = Object.entries(value)
    .map(([k, v]) => `${indent}    ${k}: ${stringify(v, depth + 1, createIndent)}`)
  return `{\n${entries.join('\n')}\n${indent}}`
}

const formatStylish = (diff, depth = 1, createIndent = createWhitespaceIndent) => {
  const indent = createIndent(depth, 2)
  const lines = diff.flatMap((node) => {
    switch (node.type) {
      case 'added':
        return `${indent}+ ${node.key}: ${stringify(node.value, depth, createIndent)}`
      case 'removed':
        return `${indent}- ${node.key}: ${stringify(node.value, depth, createIndent)}`
      case 'unchanged':
        return `${indent}  ${node.key}: ${stringify(node.value, depth, createIndent)}`
      case 'changed':
        return [
          `${indent}- ${node.key}: ${stringify(node.oldValue, depth, createIndent)}`,
          `${indent}+ ${node.key}: ${stringify(node.newValue, depth, createIndent)}`,
        ]
      case 'nested':
        return `${indent}  ${node.key}: ${formatStylish(node.children, depth + 1)}`
    }
  })

  return `{\n${lines.join('\n')}\n${createIndent(depth - 1)}}`
}

function createWhitespaceIndent(depth = 1, shiftToLeft = 0) {
  return ' '.repeat(depth * 4 - shiftToLeft)
}

export default formatStylish
