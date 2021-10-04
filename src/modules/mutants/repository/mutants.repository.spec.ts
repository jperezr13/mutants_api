import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm';

import { Mutant } from '../entities/mutant.entity';
import { MutantsRepository } from './mutants.repository';
import { MutantDto } from '../dto/mutant-dto';

describe('Mutant Repository', () => {
    let repository: MutantsRepository
    const mockedRepo = {
        findOne: jest.fn((dna: string) => Promise.resolve(Mutant)),
        find: jest.fn(() => Promise.resolve({Mutant})),
        save: jest.fn((mutant: Mutant) => Promise.resolve(Mutant)),
      };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MutantsRepository,
                { provide: getRepositoryToken(Mutant), useValue: mockedRepo },
            ]
        }).compile()

        repository = module.get<MutantsRepository>(MutantsRepository)
    })

    it('should be defined', () => {
        expect(repository).toBeDefined()
    })

    it('Shold be call repository create ', () => {
        const mutantDto = new MutantDto("1234abcd", true, 1)
        const create = jest.spyOn(mockedRepo, 'save')

        repository.createOrUpdateMutant(mutantDto).then(() => {
            expect(create).toHaveBeenCalled()
        })
    })

    it('Shold be call repository findOne ', () => {
        const mutantDto = new MutantDto("1234abcd", true, 1)
        const findOne = jest.spyOn(mockedRepo, 'findOne')

        repository.createOrUpdateMutant(mutantDto).then(() => {
            expect(findOne).toHaveBeenCalled()
        })
    })

    it('Shold be call repository find ', () => {
        const mutantDto = new MutantDto("1234abcd", true, 1)
        const find = jest.spyOn(mockedRepo, 'find')

        repository.createOrUpdateMutant(mutantDto).then(() => {
            expect(find).toHaveBeenCalled()
        })
    })
})