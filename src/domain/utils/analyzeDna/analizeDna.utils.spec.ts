import { AnalizeDna } from './analyzeDna.utils';

const dnaInvalid = [
    'ATGCGA',
    'CAGTGC',
    'TTATTT',
    'AGACGG',
    'GCGTCA',
    'TCACTG'
]

const dnaValid = [
    'ATGCGA',
    'CAGTGC',
    'TTATGT',
    'AGAAGG',
    'CCCCTA',
    'TCACTG'
]

let analizeDna: AnalizeDna

beforeEach(async () => {
    analizeDna = new AnalizeDna()
});

it('should be defined', () => {
    expect(analizeDna).toBeDefined();
});

describe('AnalyzeDna', () => {   

    describe("AnalyzeDna.run test", () => {
        it("should return true when the sequence number equals two in rows", () => {
            jest.spyOn(analizeDna, "analyzeSequence").mockImplementation(() => 2)
            const analyzeDifferentSides = jest.spyOn(analizeDna, "analyzeDifferentSides")
            expect(analizeDna.run(dnaValid)).toBe(true)
            expect(analizeDna.analyzeSequence).toBeCalledTimes(1)
            expect(analyzeDifferentSides).toBeCalledTimes(0)
        })

        it("should return true when the sequence number equals tow when validating rows, columns, and diagonals", () => {
            jest.spyOn(analizeDna, "analyzeSequence").mockImplementation(() => 1)
            jest.spyOn(analizeDna, "analyzeDifferentSides").mockImplementation(() => 2)
            expect(analizeDna.run(dnaValid)).toBe(true)
            expect(analizeDna.analyzeSequence).toBeCalledTimes(1)
            expect(analizeDna.analyzeDifferentSides).toBeCalledTimes(1)
        })

        it("should return false when the sequence number equals one when validating rows, columns, and diagonals", () => {
            jest.spyOn(analizeDna, "analyzeSequence").mockImplementation(() => 1)
            jest.spyOn(analizeDna, "analyzeDifferentSides").mockImplementation(() => 1)
            expect(analizeDna.run(dnaValid)).toBe(false)
            expect(analizeDna.analyzeSequence).toBeCalledTimes(1)
            expect(analizeDna.analyzeDifferentSides).toBeCalledTimes(1)
        })

        it("should return true when passing valid dna for mutant only in rows", () => {
            const dnaRows = [
                'AAAAGA',
                'CAGTGC',
                'TTATTT',
                'AGGGGG',
                'GCGTCA',
                'TCACTG'
            ]

            jest.spyOn(analizeDna, "analyzeDifferentSides").mockImplementation(() => 1)

            expect(analizeDna.run(dnaRows)).toBe(true)
            expect(analizeDna.analyzeDifferentSides).toBeCalledTimes(0)
        })

        it("should return true when passing valid dna for mutant in rows and Diagonals", () => {
            expect(analizeDna.run(dnaValid)).toBe(true)
        })

        it("should return false when passing invalid dna for mutant in rows and Diagonals", () => {
            expect(analizeDna.run(dnaInvalid)).toBe(false)
        })
    })

    it("test analyzeSequence should return the pattern number of characteres to match plus the initial sequence", () => {
        jest.spyOn(analizeDna, "containsSequenceChain").mockImplementation(() => ["CCCC"])
        expect(analizeDna.analyzeSequence(dnaValid, 1)).toBe(2)
    })

    it("test  should return array with the characteres to match", () => {
        const result = ["CCCCTA"]
        expect(analizeDna.containsSequenceChain(dnaValid)).toStrictEqual(result)
    })

    it("test containsSequenceChain should return Empty array", () => {
        const result = []
        expect(analizeDna.containsSequenceChain(dnaInvalid)).toStrictEqual(result)
    })

    describe('AnalyzeDna.analyzeDifferentSides test', () => {
        it("should return true when the sequence number equals two in colums", () => {
            const colums = ['AAAA', 'TTTT', 'CCCC', 'GGGG']
            jest.spyOn(analizeDna, "createColumns").mockImplementation(() => colums)
            jest.spyOn(analizeDna, "analyzeSequence").mockImplementation(() => 2)
            const analyzeDiagonalsLeft = jest.spyOn(analizeDna, "analyzeDiagonalsLeft")

            expect(analizeDna.analyzeDifferentSides(dnaValid, 0)).toBe(2)
            expect(analyzeDiagonalsLeft).toBeCalledTimes(0)
        })

        it("should return true when the sequence number equals two in diagonal", () => {
            const colums = ['AAAA', 'TTTT', 'CCCC', 'GGGG']
            jest.spyOn(analizeDna, "createColumns").mockImplementation(() => colums)
            jest.spyOn(analizeDna, "analyzeSequence").mockImplementation(() => 1)
            jest.spyOn(analizeDna, "analyzeDiagonalsLeft").mockImplementation(() => 2)

            expect(analizeDna.analyzeDifferentSides(dnaValid, 0)).toBe(2)
            expect(analizeDna.analyzeDiagonalsLeft).toBeCalledTimes(1)
        })
    })
    
    describe('AnalyzeDna.analyzeDiagonalsLeft test', () => {
        it("should return true when the sequence number equals two in left diagonals", () => {
            const diagonalsLeft = ['AAAA', 'TTTT', 'CCCC', 'GGGG']
            jest.spyOn(analizeDna, "createDiagonals").mockImplementation(() => diagonalsLeft)
            jest.spyOn(analizeDna, "analyzeSequence").mockImplementation(() => 2)
            const analyzeDiagonalsRight = jest.spyOn(analizeDna, "analyzeDiagonalsRight")

            expect(analizeDna.analyzeDifferentSides(dnaValid, 0)).toBe(2)
            expect(analyzeDiagonalsRight).toBeCalledTimes(0)
        })

        it("should return true when the sequence number equals two in other diagonal", () => {
            const colums = ['AAAA', 'TTTT', 'CCCC', 'GGGG']
            jest.spyOn(analizeDna, "createColumns").mockImplementation(() => colums)
            jest.spyOn(analizeDna, "analyzeSequence").mockImplementation(() => 1)
            jest.spyOn(analizeDna, "analyzeDiagonalsRight").mockImplementation(() => 2)

            expect(analizeDna.analyzeDifferentSides(dnaValid, 0)).toBe(2)
            expect(analizeDna.analyzeDiagonalsRight).toBeCalledTimes(1)
        })
    })

    describe('AnalyzeDna.analyzeDiagonalsRight test', () => {
        it("should return true when the sequence number equals two in right diagonals", () => {
            const diagonalsRight = ['AAAA', 'TTTT', 'CCCC', 'GGGG']
            jest.spyOn(analizeDna, "createDiagonals").mockImplementation(() => diagonalsRight)
            jest.spyOn(analizeDna, "analyzeSequence").mockImplementation(() => 2)

            expect(analizeDna.analyzeDifferentSides(dnaValid, 0)).toBe(2)
        })
    })

    it("Should return columns created from rows", () => {
        var rows = ['ACGT', 'TGCA', 'CAGT', 'GTCA']
        var columns = ['ATCG', 'CGAT', 'GCGC', 'TATA']

        expect(analizeDna.createColumns(rows)).toStrictEqual(columns)
    })

    it("Should return one diagonal created from rows", () => {
        var rows = ['ACGT', 'TGCA', 'CAGT', 'GTCA']
        var columns = ['ATCG', 'CGAT', 'GCGC', 'TATA']
        var diagonal = ['AGGA']
        expect(analizeDna.createDiagonals(rows, columns)).toStrictEqual(diagonal)
    })

    it("Should return three diagonals created from rows", () => {
        var rows = ['ACGTA', 'TGCAT', 'CAGTC', 'GTCAG', 'GTACA']
        var columns = ['ATCGG', 'CGATT', 'GCGCA', 'TATAC', 'ATCGA']
        var diagonal = ['AGGAA', 'CCTG', 'TACC']
        expect(analizeDna.createDiagonals(rows, columns)).toStrictEqual(diagonal)
    })

    it("Should return one diagonal created from array", () => {
        var rows = ['ACGT', 'TGCA', 'CAGT', 'GTCA']
        var diagonal = ['AGGA']
        expect(analizeDna.createBothDiagonals(0, rows, rows.length, [])).toStrictEqual(diagonal)
    })

});