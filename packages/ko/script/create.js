const inquirer = require('inquirer');
const defaultData = require('../util/defaultData');
const initComp = require('../util/createComp');
const initPage = require('../util/createPage');
async function inquirerAnswer(inquireType) {
  const ret = inquirer.prompt([inquireType]);
  return ret;
}

module.exports = async (program) => {
  const choices = defaultData.createChoiceData;
  const inquireType = {
    type: 'list',
    name: 'web',
    choices,
    message: 'choose you want to create',
  };

  const inquireRet = await inquirerAnswer(inquireType);
  const questions =
    inquireRet.web == 'page'
      ? defaultData.createPageData
      : defaultData.createComData;
  inquirer.prompt(questions).then((answers) => {
    const reg = /^\/.*/;
    const path = reg.test(answers.path) ? '.' + answers.path : answers.path;
    inquireRet.web == 'page'
      ? initPage(answers.name, answers.path, answers.route, null, answers.ts)
      : initComp(answers.name, path, answers.ts);
  });
};
