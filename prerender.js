// Pre-render the app into static HTML.
// run `npm run generate` and then `dist/static` can be served as a static site.

const fs = require('fs')
const path = require('path')

const toAbsolute = (p) => path.resolve(__dirname, p)

const manifest = require('./dist/static/ssr-manifest.json')
const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8')
const { render } = require('./dist/server/entry-server.js')

// determine routes to pre-render from src/pages
const routesToPrerender = fs
  .readdirSync(toAbsolute('src/views/ssd'))//配置需要做预渲染的路径
  .map((file) => {
    const name = file.replace(/\.vue$/, '').toLowerCase()
    return name === 'home' ? `/` : `/${name}`
  })
  console.log('routesToPrerender',routesToPrerender);
;(async () => {
  // pre-render each route...
  for (const url of routesToPrerender) {
    const [appHtml, preloadLinks] = await render(url, manifest)
    const metaHtml = fs.readFileSync(toAbsolute(`src/views/ssd${url==='/'?'/home':url}.vue`), 'utf-8');
    let metaInfo = {}
    const reg = /<!--metaInfo([^]*)end-->/
    const regTest = reg.exec(metaHtml)//匹配metaInfo信息
    let metaInfoHtml = '',metaInfoTitle='title'
    if(regTest){
      metaInfo = eval('('+reg.exec(regTest)[1]+')')
      console.log(metaInfo);
      metaInfoHtml = `<meta name="keyWords" content="${metaInfo.keyWords}">
    <meta name="description" content="${metaInfo.description}">`
      metaInfoTitle = metaInfo.title || metaInfoTitle
    }
    const html = template
      .replace(`<!--preload-meta-->`, metaInfoHtml)
      .replace(`<!--preload-title-->`, metaInfoTitle)
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--app-html-->`, appHtml)

    const filePath = `dist/static${url === '/' ? '/index' : url}.html`
    fs.writeFileSync(toAbsolute(filePath), html)
    // console.log('pre-rendered:', filePath)
  }

  // done, delete ssr manifest
  // fs.unlinkSync(toAbsolute('dist/static/ssr-manifest.json'))
})()
