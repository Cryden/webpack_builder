const path = require('path')
let taskpath = path.resolve('webpack/tasks/')
const tasks = require('require-all')(taskpath)

console.log(tasks)
