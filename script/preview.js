const server = require('pushstate-server');
const paths = require('../config/defaultPaths')
const colors = require('colors')
module.exports = () => {
    let port = 1234,
        host = '127.0.0.1';
        server.start({
            port,
            host,
            directory: paths.appDist
        });
        console.log(
            [
                `    - Local:   ${colors.yellow("http://"+host+":"+port)}`
            ].join('\n')
        );
}