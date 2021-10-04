import { Injectable } from "@nestjs/common";

@Injectable()
export class AnalizeDna {
    private readonly sequenceNumber: number = 2;
    constructor() {
    }

    run = (rows: string[]): boolean => {
        let sequenceNumber = this.analyzeSequence(rows, 0)
        if (sequenceNumber < this.sequenceNumber) {
            sequenceNumber = this.analyzeDifferentSides(rows, sequenceNumber)
        }
        return sequenceNumber >= this.sequenceNumber
    }

    analyzeSequence = (array: string[], sequenceNumber: number): number => {
        const inArray = this.containsSequenceChain(array)
        sequenceNumber += inArray.length
        return sequenceNumber
    }

    containsSequenceChain = (arr: string[]): string[] => {
        return arr.filter((item) => item.match(/[A]{4}|[C]{4}|[G]{4}|[T]{4}/g) != null)
    }

    analyzeDifferentSides = (rows: string[], sequenceNumber: number): number => {
        const columns = this.createColumns(rows)
        sequenceNumber = this.analyzeSequence(columns, sequenceNumber)
        if (sequenceNumber < this.sequenceNumber) {
            sequenceNumber = this.analyzeDiagonalsLeft(rows, columns, sequenceNumber)
        }
        return sequenceNumber
    }

    analyzeDiagonalsLeft = (rows: string[], columns: string[], sequenceNumber: number): number => {
        const diagonalsLeft = this.createDiagonals(rows, columns)
        sequenceNumber = this.analyzeSequence(diagonalsLeft, sequenceNumber)
        if (sequenceNumber < this.sequenceNumber) {
            sequenceNumber = this.analyzeDiagonalsRight(rows.reverse(), columns.reverse(), sequenceNumber)
        }
        return sequenceNumber
    }

    analyzeDiagonalsRight = (rows: string[], columns: string[], sequenceNumber: number): number => {
        const diagonalsRight = this.createDiagonals(rows, columns.reverse())
        sequenceNumber = this.analyzeSequence(diagonalsRight, sequenceNumber)
        return sequenceNumber
    }

    createColumns = (dna: string[]): string[] => {
        const size = dna[0].length
        let columns: string[] = new Array()
        for (var i = 0; i < size; i++) {
            let column = ""
            dna.map((item) => column += item.charAt(i))
            columns.push(column)
        }
        return columns
    }

    createDiagonals = (filas: string[], columnas: string[]): string[] => {
        const size = filas[0].length
        const minus = size >= 4 ? 4 : 0
        const sizeDiagonal = size - minus
        let diagonals: string[] = new Array()
        for (var i = 0; i <= sizeDiagonal; i++) {
            let contador = i
            var limit = size
            this.createBothDiagonals(contador, filas, limit, diagonals)
            if (i > 0) {
                contador = i
                this.createBothDiagonals(contador, columnas, limit, diagonals)
            }

        }
        return diagonals
    }

    createBothDiagonals = (contador: number, array: string[], limit: number, diagonals: string[]): string[] => {
        let column = ""
        array.map((item) => {
            if (contador < limit) {
                column += item.charAt(contador)
            }
            contador++
        })
        diagonals.push(column)
        return diagonals
    }
}