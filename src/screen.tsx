import React, { useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import JsonView from "@uiw/react-json-view";
import { darkTheme } from "@uiw/react-json-view/dark";
import { lightTheme } from "@uiw/react-json-view/light";
import "react-json-view-lite/dist/index.css";
import "split-pane-react/esm/themes/default.css";
import App from "./transg";
import data from "./data.json";

export default function Screen() {
  const [sizes, setSizes] = useState([window.innerWidth * 0.6, "40%", "auto"]);

  const layoutCSS = {
    height: "100%",
  };
  const [json, setJson] = React.useState("{}");
  return (
    <div style={{ height: 1000 }}>
      <SplitPane
        split="vertical"
        sizes={sizes}
        onChange={() => null}
        sashRender={() => null}
      >
        <Pane minSize={"60%"} maxSize="60%">
          <div
            className="container"
            style={{
              ...layoutCSS,
              background: "#ddd",
              //alignItems: "center",
              border: "1px solid black",
            }}
          >
            <App json={setJson} />
          </div>
        </Pane>
        <div
          style={{
            ...layoutCSS,
            overflow: "auto",
            backgroundColor: "#000000",
          }}
        >
          <JsonView value={JSON.parse(json)} style={darkTheme} />
        </div>
      </SplitPane>
    </div>
  );
}
