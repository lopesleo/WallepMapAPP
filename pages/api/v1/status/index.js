import database from "infra/database.js";

async function status(request, response) {
  try {
    const updatedAt = new Date().toISOString();
    const databaseName = request.query.database;
    const [version, maxConnections, usedConnectionsActive] = await Promise.all([
      database.query("SHOW server_version;"),
      database.query("SHOW max_connections;"),
      database.query(
        `SELECT * FROM pg_stat_activity WHERE datname = current_database() and state = 'active';`,
        // `SELECT * FROM pg_stat_activity WHERE datname = current_database() and state = 'active';`,
      ),
    ]);
    response.status(200).json({
      updated_at: updatedAt,
      dependencies: {
        database: {
          server_version: version.rows[0].server_version,
          max_connections: parseInt(maxConnections.rows[0].max_connections),
          active_connections: usedConnectionsActive.rowCount,
        },
      },
    });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}

export default status;
