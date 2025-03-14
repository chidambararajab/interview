import React from "react";
import useFetch from "../hooks/useFetch.jsx";

function FetchedHere({ id = 1 }) {
  const {
    data: fetchedData,
    loading,
    error,
    refetch,
  } = useFetch(`https://jsonplaceholder.typicode.com/todos/${id}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{JSON.stringify(fetchedData)}</h1>
      <button onClick={refetch}>Refresh Data</button>
    </div>
  );
}

export default FetchedHere;
