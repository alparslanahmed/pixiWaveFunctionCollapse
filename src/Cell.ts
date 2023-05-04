import { Container, Texture } from "pixi.js";
import { Tile } from "./Tile";
import { GameMap } from "./GameMap";

export class Cell extends Container {
    collapsed = false;
    textureType = 'water';
    possibilites = [...GameMap.tiles];

    constructor(x: number, y: number) {
        super();
        this.addChild(new Tile());

        this.x = x;
        this.y = y;

        this.width = GameMap.tileWidth;
        this.height = GameMap.tileHeight;
    }

    collapse() {
        if (this.collapsed) { return false }

        this.collapsed = true;
        const randomTexture = this.possibilites[Math.floor(Math.random() * this.possibilites.length)];
        const child = this.children[0] as Tile;
        child.texture = Texture.from(`${randomTexture}.png`);
        this.textureType = randomTexture;
    }

    filterPossibilities(possibles: any) {
        this.possibilites = this.possibilites.filter((possibility: any) => {
            return possibles.includes(possibility);
        });

    }
}