import fs from 'fs'
import path from 'path'

const getAbsolutePath = filePath => path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath)

const parseFile = (filePath) => {
  const absolutePath = getAbsolutePath(filePath)
  const data = fs.readFileSync(absolutePath, 'utf-8')
  return data
}

export default parseFile
