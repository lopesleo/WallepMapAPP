import database from "infra/database";

export default async function totalwallets(request, response) {
  const allowedMethods = ["GET"];
  if (!allowedMethods.includes(request.method)) {
    response.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  let dbClient = await database.getNewClient();
  try {
    const totalWallets = await dbClient.query(
      "SELECT count(*) FROM balances where balance > 0;",
    );
    response.status(200).json({
      total_actives: parseInt(totalWallets.rows[0].count),
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  } finally {
    dbClient.end();
  }
}
