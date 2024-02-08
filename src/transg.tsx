import * as React from "react";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import { TransitionGroup } from "react-transition-group";
import { Root, Main, Collapsable } from "./components/items";
import useDraggable from "./useDraggable";
import OptionItem from "./components/options";
import { SelectChangeEvent } from "@mui/material/Select";

const FRUITS = ["10", "20", "30", "40", "50"];

interface RenderItemOptions {
  item: string;
  handleRemoveFruit: (item: string) => void;
}

export default function App() {
  const [items, setItems] = React.useState(FRUITS.slice(0, 2));
  const handleAddItem = (event: SelectChangeEvent) => {
    setItems((prev) => [...prev, event.target.value]);
  };

  const handleRemoveFruit = (item: string) => {
    setItems((prev) => [...prev.filter((i) => i !== item)]);
  };

  function renderItem({ item, handleRemoveFruit }: RenderItemOptions) {
    return (
      <ListItem style={{ width: "130px" }}>
        <Collapsable />
        {/*
        <OptionItem func={handleAddItem} label={item} value={item} />
    */}
      </ListItem>
    );
  }
  return (
    <>
      <div
        ref={useDraggable()[0]}
        id="Root"
        className="draggable"
        //onMouseMove={handleOverlapCheck}
        style={{
          cursor: "grab",
          width: "62px",
          height: "92px",
          borderStyle: "dotted",
        }}
      >
        <Root />
      </div>
      <div
        ref={useDraggable()[0]}
        style={{ cursor: "grab" }}
        className="draggable"
      >
        <TransitionGroup style={{ display: "flex" }}>
          <ListItem
            style={{
              width: "132px",
              height: "100px",
              borderStyle: "dotted",
            }}
            //onDrag={handleOverlapCheck}

            id="main"
          >
            <Main />
            <OptionItem
              func={handleAddItem}
              label={"Условие"}
              value={0}
              type={0}
            />
          </ListItem>
          {items.map((item) => (
            <Collapse orientation="horizontal" key={item}>
              {renderItem({ item, handleRemoveFruit })}
            </Collapse>
          ))}
        </TransitionGroup>
      </div>
    </>
  );
}
