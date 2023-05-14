import { Container } from "pixi.js";
import { Cell } from "./Cell";

export class GameMap extends Container {
    public static dimensions = 50;
    public static tileWidth = 32;
    public static tileHeight = 32;

    public static tiles = ['snow', 'forest', 'land', 'sand', 'water'];
    public static weights = {
        'snow': 0.1,
        'forest': 0.2,
        'land': 0.3,
        'sand': 0.1,
        'water': 0.3
    };

    rules: any = {
        'snow': ['snow', 'forest'],
        'forest': ['forest', 'land', 'snow'],
        'land': ['land', 'forest', 'sand'],
        'sand': ['sand', 'land', 'water'],
        'water' : ['water', 'sand'],
    }

    constructor() {
        super();
        this.width = GameMap.tileWidth * GameMap.dimensions;
        this.height = GameMap.tileHeight * GameMap.dimensions;
        this.createMap();
    }

    createMap(){
        this.removeChildren();
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

                // Tile lar en soldan baslayip, yukardan asagi dogru olusturulmaktadir.
                // Genellikle x=0, y=dimension-1 durumunda yani solda ilk siranin en sonuncu tile'ina gelindiginde o cell icin possibilities bos gelmektedir.
                // Bunun sebebi ise en sondan onceki hucreleri collapse ederken olusan cakismadir. 
                // Boyle cakisma/uyumsuzluk durumlari icin haritayi tekrar olusturmay deniyoruz. 
                if(!currentcell.possibilites.length){
                    return this.createMap();
                }

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

                const topRightCorner = this.children[(x - 1) * GameMap.dimensions + y + 1] as Cell;

                if (topRightCorner) {
                    topRightCorner.filterPossibilities(this.rules[currentcell.textureType]);
                }

                const bottomRightCorner = this.children[(x + 1) * GameMap.dimensions + y + 1] as Cell;

                if (bottomRightCorner) {
                    bottomRightCorner.filterPossibilities(this.rules[currentcell.textureType]);
                }

                const bottomLeftCorner = this.children[(x + 1) * GameMap.dimensions + y - 1] as Cell;

                if (bottomLeftCorner) {
                    bottomLeftCorner.filterPossibilities(this.rules[currentcell.textureType]);
                }

                const topLeftCorner = this.children[(x - 1) * GameMap.dimensions + y - 1] as Cell;

                if (topLeftCorner) {
                    topLeftCorner.filterPossibilities(this.rules[currentcell.textureType]);
                }
            }
        }
    }
}