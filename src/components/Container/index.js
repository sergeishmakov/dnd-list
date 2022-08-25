import React, { useCallback, useState } from "react";
import { defaultItems } from "../../constants";
import { Row } from "../Row";

export default function Container() {
  const [items, setItems] = useState(defaultItems);

  const handleDrop = useCallback((draggedRowId, targetRowId, before) => {
    setItems((state) => {
      const draggedItem = state.find((item) => item.id === draggedRowId);
      if (!draggedItem) return state;
      const items = state.filter((item) => item.id !== draggedRowId);
      const targetIndex = items.findIndex((item) => item.id === targetRowId);
      if (targetIndex < 0) return state;
      items.splice(before ? targetIndex : targetIndex + 1, 0, draggedItem);
      return [...items];
    });
  }, []);

  return (
    <div className="container">
      {items.map((item, index) => (
        <Row
          key={item.id}
          isFirst={index === 0}
          id={item.id}
          text={item.id}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
}
