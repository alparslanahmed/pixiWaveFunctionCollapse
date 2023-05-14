import { Container, Texture, Text } from "pixi.js";
import { Tile } from "./Tile";
import { GameMap } from "./GameMap";
import weightedRand from "./WeightedRand";

export class Cell extends Container {
    collapsed = false;
    textureType = '';
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

        const possiblesWithWeight = {}

        this.possibilites.map(possible=>{
            possiblesWithWeight[possible] = GameMap.weights[possible];
        });

        const randomTexture = weightedRand(possiblesWithWeight) // Tile gelme olasiliklari elle belirlenmis

        //const randomTexture = this.possibilites[Math.floor(Math.random() * this.possibilites.length)]; // Esit olasilikla tile sec
        const child = this.children[0] as Tile;
        child.texture = Texture.from(`${randomTexture}.png`);
        this.textureType = randomTexture;
    }

    filterPossibilities(possibles: any, type='') {
        if (this.collapsed) { return false }
   
        this.possibilites = this.possibilites.filter((possibility: any) => {
            return possibles.includes(possibility);
        });
    }
}