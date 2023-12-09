import database from 'infra/database';

async function status(request, response) {
  const updateAt = new Date().toISOString();
  
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query("SHOW max_connections;");
  const databaseMaxConnectionsValue = databaseMaxConnectionsResult.rows[0].max_connections;

  response.status(200).json({ 
    updated_at: updateAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue)
      }
    }
  });
}

export default status;