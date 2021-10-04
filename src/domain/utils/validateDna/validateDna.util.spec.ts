import { ValidateDna } from './validateDna.utils';

let validateDna: ValidateDna

beforeEach(async () => {
    validateDna = new ValidateDna()
});

it('should be defined', () => {
    expect(validateDna).toBeDefined();
});

it('should return false when size dna is less than 2', () => {
    const dna = ['A']
    expect(validateDna.isValid(dna)).toBe(false);
});

it('should return false when dna is not NxN', () => {
    const dna = ['AGT', 'AG', 'AGT']
    expect(validateDna.isValid(dna)).toBe(false);
});

it('should return false when dna is contains different letter than AGCT', () => {
    const dna = ['AGT', 'AGM', 'AGT']
    expect(validateDna.isValid(dna)).toBe(false);
});

it('should return true', () => {
    const dna = ['AGTC', 'AGGG', 'ATCG', 'ATGT']
    expect(validateDna.isValid(dna)).toBe(true);
});