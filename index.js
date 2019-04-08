#!/usr/bin/env node
"use strict";

const inquirer = require("inquirer");
const chalk = require("chalk");
const lodash = require("lodash");
const commander = require("commander");
const time = require("moment");

const cv = require("./info.json");

commander
  .version('1.1.0')
  .option('-g, --greentext', 'make text green')
  .parse (process.argv);

if(commander.greentext) {
  var response = chalk.bold.green;
} else {
  var response = chalk.bold.red;
}

const cvPrompts = {
  type: "list",
  name: "cvOptions",
  message: "See list of options below",
  choices: [...Object.keys(cv), "Exit"]
};

function main() {
  console.log("                                     ");
  console.log("||-- Brandon Yagihashi CV/Resume --||");
  console.log("                                     ");
  cvHandler();
}

function cvHandler() {
  inquirer.prompt(cvPrompts).then(answer => {
    if (answer.cvOptions == "Exit") {
      return;
    }
    var option = answer.cvOptions;
    console.log(response("--------------------------------------"));
    cv[`${option}`].forEach(info => {
      console.log(response("|   => " + info));
    });
    console.log(response("--------------------------------------"));
    // console.log(resume[`${option}`]);
    inquirer
      .prompt({
        type: "list",
        name: "exitBack",
        message: "Go back or Exit?",
        choices: ["Back", "Exit"]
      })
      .then(choice => {
        if (choice.exitBack == "Back") {
          cvHandler();
        } else {
          return;
        }
      });
  });
}

main();