import { Play } from "./play-module.js";
 
document.addEventListener("DOMContentLoaded", function() {
 
   document.querySelector("#interfaces").style.display = "none";
 
   // lifted to outer scope so all listeners can access them
   let currentAct   = null;
   let currentScene = null;
   let currentPlay  = null;
 
   // --- Event Listeners (registered once) ---
 
   document.querySelector("#playList").addEventListener('change', () => {
      if (document.querySelector("#playList").value != 0) {
         loadPlayData(document.querySelector("#playList").value);
      }
   });
 
   document.querySelector("#actList").addEventListener('change', () => {
      var index = document.querySelector("#actList").selectedIndex;
      if (index < 0) index = 0;
      currentAct = currentPlay.acts[index];
      populateSceneSelect(currentAct);
      resetFilters();
      const actContainer   = document.querySelector("article#actHere h3");
      const sceneContainer = document.querySelector("div#sceneHere");
      currentAct.output(actContainer, sceneContainer);
   });
 
   document.querySelector("#sceneList").addEventListener('change', () => {
      var index = document.querySelector("#sceneList").selectedIndex;
      if (index < 0) index = 0;
      currentScene = currentAct.scenes[index];
      resetFilters();
      const sceneContainer = document.querySelector("div#sceneHere");
      currentScene.output(sceneContainer);
   });
 
   document.querySelector("#btnHighlight").addEventListener('click', () => {
      const search         = document.querySelector("#txtHighlight").value;
      const player         = document.querySelector("#playerList").value;
      const sceneContainer = document.querySelector("div#sceneHere");
 
      sceneContainer.innerHTML = "";
      const scene = currentAct.scenes.find(s => s.name == document.querySelector("#sceneList").value);
      if (scene) {
         scene.output(sceneContainer, search, player);
      } else {
         currentAct.scenes.forEach(s => {
            s.output(sceneContainer, search, player);
         });
      }
   });
 
   // --- Functions ---
 
   async function loadPlayData(filename) {
      const url      = 'https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php';
      const response = await fetch(url + '?name=' + filename);
      const data     = await response.json();
 
      currentPlay = new Play(data);
      setupInterface(currentPlay);
   }
 
   function setupInterface(play) {
      const playContainer  = document.querySelector("section#playHere h2");
      const actContainer   = document.querySelector("article#actHere h3");
      const sceneContainer = document.querySelector("div#sceneHere");
 
      // show interface and reset display
      document.querySelector("#interfaces").style.display = "block";
      playContainer.textContent  = "";
      actContainer.textContent   = "";
      sceneContainer.textContent = "";
 
      // set current act and scene
      currentAct   = play.acts[0];
      currentScene = play.acts[0].scenes[0];
 
      // populate selects
      populatePlayerSelect(play.players);
      populateActSelect(play.acts);
      populateSceneSelect(currentAct);
 
      // output initial play content
      play.output(playContainer, actContainer, sceneContainer);
   }
 
});
 
 
function resetFilters() {
   document.querySelector("#txtHighlight").value = "";
   document.querySelector("#playerList").value   = 0;
}
 
function populatePlayerSelect(players) {
   document.querySelector("#playerList").innerHTML = `<option value=0>All Players</option>`;
   players.forEach(p => {
      const opt = document.createElement('option');
      opt.textContent = p.player;
      document.querySelector("#playerList").appendChild(opt);
   });
}
 
function populateActSelect(acts) {
   document.querySelector("#actList").innerHTML = "";
   acts.forEach(a => {
      const opt = document.createElement('option');
      opt.textContent = a.name;
      document.querySelector("#actList").appendChild(opt);
   });
}
 
function populateSceneSelect(act) {
   document.querySelector("#sceneList").innerHTML = "";
   act.scenes.forEach(s => {
      const opt = document.createElement('option');
      opt.textContent = s.name;
      document.querySelector("#sceneList").appendChild(opt);
   });
}