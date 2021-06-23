const prepareUrls = require('../prepareUrl');
const address = require('address');

describe('prepare urls:', () => {
  it('localhost test:', () => {
    const protocol = 'http';
    const host = '127.0.0.1';
    const port = 8080;
    const path = '/';
    const urls = prepareUrls(protocol, host, port, path);
    const hostIp = address.ip();
    expect(urls.lanUrlForConfig).toBe(hostIp);
    expect(urls.lanUrlForTerminal).toBe(
      `http://${hostIp}:\u001b[1m8080\u001b[22m/`
    );
    expect(urls.lanUrlForBrowser).toBe(`http://${hostIp}:8080/`);
    expect(urls.localUrlForTerminal).toBe(
      `http://localhost:\u001b[1m8080\u001b[22m/`
    );
    expect(urls.localUrlForBrowser).toBe(`http://localhost:8080/`);
  });

  it('remote host test:', () => {
    const protocol = 'http';
    const host = '172.16.10.91';
    const port = 8080;
    const path = '/';
    const urls = prepareUrls(protocol, host, port, path);
    expect(urls.lanUrlForConfig).toBe(undefined);
    expect(urls.lanUrlForTerminal).toBe(undefined);
    expect(urls.lanUrlForBrowser).toBe(undefined);
    expect(urls.localUrlForTerminal).toBe(
      `http://${host}:\u001b[1m8080\u001b[22m/`
    );
    expect(urls.localUrlForBrowser).toBe(`http://${host}:8080/`);
  });
});
