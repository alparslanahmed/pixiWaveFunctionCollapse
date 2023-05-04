import { Sprite, Texture } from "pixi.js";
import { GameMap } from "./GameMap";

export class Tile extends Sprite {
    constructor() {
        super();
        this.texture = Texture.from(`water.png`);
        this.x = 0;
        this.y = 0;
        this.width = GameMap.tileWidth;
        this.height = GameMap.tileHeight;
    }
}