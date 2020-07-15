#!/usr/bin/env node
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Project name?'
    }
])
.then(answers => {
    console.log(answers)

    //模板目录
    const tempPath = path.join(__dirname, 'templates')
    //目标目录
    const targetPath = process.cwd()

    //读取文件
    fs.readdir(tempPath, (err, files) => {
        if(err) throw err
        files.forEach(file => {
            console.log(file)
            ejs.renderFile(path.join(tempPath, file), answers, (err, res) => {
                if(err) throw err
                console.log(res);
                fs.writeFileSync(path.join(targetPath, file), res)
            })
        })
    })
})


