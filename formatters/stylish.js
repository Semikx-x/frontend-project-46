import { isObject } from '../src/difference.js'

const stringify = (value, depth) => {
  if (!isObject(value)) return String(value)
  const indent = ' '.repeat(depth * 4)
  const entries = Object.entries(value)
    .map(([k, v]) => `${indent}    ${k}: ${stringify(v, depth + 1)}`)
  return `{\n${entries.join('\n')}\n${indent}}`
}

const formatStylish = (diff, depth = 1) => {
  const indent = ' '.repeat(depth * 4 - 2)
  const lines = diff.flatMap((node) => {
    switch (node.type) {
      case 'added':
        return `${indent}+ ${node.key}: ${stringify(node.value, depth)}`
      case 'removed':
        return `${indent}- ${node.key}: ${stringify(node.value, depth)}`
      case 'unchanged':
        return `${indent}  ${node.key}: ${stringify(node.value, depth)}`
      case 'changed':
        return [
          `${indent}- ${node.key}: ${stringify(node.oldValue, depth)}`,
          `${indent}+ ${node.key}: ${stringify(node.newValue, depth)}`,
        ]
      case 'nested':
        return `${indent}  ${node.key}: ${formatStylish(node.children, depth + 1)}`
    }
  })

  return `{\n${lines.join('\n')}\n${' '.repeat((depth - 1) * 4)}}`
}

export default formatStylish
