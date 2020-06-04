import firebase from 'firebase';
import React from "react";
import GameComponent from "../../GameComponent.js";
import Pictionary from "./PictionaryApp";

const SESSION_DATA_PATH = "/session";

export default class App extends GameComponent {

    constructor(props) {
        super(props);

        this.state = {
            animal: "",
            drawingPlayer: this.getSessionCreatorUserId(),
            globalCanvasBlob: null,
            guess: "",
            phase: "drawing",
            players: this.getSessionUserIds(),
            round: 1,
            score: 0,
        };

        this.updateFirebase = this.updateFirebase.bind(this);
        this.getNextDrawingPlayer = this.getNextDrawingPlayer.bind(this);
        this.sendBlobToFirebase = this.sendBlobToFirebase.bind(this);

        this.myId = this.getMyUserId();

        // set the initial global state if this is the creator session
        if (this.state.drawingPlayer === this.state.players[0]) {
            this.getSessionDatabaseRef().update(this.state, err => {
                if (err) console.error(err);
            });
        }
    }

    getNextDrawingPlayer() {
        let nextDrawingPlayer;

        if (this.state.drawingPlayer === this.players[0]) {
            nextDrawingPlayer = this.players[1];
        } else {
            nextDrawingPlayer = this.players[0];
        }

        return nextDrawingPlayer;
    }

    onSessionDataChanged(data) {
        console.log("new data from Firebase:", data);
        this.setState({
            ...data,
        });
    }

    onSessionMetadataChanged(metaData) {
        console.log("new metaData from Firebase:", metaData);
    }

    updateFirebase(data) {
        console.log("data sent to Firebase:", data);
        this.getSessionDatabaseRef().update(data, err => {
            if (err) console.error(err);
        });
    }

    sendBlobToFirebase(canvas) {
        // const dataURL = canvas.toDataURL('image/jpeg', 0.5);
        const dataURL = canvas.toDataURL();

        this.updateFirebase({
            globalCanvasBlob: dataURL
        });
    }

    render() {
        return (
            <div>
                <Pictionary
                    animal={this.state.animal}
                    globalCanvasBlob={this.state.globalCanvasBlob}
                    drawingPlayer={this.state.drawingPlayer}
                    guess={this.state.guess}
                    myId={this.myId}
                    phase={this.state.phase}
                    players={this.state.players}
                    round={this.state.round}
                    score={this.state.score}
                    sendBlobToFirebase={this.sendBlobToFirebase}
                    setDrawingPlayer={this.setDrawingPlayer}
                    updateFirebase={this.updateFirebase}
                />
            </div>
        );
    }
}
