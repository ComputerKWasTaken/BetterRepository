import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath, pathToFileURL } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ecosystemRoot = path.resolve(repoRoot, '..')
const verifyDist = process.argv.includes('--dist')
const failures = []
const passes = []

const read = relativePath => fs.readFileSync(path.join(repoRoot, relativePath), 'utf8')
const exists = relativePath => fs.existsSync(path.join(repoRoot, relativePath))
const pass = message => passes.push(message)
const fail = message => failures.push(message)
const check = (condition, message) => condition ? pass(message) : fail(message)

const sha256 = filePath => crypto
  .createHash('sha256')
  .update(fs.readFileSync(filePath))
  .digest('hex')

const walk = directory => fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const fullPath = path.join(directory, entry.name)
  return entry.isDirectory() ? walk(fullPath) : [fullPath]
})

const packageJson = JSON.parse(read('package.json'))
check(packageJson.version === '1.7.0', 'package metadata is V1.7')

const releasedModules = ['ai', 'clock', 'network', 'sdk', 'system', 'weather', 'webfetch', 'widget']
const moduleContracts = {
  ai: ['status', 'query'],
  clock: ['now', 'tz', 'format'],
  network: ['status'],
  sdk: ['version', 'config'],
  system: ['info', 'power'],
  weather: ['current', 'forecast'],
  webfetch: ['fetch', 'search']
}
const guideFiles = {
  ai: 'UltrascriptsAiGuide.vue',
  clock: 'UltrascriptsClockGuide.vue',
  network: 'UltrascriptsNetworkGuide.vue',
  sdk: 'UltrascriptsSdkGuide.vue',
  system: 'UltrascriptsSystemGuide.vue',
  weather: 'UltrascriptsWeatherGuide.vue',
  webfetch: 'UltrascriptsWebFetchGuide.vue'
}
const moduleRoot = path.join(ecosystemRoot, 'BetterDungeon', 'modules')
const actualModules = fs.readdirSync(moduleRoot, { withFileTypes: true })
  .filter(entry => entry.isDirectory() && fs.existsSync(path.join(moduleRoot, entry.name, 'module.js')))
  .map(entry => entry.name)
  .sort()
check(
  JSON.stringify(actualModules) === JSON.stringify(releasedModules),
  'BetterDungeon exposes the released eight-module set'
)
for (const [moduleId, operations] of Object.entries(moduleContracts)) {
  const moduleSource = fs.readFileSync(path.join(moduleRoot, moduleId, 'module.js'), 'utf8')
  const guideSource = read(`src/components/guides/${guideFiles[moduleId]}`)
  for (const operation of operations) {
    check(
      new RegExp(`\\b${operation}:\\s*\\{`).test(moduleSource),
      `BetterDungeon ${moduleId} module exposes ${operation}`
    )
    check(
      guideSource.includes(`${moduleId}.${operation}`),
      `${moduleId} guide documents ${moduleId}.${operation}`
    )
  }
}
const widgetModule = fs.readFileSync(path.join(moduleRoot, 'widget', 'module.js'), 'utf8')
const widgetGuide = read('src/components/guides/UltrascriptsWidgetGuide.vue')
check(widgetModule.includes('ultrascripts:state:widget'), 'BetterDungeon Widget module consumes widget state')
check(widgetGuide.includes('ultrascripts:state:widget'), 'Widget guide documents the widget state contract')

const ultrascriptsPage = read('src/pages/UltrascriptsPage.vue')
for (const moduleId of releasedModules) {
  check(
    new RegExp(`id:\\s*'${moduleId}'`).test(ultrascriptsPage),
    `Ultrascripts navigation includes ${moduleId}`
  )
}
check(/>8<\/strong> first-party modules/.test(ultrascriptsPage), 'Ultrascripts page reports eight modules')

const infoDump = read('docs/guides/info-dumps/ultrascripts.md')
check(/All eight first-party modules/.test(infoDump), 'Ultrascripts info dump reports eight modules')
for (const moduleId of releasedModules) {
  check(infoDump.includes(`\`${moduleId}\``), `Ultrascripts info dump includes ${moduleId}`)
}

