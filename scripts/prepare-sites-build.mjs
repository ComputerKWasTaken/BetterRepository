import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const serverDirectory = path.join(repoRoot, 'dist', 'server')
const serverEntry = path.join(serverDirectory, 'index.js')

const workerSource = `const worker = {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request)
    if (response.status !== 404 || request.method !== 'GET') return response

    const acceptsHtml = request.headers.get('accept')?.includes('text/html')
    if (!acceptsHtml) return response

    const fallbackUrl = new URL('/index.html', request.url)
    return env.ASSETS.fetch(new Request(fallbackUrl, request))
  }
}

export default worker
`

await fs.mkdir(serverDirectory, { recursive: true })
await fs.writeFile(serverEntry, workerSource, 'utf8')

console.log('Prepared Cloudflare Worker entry for Sites hosting.')
