# MTK  Pure Web Project Sample 

此專案為純網頁開（無框架）發用的範本

## npm 版本
```bash
# node -v
v10.24.1

# npm version
{ 'mtk-pure-web-project-sample': '1.0.0',
  npm: '6.14.12',
  ares: '1.15.0',
  brotli: '1.0.7',
  cldr: '35.1',
  http_parser: '2.9.4',
  icu: '64.2',
  modules: '64',
  napi: '7',
  nghttp2: '1.41.0',
  node: '10.24.1',
  openssl: '1.1.1k',
  tz: '2019c',
  unicode: '12.1',
  uv: '1.34.2',
  v8: '6.8.275.32-node.59',
  zlib: '1.2.11' }
```

## 開發指令

```bash
# dev 即時監控、編譯
npm run dev

# prod 編譯、minify
npm run prod
```

webpack 包含
+ 打包輸出目錄: `./dist`
+ `style-loader`：提供壓縮 CSS 檔案
+ `postCSS-loader`: 編譯相容新舊瀏覽器的 CSS
+ `babel`: 編譯相容新舊瀏覽器的 JS
+ `file-loader`: 打包時複製相關字形檔至 dist 目錄
+ `url-loader`：打包時複製 assets 相關檔案至 dist 目錄下的 assets 目錄
+ `minimizer`：提供壓縮JS 檔案

## 開發須知

1. css 請遵守撰寫在 index.css，預設已引入 index.dev 及 index.prod.js，