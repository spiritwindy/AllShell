var readline = require("readline")
var util = require("util")
var path = require("path")
const { existsSync, symlinkSync, lstatSync } = require("fs")
var baseDir = process.cwd()

async function run() {
    console.log("baseDir:" + baseDir)
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })
    const question = promisfy(rl.question).bind(rl)
    try {
        while (true) {
            var sourcePath
            var linkPath
            while (true) {
                sourcePath = await question("source File:")
                if (!path.isAbsolute(sourcePath)) {
                    sourcePath = path.join(baseDir, sourcePath)
                }
                if (!existsSync(sourcePath)) {
                    console.log(`file NOT Exist ${sourcePath}`)
                    continue
                } else {
                    break
                }
            }
            while (true) {
                linkPath = await question("link File Path|Dir:")
                if (!path.isAbsolute(linkPath)) {
                    linkPath = path.join(baseDir, linkPath)
                }

                var dir = path.dirname(linkPath)
                if (!existsSync(dir)) {
                    console.log("目标文件夹不存在")
                    continue
                }
                // var stat = lstatSync(linkPath)
                if (dir == linkPath) {
                    console.log("目标是文件自动夹")
                    linkPath = path.join(linkPath, path.basename(sourcePath))
                    console.log("目标是文件自动夹," + linkPath)
                }

                if (existsSync(linkPath)) {
                    console.log("目标文件已存在")
                    continue
                }
                break
            }
            console.log(`syms ${sourcePath} ==> ${linkPath}`)
            symlinkSync(sourcePath, linkPath)
        }
    } catch (err) {
        console.error(err)
    }
}

/**
 * @template T,Arg
 * @param {function(...args:Arg[],function(T):void)} func
 * @returns {function(...args:Arg[]):Promise<T>}
 */
function promisfy(func) {
    return function (...args) {
        return new Promise((resolve, rej) => {
            func.call(this, ...args, resolve)
        })
    }
}
run()
