#!/usr/bin/env node

let program = require('commander')

program
  .version(require('./../package.json').version, '-v, --version')

program
  .command('setup')
  .description('setup FROND')
  .action(function () {
    require('./commands/setup')
  })

program
  .command('development')
  .alias('dev')
  .description('run FROND in development mode')
  .action(function () {
    require('./commands/development')
  })

program
  .command('production')
  .alias('prod')
  .description('run FROND in production mode')
  .action(function () {
    console.log('PROD!!!...')
  })

program
  .command('update')
  .alias('up')
  .description('update FROND')
  .action(function () {
    console.log('UPDATE...')
  })

// program.help()

program.parse(process.argv)

console.log('FROND by CRYDEsigN. 2018')
