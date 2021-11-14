var readline = require("readline")
var path = require("path")
const { existsSync, symlinkSync, lstatSync, fstatSync } = require("fs")
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
                sourcePath = await question("源 文件:")
                if (sourcePath === "") {
                    console.log("输入:. 表示当前目录")
                    continue
                }
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
                linkPath = await question("链接地址 Path|Dir:")
                if (linkPath === "") {
                    continue
                }
                if (!path.isAbsolute(linkPath)) {
                    linkPath = path.join(baseDir, linkPath)
                }

                var dir = path.dirname(linkPath)
                if (!existsSync(dir)) {
                    console.log("目标文件夹不存在")
                    continue
                }
                // var stat = lstatSync(linkPath)
                // console.log([dir, linkPath])
                if (existsSync(linkPath) && lstatSync(linkPath).isDirectory()) {
                    linkPath = path.join(linkPath, path.basename(sourcePath))
                    console.log("目标是:" + linkPath)
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
        process.exit(1)
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
