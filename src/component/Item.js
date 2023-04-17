import React from "react";
import { MdDelete, MdEditNote } from "react-icons/md";

export default function Item(props) {
  return (
    <div className="item" style={props.bgclr}>
      <div id={props.id}>
        <h4>
          {props.title.length > 25
            ? props.title.slice(0, 25) + " ..."
            : props.title}
        </h4>
        {/* <h4>{props.title}</h4> */}
        <p>
          {props.descr.length > 50
            ? props.descr.slice(0, 50) + " ..."
            : props.descr}
        </p>
      </div>
      <div style={{ marginLeft: "5px" }}>
        <MdEditNote
          onClick={() => {
            props.edit(props.id);
          }}
          className="edit"
        />
        <br />
        <MdDelete
          onClick={() => {
            props.delt(props.delkey);
          }}
          className="delt"
        />
      </div>
    </div>
  );
}
