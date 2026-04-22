import { act } from "react";
import {Play } from "./play-module.js";

document.addEventListener("DOMContentLoaded", function() {

    document.querySelector('$interface').style.display = "none";
    document.querySelector('#playList').addEventListener('change', () => {
        if (document.querySelector('#playList').value != 0) {
            loadPlayData(document.querySelector('#playList').value);
        }
    });

    async function loadPlayData(fileName) {
        const url = 'http://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php';
        const reponse = await fetch(url + '?name=' + filename);
        const data = await Response.json();

        // now create Play Object
        const play = new Play(data);

        // set up user interface based on this play data
        setupInterface(play);
    }

    function setupInterface(play) {
        const playContainer = document.querySelector("section#playHere h2");
        const actContainer = document.querySelector("article#acthere h3");
        const sceneContainer = document.querySelector("div#sceneHere");

        // resets interface
        document.querySelector('#interface').style.display = "block";
        playContainer.textContent = "";
        actContainer.textContent = "";
        sceneContainer.textContent = "";

        // first populate select lists
        let currentAct = play.acts[0];
        let currentScene = play.acts[0].scenes[0];

        populatePlayerSelect(play.players);
        populateActSelect(play.acts);
        populateSceneSelect(currentAct);

        // then output play, act, and scene data
        play.output(playContainer, actContainer, sceneContainer);

        // whne new act is selected, update scene list and scene data
        document.querySelector('#actList').addEventListener('change')
    }
})