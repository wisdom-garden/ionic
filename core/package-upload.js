#!/usr/bin/env node

const fs = require("fs");
const { execSync } = require("child_process");

const {version } = require("./package.json");

const name = "ionic-core"
const packFileName = `${name}-${version}.tgz`;
const bucketFilePath = `frameworks/${packFileName}`;

if (fs.existsSync(packFileName)) {
  fs.unlinkSync(packFileName);
}

execSync("npm pack");

let uploadSuccess = false;
try {
  const result = execSync(
    `qshell fput --overwrite lms-mobile ${bucketFilePath} ${packFileName}`
  ).toString();

  console.log("🤞")
  console.info(result);
  uploadSuccess = result.toString().match(/Put file .* success!/gi);
} catch (err) {
  console.error(err)
}

if (uploadSuccess) {
  console.log("✌️")
  console.log(`https://mobile-download.tronclass.com.cn/${bucketFilePath}`)
}
