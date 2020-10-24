import React, { useState } from 'react';

function Math3({ x, y, operator, result }) {

    const [r, setR] = useState(result)

    const correction = () => {
        setR(1 * prompt("Enter new result"))
    }

    let answer = -1
    if (operator === "+") {
        answer = x + y
    } else if (operator === "-") {
        answer = x - y
    } else if (operator === "*") {
        answer = x * y
    } else if (operator === "/") {
        answer = x / y
    }

    return (
        <>
            <p>
                {
                    `
                    ${x} ${operator} ${y} = ${r} 
                    ${r === answer ? 'Correct' : `Incorrect (${answer})`}
                    `
                }
            </p>
            <button onClick={correction}>Correction</button>
        </>
    );
}

export default Math3;
