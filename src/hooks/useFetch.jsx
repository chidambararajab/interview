import { useEffect, useState } from "react";

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [controller, setController] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setController(abortController);
    setLoading(true);
    setError(null);

    const fetchAPI = async () => {
      try {
        const response = await fetch(url, {
          ...options,
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const result = await response.json();

        if (abortController.signal.aborted) return;

        setData(result);
        setError(null);
      } catch (e) {
        if (e.message === "AbortError") {
          console.log("Fetch request aborted");
        } else {
          setError(e.message);
          setData(null);
        }
      } finally {
        if (abortController.signal.aborted) return;
        setLoading(false);
      }
    };

    fetchAPI();

    return () => abortController.abort();
  }, [url, JSON.stringify(options)]);

  const refresh = () => {
    if (controller) {
      controller.abort();
    }
    setController(new AbortController());
  };

  return {
    data,
    loading,
    error,
    refresh,
  };
}

export default useFetch;
