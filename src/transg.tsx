import * as React from "react";
import Grow from "@mui/material/Grow";
import { TransitionGroup } from "react-transition-group";
import { Root, Main, Collapsable } from "./components/items";
import useDraggable from "./useDraggable";
import OptionItem from "./components/options";
import { SelectChangeEvent } from "@mui/material/Select";
import data from "./config.json";

const { children, ...currentOption } = data;
interface RenderItemOptions {
  item: string;
  handleAddItem: (event: SelectChangeEvent) => void;
}

function renderItem({ item, handleAddItem }: RenderItemOptions) {
  return (
    <Grow
      style={{
        width: "130px",
        float: "left",
        gridRow: 1,
      }}
      key={JSON.parse(JSON.stringify(item)).id}
    >
      <div>
        <Collapsable />
        <OptionItem
          func={handleAddItem}
          props={item}
          style={{ userSelect: "none" }}
        />
      </div>
    </Grow>
  );
}

export function nest(array: any[]) {
  if (array.length == 1) {
    return array[0] as any;
  } else {
    console.log("array[-2]: ", array.length, array[array.length - 2]);
    array[array.length - 2] = JSON.stringify({
      ...JSON.parse(array[array.length - 2]),
      children: JSON.parse(array[array.length - 1]),
    });
    console.log("json: ", array);
    return nest(array.slice(0, array.length - 1));
  }
}

export default function Condition({ json }: any) {
  const [current, setCurrent] = React.useState(JSON.stringify(data));
  const [items, setItems] = React.useState([""].splice(0, 0));
  const [output, setOutput] = React.useState(["{}"]);

  const handleAddItem = (event: SelectChangeEvent) => {
    const child =
      JSON.parse(current).type == "dropdown"
        ? JSON.parse(current).children.find(
            (i: any) => i.v == event.target.value,
          )!.c
        : (JSON.parse(current).children == undefined
          ? null
          : JSON.parse(current).children[0]!.c);

    setCurrent(JSON.stringify(child));
    delete child.children;
    if (child != null) {
      setItems((prev) => [...prev, child]);
    }
    const lastOutput = { id: child.id, type: child.type}
    const newOutput = [...output, JSON.stringify(lastOutput)];
    setOutput(newOutput);
    json(nest(newOutput));
  };

  return (
    <div
      ref={useDraggable()[0]}
      style={{ cursor: "grab", position: "relative" }}
      className="draggable"
    >
      <TransitionGroup
        style={{ display: "grid", width: String(132 * items.length) + "px" }}
      >
        <div
          style={{
            width: "132px",
            height: "100px",
            gridRow: 1,
          }}
          id="main"
        >
          <Main />
          <OptionItem
            func={handleAddItem}
            props={currentOption!}
            disabled={false}
            style={{ userSelect: "none" }}
          />
        {current}
        </div>

        {items.map((item) => renderItem({ item, handleAddItem }))}
      </TransitionGroup>
    </div>
  );
}
