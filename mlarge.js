#!/usr/bin/env node
const fg = require('fast-glob');
const fs = require('fs').promises;
const path = require('path');

console.log(process.argv[2]);
// 设置文件大小阈值（以字节为单位，这里是10MB）
const maxSize = Number(process.argv[2]) || 10 * 1024 * 1024;



async function findLargeFiles(directory) {
    if(typeof directory!=='string'){
        console.log("请输入文件夹路径")
        return
    }
    directory = directory.replace(/\\/g, '/');
    // 查找所有文件
    const entries = await fg([`${directory}/**/*`,`!${directory}/.git/**`], { onlyFiles: true,deep:Infinity });
    
    for (const file of entries) {
        try {
            const stats = await fs.stat(file);
            if (stats.size > maxSize) {
                // console.log(file)
                const relativePath = path.relative(directory, file).replace(/\\/g, '/');
                console.log(relativePath)
                // console.log(`File: ${file}, Size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);
            }
        } catch (error) {
            console.error(`Error processing file: ${file}`, error);
        }
    }
}

// 传入要遍历的文件夹路径
findLargeFiles(path.resolve(process.cwd()));