const Logagent = require('@sematext/logagent');

const logAgent = new Logagent();

const driver: Driver = {
  name: "logAgent",

  parseLine(line: string, source: string) {
    return new Promise((resolve, reject) => {
      logAgent.parseLine(line, source, (error: Error, response: any) => {
        if (error) return reject(error);
  
        return resolve(response);
      })
    })
  }
}

export default driver;

// type > _type (nginx)
// client_ip > client_ip
// user > user ("-")
// path > path

// response: {
//   logSource: 'nginx',
//   _type: 'access_common',
//   client_ip: '1.1.1.13',
//   remote_id: '-',
//   user: '-',
//   method: 'GET',
//   path: '/login',
//   http_version: 'HTTP/1.1',
//   status_code: 200,
//   size: 8851,
//   '@timestamp': 2021-05-04T06:15:28.000Z
// }
