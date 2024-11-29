import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {updatedAtText}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  return (
    <>
      <h2>Status do Banco de Dados</h2>

      {!isLoading && data ? (
        <>
          <p>Versão: {data.dependencies.database.version}</p>
          <p>
            Conexões abertas: {data.dependencies.database.opened_connections}
          </p>
          <p>Conexões máximas: {data.dependencies.database.max_connections}</p>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </>
  );
}