const templatePairs = [
  ['ultrascripts-starter-template', 'library', 'library'],
  ['ultrascripts-starter-template', 'input', 'input'],
  ['ultrascripts-starter-template', 'context', 'context'],
  ['ultrascripts-starter-template', 'output', 'output'],
  ['ultrascripts-required-template', 'library', 'library'],
  ['ultrascripts-required-template', 'input', 'input'],
  ['ultrascripts-required-template', 'context', 'context'],
  ['ultrascripts-required-template', 'output', 'output']
]

for (const [templateId, sourcePart, publicPart] of templatePairs) {
  const sourcePath = path.join(
    ecosystemRoot,
    'BetterDungeon',
    'examples',
    'aid-scripts',
    templateId,
    `${sourcePart}.js`
  )
  const publicPath = path.join(
    repoRoot,
    'src',
    'data',
    'raw-scripts',
    publicPart,
    `${templateId}.js`
  )
  check(
    fs.existsSync(sourcePath) && fs.existsSync(publicPath) && sha256(sourcePath) === sha256(publicPath),
    `${templateId}/${sourcePart} matches BetterDungeon`
  )
}

const scriptsData = read('src/data/scripts.js')
check(
  /id:\s*'stateboy'[\s\S]*?releaseStatus:\s*'unpublished'/.test(scriptsData),
  'Stateboy is marked unpublished in catalog data'
)
check(
  /public copy and download controls remain disabled|Copy and download actions remain withheld/.test(scriptsData),
  'Stateboy release wording withholds public distribution'
)
for (const part of ['library', 'input', 'context', 'output']) {
  check(exists(`src/data/raw-scripts/${part}/stateboy.js`), `Stateboy ${part} source is tracked`)
}

const storyCardsModule = await import(pathToFileURL(path.join(repoRoot, 'src/data/storyCards.js')).href)
const presets = storyCardsModule.STORY_CARD_COMMAND_PRESETS
const requiredPresetFields = [
  'id', 'name', 'category', 'difficulty', 'impact', 'essential', 'tags',
  'description', 'useCase', 'command', 'entryFormatting', 'additionalContext',
  'logInNotes', 'speedCreate'
]
check(presets.length === 13, 'Story Card seed data contains thirteen presets')
check(new Set(presets.map(preset => preset.id)).size === presets.length, 'Story Card preset ids are unique')
for (const preset of presets) {
  check(
    requiredPresetFields.every(field => Object.hasOwn(preset, field)),
    `${preset.id} contains every required seed field`
  )
  check(preset.command.includes('{{title}}'), `${preset.id} contains the required title token`)
  check(preset.command.length <= 2000, `${preset.id} command stays within 2,000 characters`)
  check(preset.additionalContext.length <= 2000, `${preset.id} context stays within 2,000 characters`)
  check(['none', 'curly', 'bracket'].includes(preset.entryFormatting), `${preset.id} uses a valid format`)
}

const searchSource = read('src/composables/useGlobalSearch.js')
for (const collectionId of ['story-card-presets', 'guides', 'ultrascripts-guides']) {
  check(searchSource.includes(`'${collectionId}'`), `global search indexes ${collectionId}`)
}

