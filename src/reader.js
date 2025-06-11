import fs from 'fs'
import path from 'path'

const getAbsolutePath = filePath => path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath)

function readFile(filePath) {
  const format = path.extname(filePath)
  const absolutePath = getAbsolutePath(filePath)
  const data = fs.readFileSync(absolutePath, 'utf-8')
  const result = { data, format }
  return result
}

export default readFile
