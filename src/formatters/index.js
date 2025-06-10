import formatPlain from './plain.js'
import formatStylish from './stylish.js'
import formatJson from './json.js'

function createFormater(formatName) {
  switch (formatName) {
    case 'stylish':
      return formatStylish
    case 'plain':
      return formatPlain
    case 'json':
      return formatJson
  }
}

export default createFormater
