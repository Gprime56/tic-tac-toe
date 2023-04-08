import { useState, useMemo } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Name ({onNameChange}){
  const [name, setName] = useState(null);
  const currentName = useMemo(() => name, [name]);
  return (
    <>
    <div> Insert name here. </div>
    
    <form onSubmit= {(e) => {
      e.preventDefault();
      onNameChange(name)
      
      setName("")
    }}>
      <textarea
        placeholder="Name"
        value={currentName}
        onChange={e => setName(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  </>
  )
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] =
  useState(Array(9).fill(null));
  const [start, setStart] = useState(false);  
  const [names, setNames] = useState([]);

  function handleName(name) {
    const Newname=[...names, name]
    console.log(Newname)
    setNames(Newname)
    setStart(Newname.length===2)
  }
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]){
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  const list= names
  const name1= (list[0])
  const name2= (list[1])
  if (winner==="X") {
    status ="Winner:" + name1;
  } else if (winner==="O") {
    status ="Winner:" + name2;
  } else {
    status = "Next player: " + (xIsNext ? "X"+name1 : "O"+name2) ;
  }

  if (start===false) {
  return (
    <>
    <div> Don't start yet </div>
     <Name onNameChange={(name) => handleName(name)}/>
    </>
  
  )
}
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row"> 
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}