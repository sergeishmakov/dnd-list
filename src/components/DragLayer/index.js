import React from "react";
import { useDragLayer } from "react-dnd";

function DragLayer({ isOver }) {
  const { isDragging } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
  }));

  return (
    <div
      key={isDragging}
      style={{
        display: "flex",
        opacity: 0.5,
        borderStyle: "dashed",
        alignItems: "center",
        justifyContent: "center",
        transition: isDragging ? "0.5s" : 0,
        border: "none",
        height: isOver ? "50px" : 0,
      }}
    />
  );
}
export default DragLayer;
