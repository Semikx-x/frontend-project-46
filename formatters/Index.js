import formatPlain from './plain.js'
import formatStylish from './stylish.js'

function createFormater(formatName) {
  switch (formatName) {
    case 'stylish':
      return formatStylish
    case 'plain':
      return formatPlain
  }
}

export default createFormater
