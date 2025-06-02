import React, { useEffect, useState } from "react";

const StateManage = () => {
  const [data, setData] = useState("Default State");
  const [num, setNum] = useState(0);

  const updateCurrentData = () => {
    setData("Updated data");
  };
  useEffect(
    () => {
      setData("inital data change");
    },
    [] //empty for inital run
  );
  useEffect(
    () => {
      if (data == "Aray") {
        setData(1000);
      }
    },
    [data] //list of states
  );
  useEffect(
    () => {
      if (num > 10) {
        setData("less");
      } else {
        setData("more");
      }
    },
    [num] 
  );
  const handleName=(e) => setData(e.target.value);

  return (
    <div>
      {data}
      <button onClick={updateCurrentData}>Click Me</button>
      <button
        onClick={() => {
          setData("From callback");
        }}
      >
        Click callback
      </button>
      <div>
        {num}
        <button
          onClick={() => {
            setNum(num + 1);
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            setNum(num - 1);
          }}
        >
          -
        </button>
      </div>
      <div>
        
        <input onChange={(e) => setData(e.target.value)}></input>
        <input onChange={handleName}></input>
      </div>
    </div>
  );
};

export default StateManage;