const routeSource = read('src/router/index.js')
const routePaths = new Set(
  [...routeSource.matchAll(/path:\s*'([^']+)'/g)]
    .map(match => match[1])
    .filter(routePath => !routePath.includes(':'))
)
const vueFiles = walk(path.join(repoRoot, 'src')).filter(filePath => filePath.endsWith('.vue'))
const unresolvedLinks = []
for (const filePath of vueFiles) {
  const source = fs.readFileSync(filePath, 'utf8')
  for (const match of source.matchAll(/<router-link\b[^>]*\bto="([^"]+)"/g)) {
    const target = match[1]
    if (!target.startsWith('/')) continue
    const routePath = target.split(/[?#]/, 1)[0] || '/'
    if (!routePaths.has(routePath)) {
      unresolvedLinks.push(`${path.relative(repoRoot, filePath)} -> ${target}`)
    }
  }
}
check(unresolvedLinks.length === 0, `all static internal links resolve${unresolvedLinks.length ? `: ${unresolvedLinks.join(', ')}` : ''}`)

const requiredRoutes = [
  '/', '/ai-instructions', '/plot-components', '/story-cards', '/scripts',
  '/ultrascripts', '/guides', '/contribute', '/ecosystem', '/credits'
]
for (const routePath of requiredRoutes) {
  check(routePaths.has(routePath), `primary route ${routePath} is registered`)
}

const scriptItem = read('src/components/ui/ScriptItem.vue')
check(scriptItem.includes('URL.createObjectURL'), 'script downloads use browser object URLs')
check(scriptItem.includes('isUnpublished'), 'script UI distinguishes unpublished entries')

const publicSurface = [
  read('src/pages/HomePage.vue'),
  read('src/pages/UltrascriptsPage.vue'),
  read('src/pages/ScriptsPage.vue'),
  read('src/router/index.js'),
  read('src/components/layout/Sidebar.vue'),
  read('netlify/edge-functions/inject-meta.js'),
  infoDump
].join('\n')
const staleClaims = [
  ['stale v1.6 label', /\bv1\.6\b/i],
  ['stale nine-module claim', /\b(?:nine|9)\s+first-party modules\b/i],
  ['retired Provider AI name', /\bProvider AI\b/i],
  ['false Stateboy debut claim', /\bStateboy debuts\b/i]
]
for (const [label, pattern] of staleClaims) {
  check(!pattern.test(publicSurface), `public surface has no ${label}`)
}

const ultrascriptsGuides = walk(path.join(repoRoot, 'src/components/guides'))
  .filter(filePath => /Ultrascripts.*Guide\.vue$/.test(filePath))
  .map(filePath => fs.readFileSync(filePath, 'utf8'))
  .join('\n')
const retiredGuidePatterns = [
  ['ultrascripts.profile', /ultrascripts\.profile/],
  ['provider alias', /\bproviderAI\b|\bprovider-ai\b/],
  ['retired max_tokens field', /\bmax_tokens\b/],
  ['retired response_format field', /\bresponse_format\b/],
  ['retired clock data.now field', /\bdata\.now\b/],
  ['retired accuracyMeters field', /\baccuracyMeters\b/],
  ['retired stat-bar widget', /type:\s*['"]stat-bar['"]/],
  ['retired badge-list widget', /type:\s*['"]badge-list['"]/]
]
for (const [label, pattern] of retiredGuidePatterns) {
  check(!pattern.test(ultrascriptsGuides), `Ultrascripts guides avoid ${label}`)
}

check(read('index.html').includes('BetterRepository V1.7'), 'document metadata names V1.7')
check(read('src/router/index.js').includes("title: 'BetterRepository V1.7 - AI Dungeon Resource Hub'"), 'runtime homepage title names V1.7')
check(read('netlify/edge-functions/inject-meta.js').includes("'/ultrascripts'"), 'edge metadata covers the Ultrascripts route')
check(read('src/pages/HomePage.vue').includes("What's New in <span class=\"text-gradient\">V1.7"), 'What’s New names V1.7')

if (verifyDist) {
  check(exists('dist/index.html'), 'production build emitted dist/index.html')
  check(exists('dist/server/index.js'), 'production build emitted the Sites worker entry')
  check(exists('dist/betterrepository_logo.png'), 'production build emitted the logo')
  check(exists('dist/og.png'), 'production build emitted the social preview')
  const distIndex = exists('dist/index.html') ? read('dist/index.html') : ''
  const distAssets = exists('dist/assets') ? walk(path.join(repoRoot, 'dist/assets')) : []
  const stateboyArtifacts = distAssets.filter(filePath => /stateboy/i.test(path.basename(filePath)))
  check(/\/assets\/index-[^"']+\.js/.test(distIndex), 'production build references a hashed JavaScript asset')
  check(/\/assets\/index-[^"']+\.css/.test(distIndex), 'production build references a hashed stylesheet')
  check(distIndex.includes('/og.png'), 'production build metadata references the V1.7 social preview')
  check(stateboyArtifacts.length === 0, 'production build does not publish Stateboy source artifacts')
}

if (failures.length) {
  console.error(`\nV1.7 release check failed (${failures.length}):`)
  for (const message of failures) console.error(`- ${message}`)
  process.exit(1)
}

console.log(`V1.7 release check passed (${passes.length} checks).`)
