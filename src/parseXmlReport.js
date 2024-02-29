const { parseString } = require("xml2js");
const fs = require("fs");

function parseXmlReport(xmlFilePath) {
  return new Promise((resolve, reject) => {
    try {
      fs.accessSync(xmlFilePath, fs.constants.R_OK);
      const xmlData = fs.readFileSync(xmlFilePath, "utf-8");

      parseString(
        xmlData,
        { explicitArray: false, mergeAttrs: true },
        (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        }
      );
    } catch (err) {
      reject(`The file ${xmlFilePath} does not exist or is not readable`);
      return;
    }
  });
}

module.exports = { parseXmlReport };
