import { useState } from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import "./App.css";
import Container from "./components/Container";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Container />
      </div>
    </DndProvider>
  );
}

export default App;
