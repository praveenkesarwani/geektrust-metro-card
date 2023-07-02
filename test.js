const { expect } = require("chai");
const { processMetroCardTravel } = require("./metroCardTravel");

describe("processMetroCardTravel", () => {
  it("should calculate travel charges correctly for input data", () => {
    const data = `
    BALANCE MC1 600
    BALANCE MC2 500
    BALANCE MC3 50
    BALANCE MC4 50
    BALANCE MC5 200
    CHECK_IN MC1 ADULT CENTRAL
    CHECK_IN MC2 SENIOR_CITIZEN CENTRAL
    CHECK_IN MC1 ADULT AIRPORT
    CHECK_IN MC3 KID AIRPORT
    CHECK_IN MC4 ADULT AIRPORT
    CHECK_IN MC5 KID AIRPORT
    PRINT_SUMMARY
    `;

    const expectedOutput = ["TOTAL_COLLECTION CENTRAL 300 0", "PASSENGER_TYPE_SUMMARY", "ADULT 1", "SENIOR_CITIZEN 1", "TOTAL_COLLECTION AIRPORT 403 100", "PASSENGER_TYPE_SUMMARY", "ADULT 2", "KID 2"].join("\n");

    let output = "";
    const originalLog = console.log;

    // Capture console.log output
    console.log = (message) => {
      output += message + "\n";
    };

    processMetroCardTravel(data);

    // Restore console.log
    console.log = originalLog;

    expect(output.trim()).to.equal(expectedOutput.trim());
  });
});
