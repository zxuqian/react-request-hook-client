import React from "react";
import ReactDOM from "react-dom";
import Request from "./components/Request";

class App extends React.Component {
  render() {
    return <Request url="https://jsonplaceholder.typicode.com/todos/1">
      {({ data }) => {
        return <div>{JSON.stringify(data || {})}</div>
      }}
    </Request>
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);