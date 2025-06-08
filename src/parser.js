import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const getAbsolutePath = filePath => path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath)

const parseFile = (filePath) => {
  const format = path.extname(filePath)
  const absolutePath = getAbsolutePath(filePath)
  const data = fs.readFileSync(absolutePath, 'utf-8')
  if (format === '.json') {
    return JSON.parse(data)
  }
  else if (format === '.yml' || format === '.yaml') {
    return yaml.load(data)
  }
  throw new Error('not supported')
}

export default parseFile
