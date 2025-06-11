const isObject = val => val && typeof val === 'object' && !Array.isArray(val)

function buildDiff(data1, data2) {
  const keys = Array.from(new Set([...Object.keys(data1), ...Object.keys(data2)])).sort()

  return keys.map((key) => {
    const val1 = data1[key]
    const val2 = data2[key]

    if (!Object.hasOwn(data2, key)) {
      return { key, type: 'removed', value: val1 }
    }
    if (!Object.hasOwn(data1, key)) {
      return { key, type: 'added', value: val2 }
    }
    if (isObject(val1) && isObject(val2)) {
      return { key, type: 'nested', children: buildDiff(val1, val2) }
    }
    if (val1 !== val2) {
      return { key, type: 'changed', oldValue: val1, newValue: val2 }
    }
    return { key, type: 'unchanged', value: val2 }
  })
}

export default buildDiff
export { isObject }
