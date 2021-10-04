import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';

import { MutantsService } from '../services/mutants.service';
import { MutantsController } from './mutants.controller';
import { statsMock } from '../../../../test/mocks/statsMock';
import { StatsDto } from '../dto/stats-dto';

fdescribe('MutantsController', () => {
  let mutantsController: MutantsController;
  let mutantsService: MutantsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MutantsController,
        {
          provide: MutantsService,
          useValue: {
            isMutant: async () => () => Promise.resolve(true),
            getAllStats: async () => {
              return Promise.resolve(StatsDto)
            }
          }
        }
      ],
    }).compile();

    mutantsController = module.get<MutantsController>(MutantsController);
    mutantsService = module.get<MutantsService>(MutantsService)
  });

  it('should be defined', () => {
    expect(mutantsController).toBeDefined();
  });

  describe('test validateMutant', () => {
    it('should return "This is a Mutant" and httpstatus code 200 when passing a specific mutant dna', async () => {
      jest.spyOn(mutantsService, 'isMutant').mockImplementation(() => Promise.resolve(true))
      const result = { message: 'This is a Mutant' }
      let response = {
        status: function (responseStatus) {
          expect(responseStatus).toEqual(HttpStatus.OK)

          const json = function json() {
            return result
          }
          return { json }
        }
      }

      const dna = [
        'ATGCGA',
        'CAGTGC',
        'TTATGT',
        'AGAAGG',
        'CCCCTA',
        'TCACTG'
      ]

      expect(await mutantsController.validateMutant(dna, response)).toBe(result)
    })

    it('should return "This is a Human" and httpstatus code 403 when passing a specific human dna', async () => {
      jest.spyOn(mutantsService, 'isMutant').mockImplementation(() => Promise.resolve(false))
      const result = { message: 'This is a Human' }
      let response = {
        status: function (responseStatus) {
          expect(responseStatus).toEqual(HttpStatus.FORBIDDEN)

          const json = function json() {
            return result
          }
          return { json }
        }
      }

      const dna = [
        'ATGCGA',
        'CAGTGC',
        'TTATTT',
        'AGACGG',
        'GCGTCA',
        'TCACTG'
      ]

      expect(await mutantsController.validateMutant(dna, response)).toBe(result)
    })

    it('should return an error and httpstatus code 400', async () => {
      jest.spyOn(mutantsService, 'isMutant').mockImplementation(() => Promise.resolve(false)).mockRejectedValue(new Error("Error Testing"))
      const result = { message: 'An error ocurred' }
      let response = {
        status: function (responseStatus) {
          expect(responseStatus).toEqual(HttpStatus.BAD_REQUEST)

          const json = function json() {
            return result
          }
          return { json }
        }
      }

      const dna = [
        'ATGCGA',
        'CAGTGC',
        'TTATTT',
        'AGACGG',
        'GCGTCA',
        'TCACTG'
      ]

      expect(await mutantsController.validateMutant(dna, response)).toBe(result)
    })

    it('should return stats', async () => {
      jest.spyOn(mutantsService, 'getAllStats').mockImplementation(() => Promise.resolve(new StatsDto(statsMock.countMutantDna, statsMock.countHumanDna)))

      let response = {
        status: function (responseStatus) {
          expect(responseStatus).toEqual(HttpStatus.OK)

          const json = function json() {
            return statsMock
          }
          return { json }
        }
      }

      expect(await mutantsController.getStats(response)).toEqual(statsMock)
    })
  })


});
