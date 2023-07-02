function printSummary(station) {
  console.log(`TOTAL_COLLECTION ${station.name} ${station.totalAmountCollected} ${station.totalDiscountsGiven}`);
  console.log(`PASSENGER_TYPE_SUMMARY`);

  const passengers = station.passengers;
  const sortedPassengerTypes = Object.keys(passengers).sort((a, b) => {
    if (passengers[a] !== passengers[b]) {
      return passengers[b] - passengers[a]; // Sort by descending passenger count
    } else {
      return a.localeCompare(b); // Sort alphabetically if passenger counts are the same
    }
  });

  for (const passengerType of sortedPassengerTypes) {
    const count = passengers[passengerType];
    if (count !== 0) {
      console.log(`${passengerType} ${count}`);
    }
  }
}

module.exports = {
  printSummary,
};
