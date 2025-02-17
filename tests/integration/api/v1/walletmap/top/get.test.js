describe("GET /api/v1/walletmap/topwallets", () => {
  let response;
  let responseBody;

  beforeAll(async () => {
    response = await fetch("http://localhost:3000/api/v1/wallets/top");
    responseBody = await response.json();
  });

  test("should return 200 status code", () => {
    expect(response.status).toBe(200);
  });

  test("should return a defined response body", () => {
    expect(responseBody).toBeDefined();
  });

  test("should return an array of top wallets", () => {
    expect(Array.isArray(responseBody.top_wallets)).toBe(true);
  });

  test("should return exactly 10 top wallets", () => {
    expect(responseBody.top_wallets.length).toBe(10);
  });

  test("each wallet should have an address and a balance", () => {
    for (const wallet of responseBody.top_wallets) {
      expect(wallet).toHaveProperty("address");
      expect(wallet).toHaveProperty("balance");
    }
  });

  test("each wallet balance should be an integer", () => {
    for (const wallet of responseBody.top_wallets) {
      expect(Number.isInteger(Number(wallet.balance))).toBe(true);
    }
  });
});
