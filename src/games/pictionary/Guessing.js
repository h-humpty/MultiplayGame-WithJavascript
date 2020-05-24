import React, { useState } from "react";
import NextGameButton from "./Button";

function Guessing(props) {
    const [guess, setGuess] = useState("");
    function handleChange(e) {
        e.preventDefault();
        setGuess(e.target.value.toLowerCase());
    }

    function handleSubmit(e) {
        e.preventDefault();
        checkAnswer();
    }

    function checkAnswer() {
        if (props.animal === guess) {
            alert("Your answer is " + guess + " and it is correct.");
            props.setScore();
        } else {
            alert(
                "Your answer is " +
                guess +
                " and it is wrong. The correct answer is " +
                props.animal
            );
        }
    }

    function handleNextGameButtonClick() {
        props.updateFirebase({
            animal: "",
            drawingPlayer: props.getNextDrawingPlayer(),
            phase: "drawing",
            round: props.round + 1
        });

        // erase the canvas:
        let canvas = props.refCanvas.current;
        canvas.clear();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Make Your Guess! </label>
                <input type="text" name="guess" value={guess} onChange={handleChange} />
                <button>Submit Your Answer</button>
            </form>
            <NextGameButton
                handleClick={handleNextGameButtonClick}
                text="Next Round"
            />
        </div>
    );
}

export default Guessing;
