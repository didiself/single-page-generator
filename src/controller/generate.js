import { join } from 'path';
import { writeFile, access, constants } from 'fs';
import { minify } from 'html-minifier';
import phantom from 'phantom';
import mkdirp from 'mkdirp';
import { dev as devConfig } from '../../config';

const minifyOption = {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  decodeEntities: true,
  minifyCSS: true,
  minifyJS: true,
  processConditionalComments: true,
  removeAttributeQuotes: false,
  removeComments: false,
  removeEmptyAttributes: true,
  removeOptionalTags: false, // 这个属性有误杀
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: false,
  removeStyleLinkTypeAttributes: false,
  removeTagWhitespace: false,
  sortAttributes: true,
  sortClassName: true,
  trimCustomFragments: true,
  useShortDoctype: true
};

const pageDirPath = join(devConfig.assetsRoot, devConfig.assetsSubDirectory);
access(pageDirPath, constants.W_OK, (err) => err && mkdirp.sync(pageDirPath));

export async function createPage(cb) {
  try {
    const instance = await phantom.create();
    const page = await instance.createPage();

    const status = await page.open(`http://localhost:${devConfig.port}/${devConfig.outputName}`)
    console.log('generate page status: ',status)

    const evalHtml = await page.evaluate(function () {
      const storeData = JSON.parse(document.querySelector('#storeData').innerHTML);
      document.title = storeData.info_title;
      document.head.removeChild(document.head.querySelector('meta[name="viewport"]'));
      document.head.innerHTML += `
          <meta name="description" content="${storeData.tdk_d}" />
          <meta name="keywords" content="${storeData.tdk_k}" />`;

      document.body.removeChild(document.body.querySelectorAll('script')[document.body.querySelectorAll('script').length - 1]);
      // document.body.removeChild(document.querySelector('#storeData'))
      return {
        fileName: storeData.info_name,
        html: `
          <!DOCTYPE html>
          <html>
            <head>${document.head.innerHTML}</head>
            <body>
            ${document.body.innerHTML}
            <script>
                var shareData = {
                    title:'${storeData.wechat_shareAppMessageTit}',
                    desc: '${storeData.wechat_shareAppMessageDesc}',
                    link: 'http://domain/${storeData.info_name}',
                    imgUrl:'${storeData.wechat_shareImg}'
                };
                var timelineShareData = {
                    title:'${storeData.wechat_shareTimeLineTit}',
                    link: 'http://domain/${storeData.info_name}',
                    imgUrl:'${storeData.wechat_shareImg}'
                };
            </script>
            </body>
          </html>
          `
      };
    });

    await writeFile(join(pageDirPath, `./${evalHtml.fileName}.html`), minify(evalHtml.html, minifyOption), 'utf8', (err) => cb(err));

    await instance.exit();
  } catch (e) { throw e; }
}
