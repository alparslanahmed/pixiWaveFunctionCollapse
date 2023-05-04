import { Container } from "pixi.js";
import { Cell } from "./Cell";
import * as perlin from 'perlin-noise';

export class PerlinMap extends Container {
    public static dimensions = 100;
    public static tileWidth = 32;
    public static tileHeight = 32;

    public static tiles = ['water', 'sand', 'land', 'forest', 'snow'];

    rules: any = {
        'snow': ['snow', 'forest'],
        'forest': ['forest', 'land', 'snow'],
        'land': ['land', 'forest', 'sand'],
        'sand': ['sand', 'land', 'water'],
        'water': ['water', 'sand']
    }

    constructor() {
        super();
        this.width = PerlinMap.tileWidth * PerlinMap.dimensions;
        this.height = PerlinMap.tileHeight * PerlinMap.dimensions;
        this.createCells(PerlinMap.dimensions);
    }

    createCells(dimension: number) {
        const noise2D = perlin.generatePerlinNoise(PerlinMap.dimensions, PerlinMap.dimensions, { octaveCount: 3, amplitude: 1, persistence: 0.5 });
        for (let x = 0; x < dimension; x++) {
            for (let y = 0; y < dimension; y++) {
                const level = Math.abs(Math.floor(noise2D[y * PerlinMap.dimensions + PerlinMap.dimensions + x] * (PerlinMap.tiles.length - 1)));
                let newCell = new Cell(x * PerlinMap.tileWidth, y * PerlinMap.tileHeight);
                newCell.possibilites = [PerlinMap.tiles[level]];
                newCell.collapse();
                this.addChild(newCell);
            }
        }
    }

}