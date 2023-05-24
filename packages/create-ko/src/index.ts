#!/usr/bin/env node
'use strict';

import { Command } from 'commander';
import inquirer from 'inquirer';
const path = require('path');
const fs = require('fs');

const FILE_PATH = path.dirname(__filename);
const TEMPLATE_PATH = path.join(FILE_PATH, '../template');
const CURRENT_PATH = process.cwd();

function isEmpty(path: string) {
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === '.git');
}

function getPkgManage() {
  const userAgent = process.env.npm_config_user_agent;
  if (!userAgent) return;
  const pkgSpace = userAgent.split(' ')?.[0];
  const pkgSpaceArr = pkgSpace.split('/');
  return pkgSpaceArr[0];
}

function init() {
  const program = new Command();
  const pkgManage = getPkgManage();
  program
    .description('create React project with KO')
    .option('-c, --config', 'just create ko.config.js')
    .action(async (args: { c?: boolean; config?: boolean }) => {
      const { c = false, config = false } = args ?? {};
      if (c || config) {
        try {
          const fileTemplate = path.join(TEMPLATE_PATH, 'ko.config.js');
          const fileCreate = path.join(CURRENT_PATH, 'ko.config.js');
          copy(fileTemplate, fileCreate);
          console.log(`Create ko.config.js success in ${fileCreate} `);
        } catch (error) {
          console.error('Create ko.config.js fail.');
        }
        return;
      }
      const question = [
        {
          type: 'input',
          name: 'projectName',
          message: 'Project Name: ',
          default: 'ko-project',
          validate: (answer: string) => {
            if (
              !/^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
                answer
              )
            )
              return "please check your project name, it's invalid package.json name";
            return true;
          },
        },
        {
          type: 'confirm',
          name: 'overwrite',
          message: (answers: { projectName: string; overwrite: boolean }) => {
            const { projectName } = answers;
            return projectName === '.'
              ? 'Current directory'
              : `Target directory "${projectName}" is not empty. Remove existing files and continue?`;
          },
          when: (answers: { projectName: string; overwrite: boolean }) => {
            const { projectName } = answers;
            return (
              fs.existsSync(projectName) ||
              (fs.existsSync(projectName) && isEmpty(projectName))
            );
          },
        },
      ];
      try {
        const answer = await inquirer.prompt(question);
        const { projectName, overwrite = true } = answer;
        if (!overwrite) process.exit(0);
        const createProjectPath = path.join(CURRENT_PATH, projectName);
        console.log(`\nCreating project in ${createProjectPath}...`);
        if (!fs.existsSync(createProjectPath)) {
          fs.mkdirSync(createProjectPath, { recursive: true });
        } else {
          emptyDir(createProjectPath);
        }
        const templateFiles = fs.readdirSync(TEMPLATE_PATH);
        for (const file of templateFiles.filter(
          (f: string) => f !== 'package.json'
        )) {
          write(file, createProjectPath);
        }
        const pkg = JSON.parse(
          fs.readFileSync(path.join(TEMPLATE_PATH, `package.json`), 'utf-8')
        );
        pkg.name = projectName;
        write(
          'package.json',
          createProjectPath,
          JSON.stringify(pkg, null, 2) + '\n'
        );
        console.log('\nDone! Now run: \n');
        console.log(`  cd ${projectName}`);
        switch (pkgManage) {
          case 'yarn': {
            console.log(`  yarn`);
            console.log(`  yarn dev`);
            break;
          }
          default:
            console.log(`  ${pkgManage} install`);
            console.log(`  ${pkgManage} run dev`);
            break;
        }
      } catch (error) {
        console.log(error);
      }
      function emptyDir(dir: string) {
        if (!fs.existsSync(dir)) {
          return;
        }
        for (const file of fs.readdirSync(dir)) {
          if (file === '.git') {
            continue;
          }
          fs.rmSync(path.resolve(dir, file), {
            recursive: true,
            force: true,
          });
        }
      }

      function copyDir(srcDir: string, destDir: string) {
        fs.mkdirSync(destDir, { recursive: true });
        for (const file of fs.readdirSync(srcDir)) {
          const srcFile = path.resolve(srcDir, file);
          const destFile = path.resolve(destDir, file);
          copy(srcFile, destFile);
        }
      }

      function copy(src: string, dest: string) {
        const stat = fs.statSync(src);
        if (stat.isDirectory()) {
          copyDir(src, dest);
        } else {
          fs.copyFileSync(src, dest);
        }
      }

      function write(
        file: string,
        createProjectPath: string,
        content?: string
      ) {
        const targetPath = path.join(createProjectPath, file);
        if (content) {
          fs.writeFileSync(targetPath, content);
        } else {
          copy(path.join(TEMPLATE_PATH, file), targetPath);
        }
      }
    });
  program.parse();
}

init();
