import formatPlain from './plain.js'
import formatStylish from './stylish.js'
import formatJSON from './json.js'

function createFormater(formatName) {
  switch (formatName) {
    case 'stylish':
      return formatStylish
    case 'plain':
      return formatPlain
    case 'json':
      return formatJSON
  }
}

export default createFormater
