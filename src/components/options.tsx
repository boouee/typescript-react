import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";

export function ItemSelect({ func, props, disabled }: any) {
  return (
    <select
      style={{
        //position: "absolute",
        //margin: "auto",
        width: "100%",
      }}
      onChange={func}
      disabled={disabled}
    >
      <option value={""}></option>
      {props.options.map((option: any) => (
        <option key={option.v} value={option.v}>
          {option.l}
        </option>
      ))}
    </select>
  );
}
export function ItemRadio({ func, props }: any, disabled: boolean) {
  return (
    <div onChange={func}>
      <input
        type="radio"
        id="html"
        name="fav_language"
        value="HTML"
        disabled={disabled}
      />
      <br />
      <input
        type="radio"
        id="html"
        name="fav_language"
        value="HTML"
        disabled={disabled}
      />
    </div>
  );
}
export function ItemInput({ func, props, disabled }: any) {
  return (
    <input
      type="number"
      id="quantity"
      name="quantity"
      min={props.min}
      max={props.max}
      step={props.step}
      onChange={func}
      disabled={disabled}
    />
  );
}
function OptionType({ func, props, disabled }: any) {
  if (props.type == "dropdown") {
    return <ItemSelect func={func} props={props} disabled={disabled} />;
  } else if (props.type == "int") {
    return <ItemInput func={func} props={props} disabled={disabled} />;
  } else if (props.type == "checkbox") {
    return <ItemRadio func={func} props={props} disabled={disabled} />;
  } else {
    return <></>;
  }
}
export default function OptionItem({ func, props, disabled }: any) {
  return (
    <FormControl
      sx={{ m: 1, minWidth: 100 }}
      size="small"
      style={{
        position: "absolute",
        top: "0px",
        width: "100px",
        height: "100%",
        textAlign: "center",
        //display: "inline-block",
      }}
    >
      <div
        style={{
          userSelect: "none",
          position: "absolute",
          top: "5px",
          fontSize: "15px",
        }}
      >
        {props.label}
        <br />
        <br />
      </div>
      <div style={{ userSelect: "none", position: "absolute", bottom: "25px" }}>
        <OptionType
          func={func}
          props={props}
          disabled={disabled}
          style={{
            position: "relative",
            border: "1px solid black",
            bottom: "0px",
            userSelect: "none",
          }}
        />
      </div>
    </FormControl>
  );
}
