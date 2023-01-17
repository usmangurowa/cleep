import React from "react";

const useLoading = () => {
  const [loading, setLoading] = React.useState<string | boolean>("");

  const start = (data: string | boolean = true) => setLoading(data);

  const stop = () => setLoading(false);

  return { loading, start, stop, isLoading: Boolean(loading) };
};

export default useLoading;
