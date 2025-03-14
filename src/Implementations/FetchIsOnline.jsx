import React from "react";
import useIsOnline from "../hooks/useIsOnline";

function FetchIsOnline() {
  const isOnline = useIsOnline();
  return (
    <div>
      <h1>{JSON.stringify(isOnline)}</h1>
    </div>
  );
}

export default FetchIsOnline;
