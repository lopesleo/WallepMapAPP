test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
  const responseBody = await response.json();
  expect(responseBody).toBeDefined();
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();

  expect(responseBody.updated_at).toBe(parsedUpdatedAt);

  expect(responseBody.dependencies.database.server_version).toBeDefined();
  expect(
    Number.isInteger(responseBody.dependencies.database.max_connections),
  ).toBe(true);
  expect(
    Number.isInteger(responseBody.dependencies.database.active_connections),
  ).toBe(true);
});

test("test SQL Injection", async () => {
  await fetch("http://localhost:3000/api/v1/status");
});
