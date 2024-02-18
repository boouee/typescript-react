import React, { useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import JsonView from "@uiw/react-json-view";
import { darkTheme } from "@uiw/react-json-view/dark";
import { Root, Main, Collapsable } from "./components/items";
import "react-json-view-lite/dist/index.css";
import "split-pane-react/esm/themes/default.css";
import Condition from "./transg";
import useDraggable from "./useDraggable";
import data from "./data.json";
import { ReactElement } from "react";

const Piece = ({ item }: { item: React.ReactNode }) => {
  //const { childComp } = item!;
  return <div ref={useDraggable()[0]}>{item}</div>;
};
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
              border: "1px solid black",
            }}
          >
            <Piece item={Root() as React.ReactNode} />
            <Condition json={setJson} />
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
