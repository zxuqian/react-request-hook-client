import React, { Component, Fragment } from 'react'
import { render } from 'react-dom';
import Request from "../../src/components/Request";

import Example from '../../src'
import useRequest from '../../src/components/useRequest';

class Demo extends Component {
  render() {
    return <Request url="http://www.mocky.io/v2/5d5b9ae33200005800628961" method="POST" variables={{ name: "123" }}>
      {(doRequest, { loading, error, data }) => {

        return <Fragment>
          <div>loading: {`${loading}`}</div>
          <div>data: {JSON.stringify(data || {})}</div>
          <div>error: {JSON.stringify(error || {})}</div>
          <button onClick={() => {
            doRequest();
          }}>Send request</button>

          <RequestHook />
        </Fragment>
      }}
    </Request>
  }
}

function RequestHook() {

  const { doRequest, error, loading, data } = useRequest({
    url: "http://jsonplaceholder.typicode.com/posts", method: "POST", variables: {
      title: 'foo',
      body: 'bar',
    }
  });

  return <Fragment>
    <h3>Request Hook</h3>
    <div>loading: {`${loading}`}</div>
    <div>data: {JSON.stringify(data || {})}</div>
    <div>error: {JSON.stringify(error || {})}</div>
    <button onClick={() => {
      doRequest({ userId: 1 });
    }}>Send request</button>
  </Fragment>
}

render(<Demo />, document.querySelector('#demo'))
