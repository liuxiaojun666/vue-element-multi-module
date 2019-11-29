const path = require('path')
const pack = require('../package.json')
const moduleNames = require('./moduleConfig.json')

const argvs = process.argv.slice(2)

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

function getParams(key) {
    let item = argvs.find(item => item.split('=')[0] === key)
    return item ? item.split('=') : []
}

function getModuleAlias() {
    let alias = {}
    importModules.forEach(({ name }) => {
        alias[`@${name}`] = resolve(`src/${name}`)
    })
    return alias
}

class MultiModule {
    constructor(name, opts) {
        let datetime = Date.now()
        Object.assign(this, {
            name,
            assetsSubDirectory: 'static',
            assetsPublicPath: process.env.NODE_ENV === 'production' ? './' : '/',
            port: 8080,
            // host: 'local.solway.cn',
            host: '0.0.0.0',
            proxyTable: null,
            entry: {
                app: ['babel-polyfill', `./src/${name}/main.js`]
            },
            alias: resolve(`src/${name}`),
            index: path.resolve(__dirname, `../dist/${name}/index.html`),
            favicon: path.resolve(__dirname, `../src/${name}/assets/favicon.ico`),
            assetsRoot: path.resolve(__dirname, `../dist/${name}/`),
            pubdate: `${name}_v${pack.version}_${datetime}`,
            publics: [name].concat(opts.statics || []),
            deployConfig: null
        }, opts)
    }
}

function getModuleProcess(name) {
    let mItem = importModules.find(item => item.name === name)
    return mItem || importModules[0]
}

const getProxyTable = (target, options) => {
    const proxyTarget = getParams('--env.proxyTarget')[1]
    return {
        '/api': {
            target: proxyTarget || target,
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        },
        ...options
    }
}
const importModules = moduleNames.map((module, index) => (new MultiModule(module.name, {
    port: module.port ? +module.port : (8080 + index),
    statics: ['static-' + module.name],
    proxyTable: getProxyTable(module.proxyTarget, module.proxyTable)
})))
var lifecycleEvents = String(process.env.npm_lifecycle_event).split(':')
var moduleName = getParams('name')[1] || lifecycleEvents[1]

const multiConfig = {
    modules: importModules,
    moduleAlias: getModuleAlias(),
    process: getModuleProcess(moduleName)
}

module.exports = multiConfig
