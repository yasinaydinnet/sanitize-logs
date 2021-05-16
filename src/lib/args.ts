import { Command } from 'commander'

const program = new Command()

if (process.env.NODE_ENV != "test") {
  program
    .option('--testrun', 'test run for an nginx logfile')
    .option('-d, --debug', 'output extra debugging')
    .option('-f, --file <logfile>', 'log file path')
    .option('-t, --type <logtypetype>', 'log type (-T to list all types)')
    // Not implemented
    // .option('-r, --read_only', 'read only mode (does not modify logs)')
    // .option('-T, --list_types', 'list log types')

  program.parse(process.argv)
}

export const appArguments = program.opts()

export const hasAppArguments = Object.keys(appArguments).length
