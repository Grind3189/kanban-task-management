import { useEffect, useState } from "react";
import { requestWithoutToken } from "../utils/makeRequest";

const useFetch = async (url: string) => {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  console.log(data)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(false)
        setIsLoading(true)
        const res = await requestWithoutToken.post(url)
        setData(res)
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData()
  }, [url]);

  return {data, isLoading, error} ;
};

export default useFetch;
