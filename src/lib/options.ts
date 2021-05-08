import { Command } from 'commander';

export default () => {
  const program = new Command();

  program
    .option('-d, --debug', 'output extra debugging')
    .option('-f, --file <logfile>', 'log file path')
    .option('-t, --type <logtypetype>', 'log type (-T to list all types)')
    .option('-T, --list-types', 'list log types')

    program.parse(process.argv);

  return program.opts();
}
