import _polyfill from "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";

class Application extends React.Component {
  render() {
    return (
      <div>
        Hello!
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById("app"));
