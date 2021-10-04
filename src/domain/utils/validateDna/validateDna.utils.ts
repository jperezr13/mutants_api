export class ValidateDna {
    isValid = (dna: string[]): boolean => {
        const sizeElements = dna.length
        if (sizeElements > 1) {
            const sizeRows = dna.filter((item) => item.length == sizeElements)
            const dnaString = dna?.join('')
            return sizeRows.length == sizeElements && dnaString.match(/[A|T|C|G]/g)?.length == dnaString.length
        }
        return false
    }
}