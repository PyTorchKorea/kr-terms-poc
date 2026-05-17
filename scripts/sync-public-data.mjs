import { cpSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const sourceDir = resolve(rootDir, 'data')
const targetDir = resolve(rootDir, 'public', 'data')

rmSync(targetDir, { force: true, recursive: true })
cpSync(sourceDir, targetDir, { recursive: true })
