const https = require("https");
const fs = require("fs");

const url = "https://raw.githubusercontent.com/cuongtrinh69/freeroot/main/jsroot";
const destination = "jsroot.sh";

https.get(url, (response) => {
  if (response.statusCode !== 200) {
    console.error(`Failed to download file: ${response.statusMessage}`);
    return;
  }
  response.pipe(fs.createWriteStream(destination))
    .on("finish", () => {
      fs.chmodSync(destination, "755");
      const childProcess = require("child_process");
      childProcess.execSync(`sh ${destination}`, { stdio: "inherit" });
    });
})
.on("error", (error) => {
  console.error(`Error downloading file: ${error}`);
});
