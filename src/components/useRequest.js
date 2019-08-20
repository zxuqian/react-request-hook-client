import { useState, useEffect } from "react";
import request from "../request";

/**
 * Request hook
 *
 * @param {{url: string, method: string, variables: object, headers: object, withJWT: boolean, refetch: boolean, fire: boolean}} props
 */
const useRequest = ({
  url,
  method = "GET",
  variables,
  headers = {},
  fire = true // conditionally fire the rquest to prevent multiple fetch durign rerenders
}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState(null);

  const doRequest = async (additionalVariables = {}) => {
    const options = {};
    options.method = method;

    if (
      (variables && Object.keys(variables).length > 0) ||
      (additionalVariables && Object.keys(additionalVariables).length > 0)
    ) {
      let allVariables = { ...variables };
      if (additionalVariables) {
        allVariables = { ...variables, ...additionalVariables };
      }

      if (method.toUpperCase() !== "GET") {
        options.body = JSON.stringify(allVariables);
      } else {
        url += `?${Object.keys(allVariables)
          .map(key => `${key}=${allVariables[key]}`)
          .join("&")}`;
      }
    }

    if (headers) {
      options.headers = headers;
    }
    try {
      setLoading(true);
      const response = await request(url, options);
      setData(response);
      setLoading(false);
      return { success: true, response };
    } catch (e) {
      const errorBody = await e.data;
      const error = { error: e.message, body: errorBody };
      setError(error);
      setLoading(false);
      return { success: false, error };
    }
  };

  useEffect(() => {
    if (fire) {
      if (method.toUpperCase() === "GET") {
        doRequest();
      }
    }
  }, [url, method, JSON.stringify(variables)]);

  return { loading, error, data, doRequest };
};
export default useRequest;
