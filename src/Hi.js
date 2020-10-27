import React, { useState } from 'react';

function Hi({ name, age }) {

  const hi = (who) => {
    console.log(`Hello to ${who}`)
  }

  const [x, setX] = useState(1)

  const addone = () => {
    setX(x + 1)
    console.log(x)
  }

  const [s, setS] = useState("cat")

  const pluralize = () => {
    setS(s + "s")
  }

  const [toggle, setToggle] = useState(true)

  const toggleDisplay = () => {
    setToggle(!toggle)
  }

  return (
    <>
      <p>
        Hi there {name}, you are {age}
      </p>
      <button onClick={() => hi(name)}>Click Me</button>
      <button onClick={toggleDisplay}>Toggle</button>
      <br />
      {
        toggle
          ?
          <>
            <button onClick={addone}>Add 1</button>
            <p>
              X is {x}
            </p>
          </>
          :
          <>
            <button onClick={pluralize}>Pluralize</button>
            <p>
              String s is {s}
            </p>
          </>
      }
    </>
  );
}

export default Hi;
