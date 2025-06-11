import yaml from 'js-yaml'

const parseFile = (data, format) => {
  if (format === '.json') {
    return JSON.parse(data)
  }
  else if (format === '.yml' || format === '.yaml') {
    return yaml.load(data)
  }
}

export default parseFile
