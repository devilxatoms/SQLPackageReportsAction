// index.js

const fs = require("fs");
const core = require("@actions/core");
const { parseXmlReport } = require("./src/parseXmlReport");
const { processReport } = require("./src/processReport");

const xmlFilePath = core.getInput("xmlFilePath");
// const xmlFilePath = "./dummyData/dummy3.xml";

async function run(report) {
  await core.summary
    .addHeading("SQL Changes Applied")
    .addTable([
      [
        { data: "Operation Name", header: true },
        { data: "Item Value", header: true },
        { data: "Type", header: true },
      ],
      ...report,
    ])
    .write();
}

parseXmlReport(xmlFilePath)
  .then((result) => {
    let report = processReport(result);
    console.log("Report: ");
    console.log(report);
    run(report);
  })
  .catch((err) => {
    console.error(err);
    core.setFailed(err.message);
  });
