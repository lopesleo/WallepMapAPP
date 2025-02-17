test("GET to /api/v1/walletmap/totalwallets should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/wallets/active");
  const responseBody = await response.json();
  expect(response.status).toBe(200);
  expect(responseBody).toBeDefined();
  expect(Number.isInteger(responseBody.total_actives)).toBe(true);
});
