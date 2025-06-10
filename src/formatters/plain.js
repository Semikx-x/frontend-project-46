const formatValue = (value) => {
  if (typeof value === 'object' && value !== null) return '[complex value]'
  if (typeof value === 'string') return `${value}`
  return String(value)
}

function getDisplayValue(value) {
  return typeof (value) == String ? `'${value}'` : value
}

const formatPlain = (diff, path = []) => {
  const lines = diff.flatMap((node) => {
    const propertyPath = [...path, node.key].join('.')
    switch (node.type) {
      case 'added':
        return `Property '${propertyPath}' was added with value: ${getDisplayValue(formatValue(node.value))}`
      case 'removed':
        return `Property '${propertyPath}' was removed`
      case 'unchanged':
        return []
      case 'changed':
        return `Property '${propertyPath}' was updated. From ${getDisplayValue(formatValue(node.oldValue))} to ${getDisplayValue(formatValue(node.newValue))}`
      case 'nested':
        return formatPlain(node.children, [...path, node.key])
    }
  })

  return lines.join('\n')
}

export default formatPlain
