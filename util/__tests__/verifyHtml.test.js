const { appPublic } = require('../../config/defaultPaths');
const verifyHtml = require('../verifyHtml');
const path = require('path');
const fs = require('fs');

const txt = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>page</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <%= htmlWebpackPlugin.options.assets.config %>
</head>
<body>
<div id='root'></div><div class="dll">
<%= htmlWebpackPlugin.options.assets.scripts %>
  </div>
</body>
</html>
`;

const workspace = process.cwd();
const filename = 'index.html';
const completePath = path.resolve(appPublic, filename);
const errorTestingFileNotPrepared = new Error('testing file is not prepared...');
const regConfig = /<%= htmlWebpackPlugin.options.assets.config %>/g;
const regScripts = /<%= htmlWebpackPlugin.options.assets.scripts %>/g;

describe('verify html:', () => {
  it('whithout directory:', () => {
    expect(appPublic).toBe(path.resolve(workspace, 'public'));
    verifyHtml(completePath);
    expect(fs.existsSync(appPublic)).toBe(true);
    expect(fs.existsSync(completePath)).toBe(true);
    const content = fs.readFileSync(completePath).toString();
    expect(
      content.replace(/\s/g, '')
    ).toBe(
      txt.replace(/\s/g, '')
    );
  });

  it('with directory:', () => {
    expect(appPublic).toBe(path.resolve(workspace, 'public'));
    fs.mkdirSync(
      path.resolve(workspace, 'public')
    );
    if(!fs.existsSync(appPublic))
      throw errorTestingFileNotPrepared;
    verifyHtml(completePath);
    expect(fs.existsSync(appPublic)).toBe(true);
    expect(fs.existsSync(completePath)).toBe(true);
    const content = fs.readFileSync(completePath).toString();
    expect(
      content.replace(/\s/g, '')
    ).toBe(
      txt.replace(/\s/g, '')
    );
  });

  it('without scripts:', () => {
    const filterText = txt
      .replace(regScripts, '');
    expect(filterText).not.toMatch(regScripts);
    fs.mkdirSync(appPublic);
    fs.writeFileSync(completePath, filterText);
    if(!fs.existsSync(completePath))
      throw errorTestingFileNotPrepared;
    verifyHtml(completePath);
    const content = fs.readFileSync(completePath).toString();
    expect(content).toMatch(regConfig);
  });

  it('without config:', () => {
    const filterText = txt
      .replace(regConfig, '');
    expect(filterText).not.toMatch(regConfig);
    fs.mkdirSync(appPublic);
    fs.writeFileSync(completePath, filterText);
    if(!fs.existsSync(completePath))
      throw errorTestingFileNotPrepared;
    verifyHtml(completePath);
    const content = fs.readFileSync(completePath).toString();
    expect(content).toMatch(regScripts);
  });

  afterEach(() => {
    if(fs.existsSync(completePath))
      fs.rmdirSync(appPublic, {
        recursive: true
      });
  });
})
