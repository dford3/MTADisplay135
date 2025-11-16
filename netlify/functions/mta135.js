// netlify/functions/mta135.js
//
// Stable demo API for 135 St – 2/3 Downtown + M7/M102/M1 southbound buses
// Returns:
// - trains: 3 upcoming trains (2/3)
// - buses: 3 upcoming buses (M7, M102, M1)
// - weather: simple current conditions

exports.handler = async function () {
  const now = new Date();

  // ---- TRAINS (2/3 downtown) ----
  const trainMinutes = [2, 5, 9]; // next 3 trains
  const trainRoutes = ["2", "3", "2"];

  const trains = trainMinutes.map((m, idx) => ({
    route: trainRoutes[idx],
    minutes: m,
    time: new Date(now.getTime() + m * 60000).toISOString(),
    destination: "Downtown"
  }));

  // ---- BUSES (M7, M102, M1 southbound) ----
  const busMinutes = [3, 7, 12]; // next 3 buses
  const busRoutes = ["M7", "M102", "M1"];

  const buses = busMinutes.map((m, idx) => ({
    route: busRoutes[idx],
    minutes: m,
    time: new Date(now.getTime() + m * 60000).toISOString(),
    destination: "Southbound"
  }));

  // ---- WEATHER (simple demo; can swap for real API later) ----
  const weather = {
    tempF: 72,
    tempC: 22,
    condition: "Clear"
  };

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      stationName: "135 St",
      direction: "Downtown",
      updatedAt: now.toISOString(),
      trains,
      buses,
      weather
    })
  };
};
