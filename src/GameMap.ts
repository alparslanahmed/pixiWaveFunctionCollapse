import { Container } from "pixi.js";
import { Cell } from "./Cell";

export class GameMap extends Container {
    public static dimensions = 50;
    public static tileWidth = 32;
    public static tileHeight = 32;

    public static tiles = ['snow', 'forest', 'land', 'sand', 'water'];

    rules: any = {
        'snow': ['snow', 'forest'],
        'forest': ['forest', 'land', 'snow'],
        'land': ['land', 'forest', 'sand'],
        'sand': ['sand', 'land', 'water'],
        'water' : ['water', 'sand']
    }

    constructor() {
        super();
        this.width = GameMap.tileWidth * GameMap.dimensions;
        this.height = GameMap.tileHeight * GameMap.dimensions;
        this.createCells(GameMap.dimensions);
        this.walkCells();
    }

    createCells(dimension: number) {
        for (let x = 0; x < dimension; x++) {
            for (let y = 0; y < dimension; y++) {
                let newCell = new Cell(x * GameMap.tileWidth, y * GameMap.tileHeight);
                this.addChild(newCell)
            }
        }
    }

    walkCells() {
        for (let x = 0; x < GameMap.dimensions; x++) {
            for (let y = 0; y < GameMap.dimensions; y++) {
                const currentcell = this.children[x * GameMap.dimensions + y] as Cell;
                currentcell.collapse();

                const topCell = this.children[(x - 1) * GameMap.dimensions + y] as Cell;

                if (topCell) {
                    topCell.filterPossibilities(this.rules[currentcell.textureType]);
                }

                const rightCell = this.children[x * GameMap.dimensions + y + 1] as Cell;

                if (rightCell) {
                    rightCell.filterPossibilities(this.rules[currentcell.textureType]);
                }

                const bottomCell = this.children[(x + 1) * GameMap.dimensions + y] as Cell;

                if (bottomCell) {
                    bottomCell.filterPossibilities(this.rules[currentcell.textureType]);
                }

                const leftCell = this.children[x * GameMap.dimensions + y - 1] as Cell;

                if (leftCell) {
                    leftCell.filterPossibilities(this.rules[currentcell.textureType]);
                }

            }
        }
    }
}