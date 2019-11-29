'use strict'
const modules = require('./moduleConfig.json')

const moduleName = String(process.env.npm_lifecycle_event).split(':')[1]

const moduleArg = modules.find(function (v) {
    return v.name === moduleName
})

const exportsObj = {}
for (const key in moduleArg) {
    if (moduleArg.hasOwnProperty(key)) {
        const element = moduleArg[key]
        exportsObj[key] = `'${element}'`
    }
}

module.exports = {
  NODE_ENV: '"production"',
    ...exportsObj
}

