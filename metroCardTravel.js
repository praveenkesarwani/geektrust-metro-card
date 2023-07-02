function processMetroCardTravel(data) {
  const { metroCardBalances, returnJourneyCardNumbers, TRAVEL_CHARGES, RETURN_JOURNEY_DISCOUNT, SERVICE_FEE_PERCENTAGE, rechargeMetroCard } = require("./cardUtils");
  const { centralStatiion, airportStatiion } = require("./stationUtils");
  const { printSummary } = require("./printSummary");
  const BALANCE_COMMAND = "BALANCE";
  const CHECKIN_COMMAND = "CHECK_IN";
  const PRINT_SUMMARY_COMMAND = "PRINT_SUMMARY";

  function processCheckIn(cardNumber, passengerType, station) {
    const balance = getMetroCardBalance(cardNumber);
    const travelCharge = calculateTravelCharge(cardNumber, passengerType);
    let totalAmountCollected = calculateTotalAmountCollected(balance, travelCharge, cardNumber);
    let totalDiscountGiven = calculateTotalDiscountGiven(travelCharge, passengerType);

    const newBalance = metroCardBalances.get(cardNumber);
    metroCardBalances.set(cardNumber, newBalance - travelCharge);
    totalAmountCollected += travelCharge;

    updateStationDetails(station, passengerType, totalAmountCollected, totalDiscountGiven);
  }

  function getMetroCardBalance(cardNumber) {
    return metroCardBalances.get(cardNumber) || 0;
  }

  function calculateTravelCharge(cardNumber, passengerType) {
    const isReturnJourney = returnJourneyCardNumbers.has(cardNumber);
    const travelCharge = TRAVEL_CHARGES[passengerType];

    if (isReturnJourney) {
      returnJourneyCardNumbers.delete(cardNumber);
      return travelCharge * RETURN_JOURNEY_DISCOUNT;
    } else {
      returnJourneyCardNumbers.add(cardNumber);
      return travelCharge;
    }
  }

  function calculateTotalDiscountGiven(travelCharge, passengerType) {
    if (travelCharge < TRAVEL_CHARGES[passengerType]) {
      return TRAVEL_CHARGES[passengerType] * RETURN_JOURNEY_DISCOUNT;
    } else {
      return 0;
    }
  }

  function calculateTotalAmountCollected(balance, travelCharge, cardNumber) {
    let totalAmountCollected = 0;

    if (balance < travelCharge) {
      let rechargeAmount = Math.ceil(travelCharge - balance);
      rechargeMetroCard(cardNumber, rechargeAmount);
      totalAmountCollected = rechargeAmount * SERVICE_FEE_PERCENTAGE;
    }

    return totalAmountCollected;
  }

  function updateStationDetails(station, passengerType, totalAmountCollected, totalDiscountGiven) {
    const stationData = getStationData(station);
    stationData.totalAmountCollected += totalAmountCollected;
    stationData.totalDiscountsGiven += totalDiscountGiven;
    stationData.passengers[passengerType] += 1;
  }

  function getStationData(station) {
    if (station === "CENTRAL") {
      return centralStatiion;
    } else if (station === "AIRPORT") {
      return airportStatiion;
    }
    return null;
  }

  function processInput(input) {
    const lines = input.split("\n");
    lines.forEach((line) => {
      const [command, ...args] = line.trim().split(" ");
      switch (command) {
        case BALANCE_COMMAND:
          processBalanceCommand(...args);
          break;
        case CHECKIN_COMMAND:
          processCheckInCommand(...args);
          break;
        case PRINT_SUMMARY_COMMAND:
          printSummary(centralStatiion);
          printSummary(airportStatiion);
          break;
        default:
          break;
      }
    });
  }

  function processBalanceCommand(cardNumber, balance) {
    metroCardBalances.set(cardNumber, parseInt(balance));
  }

  function processCheckInCommand(cardNumber, passengerType, station) {
    processCheckIn(cardNumber, passengerType, station);
  }

  processInput(data);
}

module.exports = {
  processMetroCardTravel,
};
