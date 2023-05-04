import { Application, Assets, Sprite } from "pixi.js";
import { GameMap } from "./GameMap";

export async function setupCanvas(element: HTMLCanvasElement, wrapper: HTMLDivElement) {
  // The application will create a renderer using WebGL, if possible,
  // with a fallback to a canvas render. It will also setup the ticker
  // and the root stage PIXI.Container
  const app = new Application({
    view: element,
    resizeTo: wrapper,
  });

  globalThis.__PIXI_APP__ = app;

  // The application will create a canvas element for you that you
  // can then insert into the DOM
  //@ts-ignore
  document.body.appendChild(app.view);

  const map = new GameMap();
  app.stage.addChild(map);

  // Listen for frame updates
  app.ticker.add(update);

  function update(){

  }
}


