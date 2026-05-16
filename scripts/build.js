const { execSync } = require('child_process')

if (process.env.CF_PAGES) {
  console.log('Detected Cloudflare Pages, running @cloudflare/next-on-pages...')
  execSync('npx @cloudflare/next-on-pages@1', { stdio: 'inherit' })
} else {
  console.log('Running standard Next.js build...')
  execSync('next build', { stdio: 'inherit' })
}
