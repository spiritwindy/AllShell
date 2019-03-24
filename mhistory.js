var os=require("os");
var fs=require("fs");
var logPath="C:/Users/hwx/AppData/Roaming/Microsoft/Windows/PowerShell/PSReadline/ConsoleHost_history.txt";
var commons= fs.readFileSync(logPath).toString().split("\n");
commons=Array.from(new Set(commons));
var live=new Array(commons.length).fill(1);//1
console.log(commons.length);
for (let index = 0; index < commons.length; index++) {
 for (let to = 0; to < commons.length; to++) {
  if(live[to]&&index!=to&& commons[index].includes(commons[to])){
    live[to]=0;
  }
 }
}
commons=commons.filter(function (v,index) {
  return live[index];
}).sort();

console.log("剩余"+commons.length);
// console
fs.writeFileSync(logPath,commons.join("\n"));
// console.log(process.argv);
// if(commons)

process.argv[2]&& commons.forEach(v =>{
  if(v.includes(process.argv[2]))
  process.stdout.write(v+"\n");
});
process.exit(0);
