import * as React from "react";
import Grow from "@mui/material/Grow";
import ListItem from "@mui/material/ListItem";
import { TransitionGroup } from "react-transition-group";
import { Root, Main, Collapsable} from "./components/items";
import useDraggable from "./useDraggable";
import OptionItem from "./components/options";
import { SelectChangeEvent } from "@mui/material/Select";
import data from "./config.json";

//const [currentOption, setCurrentOption] = React.useState();
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
    //console.log("last json : ", array);
    return array[0] as any;
  } else {
    console.log("array[-2]: ", array.length, array[array.length - 2]);
    array[array.length - 2] = JSON.stringify({
      ...JSON.parse(array[array.length - 2]),
      children: JSON.parse(array[array.length - 1]),
    });
    console.log("json: ", array);
    return nest(array.slice(0, array.length - 1)) as any;
  }
}

export default function App({ json }: any) {
  const [current, setCurrent] = React.useState(JSON.stringify(data));
  const [items, setItems] = React.useState([""].splice(0, 0));
  const [output, setOutput] = React.useState(["{}"]);

  const handleAddItem = (event: SelectChangeEvent) => {
    console.log("target value: ", event.target.value);
    console.log("current before: ", JSON.parse(current));
    const child =
      JSON.parse(current).type == "dropdown"
        ? JSON.parse(current).children.find(
            (i: any) => i.v == event.target.value,
          )!.c
        : JSON.parse(current).children == undefined
          ? null
          : JSON.parse(current).children[0];

    setCurrent(JSON.stringify(child));
    console.log("current after: ", JSON.parse(current));
    console.log("child: ", child);
    delete child.children;
    if (child != null) {
      setItems((prev) => [...prev, child]);
    }
    //delete child.options;
    const newOutput = [...output, JSON.stringify(child)];

    //console.log(output);
    setOutput(newOutput);
    console.log(nest(newOutput));
    json(nest(newOutput));
  };

  return (
    <>
      <div
        ref={useDraggable()[0]}
        id="Root"
        className="draggable"
        style={{
          cursor: "grab",
          width: "62px",
          height: "92px",
        }}
      >
        <Root />
      </div>

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
          </div>

          {items.map((item) => renderItem({ item, handleAddItem }))}
        </TransitionGroup>
      </div>
    </>
  );
}
