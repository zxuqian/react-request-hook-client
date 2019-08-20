
# react-request-hook-client

A helper react component to make HTTP requests, powered by React Hooks, insipred by Apollo GraphQL `Query` component. It supports both declarative and hooks ways.

## Installing

**npm**

```bash
$ npm install --save react-request-hook-client
```

**or Yarn**
```bash
$ yarn add react-request-hook-client
```

## Requirement

React >= 16.8.0

## Get Started

### Use Request component

See live example on CodeSandBox:

[![Edit react-request-hook-client-demo2](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-request-hook-client-demo2-oscn2?fontsize=14)

#### GET

```jsx

import { Request, useRequest } from "react-request-hook-client";

function App() {
  return (
      <Request url="https://jsonplaceholder.typicode.com/todos/1">
        {({ data }) => {
          return <div>Get using declarative way: {JSON.stringify(data || {})}</div>;
        }}
      </Request>
  );
}

```

#### POST and others

```jsx
function PostDemo() {
  return (
    <>
      <div>declarative post: </div>
      <Request
        method="POST"
        url="https://jsonplaceholder.typicode.com/posts"
        variables={{ userId: 2, title: "foo", body: "bar" }}
      >
        {(doRequest, { loading, error, data }) => {
          return (
            <>
              <div>loading: {`${loading}`}</div>
              <div>data: {JSON.stringify(data || {})}</div>
              <div>error: {JSON.stringify(error || {})}</div>
              <button
                onClick={() => {
                  doRequest();
                }}
              >
                Send request
              </button>
            </>
          );
        }}
      </Request>
    </>
  );
}
```

### Use Hooks

#### GET

```jsx
function GetHooksDemo() {
  const { error, loading, data } = useRequest({
    url: "https://jsonplaceholder.typicode.com/todos/2"
  });

  if (loading) return <div>loading...</div>;
  if (error) return null;
  return <div>hooks way: {JSON.stringify(data)}</div>;
}

```

#### POST and others

```jsx
function PostDemoHooks() {
  const { doRequest, error, loading, data } = useRequest({
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "POST",
    variables: {
      userId: 1
    }
  });

  return (
    <>
      <div>Post Hook</div>
      <div>loading: {`${loading}`}</div>
      <div>data: {JSON.stringify(data || {})}</div>
      <div>error: {JSON.stringify(error || {})}</div>
      <button
        onClick={() => {
          doRequest({ title: "foo", body: "bar" });
        }}
      >
        Send request
      </button>
    </>
  );
}
```

## API

### Request component

#### Props


| Props     | Type    | Default Value                        | Description                                                                                                                                                              |
|-----------|---------|--------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| url       | String  | null                                 | The HTTP request url                                                                                                                                                     |
| method    | String  | GET                                  | The HTTP request method, supports GET, POST, PUT, DELETE                                                                                                                 |
| variables | Object  | null                                 | Variables for the request. If it is a GET request, variables will be converted to query strings. If it is a POST/PUT/DELETE request, variables will be the request body. |
| headers   | Object  | {"Content-Type": "application/json"} | Additional headers                                                                                                                                                       |
| fire      | Boolean | TRUE                                 | Whether to fire the request immediately, used to finely control the time when the request will fire.                                                                     |


The `children` of the Request component must be a function, it has the following signature when the request method is GET:

```javascript

({loading, error, data, doRequest}) => {

  return // a react component

}
```

POST and others:

```javascript

(doRequest, {loading, error, data}) => {

  return // a react component

}
```

Arguments explanation:

- loading - whether the request is pending.
- error - whether the request encounters HTTP errors.
- data - Data returned by the server.

The function **MUST** return a single enclosed React component according to the JSX rules, or null if no component will be returned.


### useRequest hook

The `useRequest` hook takes the same props/arguments as Request component, and return the following object upon using:

```javascript
  const { loading, error, data, doRequest } = useRequest({url:, variables:, ...})
```

In addition to specify `variables` at the declaration time, the `doRequest` function takes an additional variables object as its argument:

```jsx
<button
  onClick={() => {
    doRequest({ title: "foo", body: "bar" });
  }}
>
  Send request
</button>
```

It also has return values, which are:

- `{ success: true, response }` - when the HTTP request succeeds.
- `{ success: false, error }` - when the HTTP request fails.

These values can help users to deal with response data at the time when the event triggers.

## Issues

If you have any questions or find a bug of this library, please feel free to open an issue.

## License

MIT