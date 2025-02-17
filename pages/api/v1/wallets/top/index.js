import database from "infra/database";

export default async function topwallets(request, response) {
  const allowedMethods = ["GET"];
  if (!allowedMethods.includes(request.method)) {
    response.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  let dbClient = await database.getNewClient();
  try {
    const { limit } = request.query;
    const parsedLimit = parseInt(limit, 10) || 10;
    const topwallets = await dbClient.query(
      "SELECT * FROM balances WHERE balance > 0 ORDER BY balance DESC LIMIT $1;",
      [parsedLimit],
    );
    const topWalletsInBTC = topwallets.rows.map((wallet) => ({
      ...wallet,
      balance: wallet.balance / 100000000,
    }));
    response.status(200).json({
      top_wallets: topWalletsInBTC,
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  } finally {
    dbClient.end();
  }
}
