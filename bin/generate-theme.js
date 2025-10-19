#!/usr/bin/env node

import { execSync } from 'node:child_process'
import path, { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Path to your theme file
const initialTheme = resolve(__dirname, './templates/compose-theme.css')

var cwd = path.resolve()
console.log('📟 - path → ', path)
console.log('📟 - path.resolve() → ', path.resolve())

// Path where the command was executed from (the user’s project root)
const userPath = process.env.INIT_CWD
console.log('📟 - process.env.INIT_CWD → ', process.env.INIT_CWD)

// Destination path
const destination = resolve(cwd, './compose-theme.css')

try {
  // Copy using cp
  execSync(`cp "${initialTheme}" "${destination}"`)
  console.log(`✅ Theme file copied to: ${destination}`)
} catch (error) {
  console.error('❌ Failed to copy theme file:', error.message)
  process.exit(1)
}
