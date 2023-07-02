const metroCardBalances = new Map();
const returnJourneyCardNumbers = new Set();
const TRAVEL_CHARGES = {
  KID: 50,
  ADULT: 200,
  SENIOR_CITIZEN: 100,
};

const RETURN_JOURNEY_DISCOUNT = 0.5;
const SERVICE_FEE_PERCENTAGE = 0.02;

function rechargeMetroCard(cardNumber, rechargeAmount) {
  const balance = metroCardBalances.get(cardNumber);
  metroCardBalances.set(cardNumber, balance + rechargeAmount);
}

module.exports = {
  metroCardBalances,
  returnJourneyCardNumbers,
  TRAVEL_CHARGES,
  RETURN_JOURNEY_DISCOUNT,
  SERVICE_FEE_PERCENTAGE,
  rechargeMetroCard,
};
