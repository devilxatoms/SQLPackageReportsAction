const { release } = require("os");

function readReport(report) {
  report = report.DeploymentReport.Operations;
  const releaseReort = [];

  if (Array.isArray(report.Operation)) {
    report.Operation.forEach((operation) => {
      if (Array.isArray(operation.Item)) {
        const value = operation.Item.map((item) => [
          operation.Name,
          item.Type,
          item.Value,
        ]);
        releaseReort.push(...value);
      } else if (
        typeof operation.Item === "object" &&
        operation.Item !== null
      ) {
        releaseReort.push([
          operation.Name,
          operation.Item.Type,
          operation.Item.Value,
        ]);
      }
    });
  } else if (
    typeof report.Operation === "object" &&
    report.Operation !== null
  ) {
    releaseReort.push([
      report.Operation.Name,
      report.Operation.Item.Type,
      report.Operation.Item.Value,
    ]);
  }

  return releaseReort;
}

function processReport(report) {
  return readReport(report);
}

module.exports = { processReport };
