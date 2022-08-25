import { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../../constants";
import DragLayer from "../DragLayer";

export function Row({ id, text, isFirst, onDrop }) {
  const containerRef = useRef();
  const ref = useRef();
  const [before, setBefore] = useState(false);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { id, text },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, text]
  );

  const [{ isOver }, drop] = useDrop(
    {
      accept: ItemTypes.CARD,
      drop: (item) => {
        onDrop(item.id, id, before && isFirst);
      },
      hover: (item, monitor) => {
        const clientOffset = monitor.getClientOffset();
        const container = containerRef.current;
        const node = ref.current;

        const containerTop = container?.offsetTop;
        const nodeTop = node?.offsetTop;

        const top = containerTop + nodeTop;
        const height = node.offsetHeight;
        const middle = height / 2;

        const offset = clientOffset.y - top;

        if (!isFirst) return;

        if (offset < middle) return setBefore(true);
        setBefore(false);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        clientOffset: monitor.getClientOffset(),
        hoveredItem: monitor.getItem(),
      }),
    },
    [before, id, isFirst]
  );

  useEffect(() => {
    if (!isOver) setBefore(false);
  }, [isOver]);

  drop(containerRef);
  drag(containerRef);

  return (
    <div
      ref={containerRef}
      style={{
        overflow: "hidden",
        transition: "0.5s",
        height: isDragging ? 0 : "auto",
      }}
    >
      {isFirst ? <DragLayer isOver={before} /> : null}
      <div
        ref={ref}
        style={{
          height: "40px",
          padding: "0 0 10px 0",
        }}
      >
        <div className="row">{text}</div>
      </div>
      <DragLayer isOver={!before && isOver} />
    </div>
  );
}
