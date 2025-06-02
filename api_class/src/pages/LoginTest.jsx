import React, { use } from "react";
import { useState } from "react";
import { useEffect } from "react";

export const LoginTest = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(()=>{
    setMessage("plese enter your details");
  },
[]);

  useEffect(
    () => {
      setName("inital data change");
    },
    [] //empty for inital run
  );
  useEffect(
    () => {
      setEmail("inital data change");
    },
    [] //empty for inital run
  );
  useEffect(
    () => {
      setPassword("inital data change");
    },
    [] //empty for inital run
  );

  return (
    <div>
      {name}
      {email}
      {password}
      <button>submit</button>
      <input onChange={(e)=>setName(e.target.value)}></input>
        <input onChange={(e)=>setEmail(e.target.value)}></input>
        <input onChange={(e)=>setPassword(e.target.value)}></input>
    </div>
  );
};
