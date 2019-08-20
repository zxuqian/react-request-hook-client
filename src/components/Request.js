import PropTypes from "prop-types";
import useRequest from "./useRequest";

/**
 * refetch prop is used to control whether to refetch content after
 * a post or put request. The Request component will depend on its value
 * change to do the fetch, the boolean value is just a convenient flag to
 * indicate a change. 
 * 
 * @example
 * GET:
 * <Request
 *   url="/url/to/source"
 *   method="GET"
 *   variables={{ page: 1, pageSize: 10 }}
 * >
 *  {({ loading, error, data }) => {
 *   return <component />;
 *  }}
 *  </Request>
 * 
 * 
 * POST || PUT || DELETE
 * <Request
 *  method="POST"
 *  url="/url/to/source"
 *  variables={{ name: "John Doe" }}
 * >
 * {(doRequest, { loading, error, data }) => {
 *    return <Button onClick={() => doRequest()}>Add</Button>;
 * }}
</Request>
 *
 * @param {{url: string, method: string, variables: object, headers: object, withJWT: boolean, refetch: boolean, fire: boolean}} props
 */
function Request({
  children,
  url,
  method = "GET",
  variables,
  headers = {},
  fire = true // conditionally fire the rquest to prevent multiple fetch durign rerenders
}) {
  const { loading, error, data, doRequest } = useRequest({
    url,
    method,
    variables,
    headers,
    fire
  });

  // if (!fire) return children(doRequest);
  return method.toUpperCase() === "GET"
    ? children({ loading, error, data, refetch: doRequest })
    : children(doRequest, { loading, error, data });
};

Request.propTypes = {
  url: PropTypes.string.isRequired,
  method: PropTypes.string,
  variables: PropTypes.object,
  headers: PropTypes.object,
  withJWT: PropTypes.bool,
  children: PropTypes.any,
  refetch: PropTypes.bool
};

export default Request;
