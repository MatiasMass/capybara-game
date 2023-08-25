import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { game } from "./game.js";

document.querySelector("#app").innerHTML = `
<div class="container">
  <div id="canvas">
  </div>
</div>
`;

game(document.querySelector("#canvas"));
