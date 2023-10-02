export const CellState = {
    Alive: 1,
    Dead: 0
}

export class World {
    #cells = []

    constructor(width, height) {
        this.width = width
        this.height = height
        this.flush()
    }

    flush() {
        this.#cells = []
        for (let i = 0; i < this.width; i++) {
            let column = []
            for (let j = 0; j < this.height; j++) {
                column.push(CellState.Dead)
            }
            this.#cells.push(column)
        }
    }

    computeNext() {
        let newCells = []
        for (let col = 0; col < this.width; col++) {
            let column = []
            for (let row = 0; row < this.height; row++) {
                let neighboors = 0
                neighboors += this.#cells[(col + this.width - 1) % this.width][(row + this.height - 1) % this.height]
                neighboors += this.#cells[(col + this.width) % this.width][(row + this.height - 1) % this.height]
                neighboors += this.#cells[(col + this.width + 1) % this.width][(row + this.height - 1) % this.height]
                neighboors += this.#cells[(col + this.width - 1) % this.width][(row + this.height) % this.height]
                neighboors += this.#cells[(col + this.width + 1) % this.width][(row + this.height) % this.height]
                neighboors += this.#cells[(col + this.width - 1) % this.width][(row + this.height + 1) % this.height]
                neighboors += this.#cells[(col + this.width) % this.width][(row + this.height + 1) % this.height]
                neighboors += this.#cells[(col + this.width + 1) % this.width][(row + this.height + 1) % this.height]

                if (this.#cells[col][row] === CellState.Dead) {
                    if (neighboors === 3) {
                        column.push(CellState.Alive)
                    } else {
                        column.push(CellState.Dead)
                    }
                } else {
                    if (neighboors >= 2 && neighboors <= 3) {
                        column.push(CellState.Alive)
                    } else {
                        column.push(CellState.Dead)
                    }
                }
            }
            newCells.push(column)
        }

        this.#cells = newCells
    }

    getCells() {
        return this.#cells
    }

    getCell(x, y) {
        if (this.#checkCellPos(x, y)) {
            return this.#cells[x][y]
        }
    }

    setCellAlive(x, y) {
        if (this.#checkCellPos(x, y)) {
            this.#cells[x][y] = CellState.Alive
        }
    }

    setCellDead(x, y) {
        if (this.#checkCellPos(x, y)) {
            this.#cells[x][y] = CellState.Dead
        }
    }

    #checkCellPos(x, y) {
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
            console.log("Incorrect cell coordinate.")
            return false
        }
        return true
    }

}
