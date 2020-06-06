import React, { useState } from "react";
import "./App.css";

// JSX: Sintaxe de XML dentro do JS
import Header from "./Header";

function App() {
  const [counter, setCounter] = useState(0); // [valor do estado, Função para atualizar o valor do estado]

  function handleButtonCLick() {
    setCounter(counter + 1);
  }

  return (
    <div>
      <Header title={`Contador: ${counter}`} />

      <h1>{counter * 2}</h1>
      <button type="button" onClick={handleButtonCLick}>
        Somar
      </button>
    </div>
  );
}

export default App;
