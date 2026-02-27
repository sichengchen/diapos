#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { resolve, join, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const projectName = process.argv[2]

if (!projectName) {
  console.error('Usage: create-diapos <project-name>')
  process.exit(1)
}

const targetDir = resolve(process.cwd(), projectName)

if (existsSync(targetDir)) {
  console.error(`Error: Directory "${projectName}" already exists.`)
  process.exit(1)
}

const templateDir = resolve(__dirname, '..', 'template')

mkdirSync(targetDir, { recursive: true })
cpSync(templateDir, targetDir, { recursive: true })

// Update package.json with project name
const pkgPath = join(targetDir, 'package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
pkg.name = basename(projectName)
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')

console.log(`\nCreated "${projectName}" with diapos template.\n`)
console.log('Next steps:')
console.log(`  cd ${projectName}`)
console.log('  bun install')
console.log('  bun run dev')
console.log('')
