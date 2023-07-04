const inquirer = require('inquirer')
const fs = require('fs')
const licenseArray = ["MIT License","Apache License","GPL v2 License","GPL v3 License","BSD 3 License","BSD 2 License",]
const licenseBdgArray = [
  "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
  "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
  "[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)",
  "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)",
  "[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)",
  "[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)",
]

inquirer
  .prompt([
    {
      type: 'input',
      message: 'What is the title of the project?',
      name: 'title',
    },
    {
      type: 'input',
      message: 'Give a paragraph describing the project.',
      name: 'descPara',
    },
    {
      type: 'input',
      message: 'Give instalation instructions in the form of bullet points. (use a single line and seperate bullets using the "*" key)',
      name: 'iBlt',
    },
    {
      type: 'input',
      message: 'Give programe execution instructions in the form of bullet points. (use a single line and seperate bullets using the "*" key)',
      name: 'exeBlt',
    },
    {
      type: 'input',
      message: 'Write a paragraph describing how the public can contribute to the project.',
      name: 'contribPara',
    },
    {
      type: 'input',
      message: 'Write a paragraph describing how to test the application.',
      name: 'testBlt',
    },
    {
      type: 'input',
      message: 'Enter your GitHub profile name.',
      name: 'github',
    },
    {
      type: 'input',
      message: 'Enter your email address.',
      name: 'email',
      validate: function(email)
      {
          // Regex mail check (return true if valid mail)
          return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
      }
    },
    {
      type: 'list',
      name: 'license',
      message: 'Which license badge should should appear?',
      choices: licenseArray
    },
  ])
  .then( function(response) {
    fs.readFile('template.md', 'utf8', function(error, data) {
      if (error) {
        console.error(error)
      } else {
        
      }
      String.prototype.interpolate = function(params) {
        const names = Object.keys(params);
        const vals = Object.values(params);
        return new Function(...names, `return \`${this}\`;`)(...vals);
      }
      
      const template = data;
      response.licenseBdg = licenseBdgArray[licenseArray.indexOf(response.license)]
      const result = template.interpolate({
        title: response.title,
        descPara: response.descPara,
        iBlt: "* " + response.iBlt.replace(/\*/g,"\n* "),
        exeBlt: "* " + response.exeBlt.replace(/\*/g,"\n* "),
        contribPara: response.contribPara,
        testBlt: "* " + response.testBlt.replace(/\*/g,"\n* "),
        license: response.license,
        licenseBdg: response.licenseBdg,
        github: response.github,
        email: response.email,
      });
      fs.writeFile('GeneratedREADME.md', result, (err) =>
        err ? console.error(err) : console.log('Success!')
      )
    })
  })

function generateMarkdown(data) {
  return `# ${data.title}
  ## license 
  ${renderLicenseBadge(license)}
  `
}


