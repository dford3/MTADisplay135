// netlify/functions/mta135.js
//
// Stable demo API for 135 St – 2/3 Downtown.
// Your front-end calls /.netlify/functions/mta135
// and always gets believable times instead of errors.

exports.handler = async function () {
  const now = new Date();

  // Fake but realistic minutes
  const baseMinutes2 = [2, 6, 11];
  const baseMinutes3 = [4, 9, 15];

  const trains = [
    ...baseMinutes2.map((m) => ({
      route: "2",
      minutes: m,
      time: new Date(now.getTime() + m * 60000).toISOString(),
      destination: "Downtown & Brooklyn",
    })),
    ...baseMinutes3.map((m) => ({
      route: "3",
      minutes: m,
      time: new Date(now.getTime() + m * 60000).toISOString(),
      destination: "Downtown & Brooklyn",
    })),
  ].sort((a, b) => a.minutes - b.minutes);

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      stationName: "135 St",
      direction: "Downtown",
      updatedAt: now.toISOString(),
      trains,
    }),
  };
};
