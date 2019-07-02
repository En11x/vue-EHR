// helper.js

const fs = require('fs')

const path = require('path')

 

/**

 * 将文件名修正为前缀

 *

 * @param {String} filename

 * @returns {String}

 */

function transform (filename) {

  return filename.slice(0, filename.lastIndexOf('.'))

    // 分隔符转换

    .replace(/\\/g, '/')

    // index去除

    .replace('/index', '/')

    // 路径头部/修正

    .replace(/^[/]*/, '/')

    // 路径尾部/去除

    .replace(/[/]*$/, '')

}

 

/**

 * 文件路径转模块名（去.js后缀）

 *

 * @param {any} rootDir 模块入口

 * @param {any} excludeFile 要排除的入口文件

 * @returns

 */

function scanDirModules (rootDir, excludeFile) {

  if (!excludeFile) {

    // 默认入口文件为目录下的 index.js

    excludeFile = path.join(rootDir, 'index.js')

  }

  // 模块集合

  const modules = {}

  // 获取目录下的第一级子文件为路由文件队列

  let filenames = fs.readdirSync(rootDir)

  while (filenames.length) {

    // 路由文件相对路径

    const relativeFilePath = filenames.shift()

    // 路由文件绝对路径

    const absFilePath = path.join(rootDir, relativeFilePath)

    // 排除入口文件

    if (absFilePath === excludeFile) {

      continue

    }

    if (fs.statSync(absFilePath).isDirectory()) {

      // 是文件夹的情况下，读取子目录文件，添加到路由文件队列中

      const subFiles = fs.readdirSync(absFilePath).map(v => path.join(absFilePath.replace(rootDir, ''), v))

      filenames = filenames.concat(subFiles)

    } else {

      // 是文件的情况下，将文件路径转化为路由前缀，添加路由前缀和路由模块到模块集合中

      const prefix = transform(relativeFilePath)

      modules[prefix] = require(absFilePath)

    }

  }

  return modules

}

module.exports = scanDirModules;