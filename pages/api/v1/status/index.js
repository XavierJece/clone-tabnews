import database from 'infra/database';

async function status(request, response) {
  const updateAt = new Date().toISOString();
  
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseName = process.env.POSTGRES_DB;
  const databaseMaxConnectionsResult = await database.query("SHOW max_connections;");
  const databaseMaxConnectionsValue = databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*) FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName]
  });

  const databaseOpenedConnectionsValue = databaseOpenedConnectionsResult.rows[0].count;

  response.status(200).json({ 
    updated_at: updateAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: parseInt(databaseOpenedConnectionsValue), 
      }
    }
  });
}

export default status;