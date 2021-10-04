import { Test, TestingModule } from '@nestjs/testing';

import { MutantsService } from './mutants.service';
import { MutantsRepository } from '../repository/mutants.repository';
import { Mutant } from '../entities/mutant.entity';
import { Encoder } from '../../../domain/utils/encoder/encoder';
import { AnalizeDna } from '../../../domain/utils/analyzeDna/analyzeDna.utils';
import { StatsDto } from '../dto/stats-dto';

describe('MutantsService', () => {
  let mutantsService: MutantsService
  let mutantsRepository: MutantsRepository;
  let encoder: Encoder;
  let analizeDna: AnalizeDna;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MutantsService,
        {
          provide: MutantsRepository,
          useValue: {
            getMutantByDna: async () => {
              return Promise.resolve(Mutant)
            },
            createOrUpdateMutant: async () => {
              return Promise.resolve(Mutant)
            },
            getAll: async () => {
              return Promise.resolve({ Mutant })
            }
          }
        },
        {
          provide: Encoder,
          useValue: {
            sha1HashString: () => {
              return "1234abcd"
            }
          }
        },
        {
          provide: AnalizeDna,
          useValue: {
            run: () => {
              return true
            }
          }
        }
      ],
    }).compile();

    mutantsService = module.get<MutantsService>(MutantsService);
    mutantsRepository = module.get<MutantsRepository>(MutantsRepository);
    encoder = module.get<Encoder>(Encoder);
    encoder = module.get<Encoder>(Encoder);
    analizeDna = module.get<AnalizeDna>(AnalizeDna);
  });

  it('should be defined', () => {
    expect(mutantsService).toBeDefined();
  });

  describe("isMutant test", () => {
    it("should return true when convert dna to hash and finding this hash because this mutant already exist", async () => {
      const hash = "1234abcd"
      const mutant = new Mutant(hash, true, 1)
      jest.spyOn(encoder, 'sha1HashString').mockImplementation(() => hash)
      jest.spyOn(mutantsRepository, 'getMutantByDna').mockImplementation(() => Promise.resolve(mutant))
      jest.spyOn(mutantsRepository, 'createOrUpdateMutant').mockImplementation(() => Promise.resolve(mutant))
      const dna = [
        'ATGCGA',
        'CAGTGC',
        'TTATTT',
        'AGACGG',
        'GCGTCA',
        'TCACTG'
      ]
      expect(await mutantsService.isMutant(dna)).toBe(true)
      expect(encoder.sha1HashString).toHaveBeenCalled()
    })

    it("should return false when convert dna to hash and finding this dna because this human already exist", async () => {
      const hash = "1234abcd"
      var mutant = new Mutant(hash, false, 1)
      jest.spyOn(encoder, 'sha1HashString').mockImplementation(() => hash)
      jest.spyOn(mutantsRepository, 'getMutantByDna').mockImplementation(() => Promise.resolve(mutant))
      jest.spyOn(mutantsRepository, 'createOrUpdateMutant').mockImplementation(() => Promise.resolve(mutant))
      const dna = [
        'ATGCGA',
        'CAGTGC',
        'TTATTT',
        'AGACGG',
        'GCGTCA',
        'TCACTG'
      ]
      expect(await mutantsService.isMutant(dna)).toBe(false)
    })

    it("should return true when convert dna to hash and analyzing this dna", async () => {
      const hash = "1234abcd"
      var mutant = new Mutant(hash, true, 1)
      jest.spyOn(encoder, 'sha1HashString').mockImplementation(() => hash)
      jest.spyOn(mutantsRepository, 'getMutantByDna').mockImplementation(() => Promise.resolve(null))
      jest.spyOn(analizeDna, 'run').mockImplementation(() => true)
      jest.spyOn(mutantsRepository, 'createOrUpdateMutant').mockImplementation(() => Promise.resolve(mutant))
      const dna = [
        'ATGCGA',
        'CAGTGC',
        'TTATTT',
        'AGACGG',
        'GCGTCA',
        'TCACTG'
      ]
      expect(await mutantsService.isMutant(dna)).toBe(true)
    })

    it("should return false when convert dna to hash and analyzing this dna", async () => {
      const hash = "1234abcd"
      var mutant = new Mutant(hash, false, 1)
      jest.spyOn(encoder, 'sha1HashString').mockImplementation(() => hash)
      jest.spyOn(mutantsRepository, 'getMutantByDna').mockImplementation(() => Promise.resolve(null))
      jest.spyOn(analizeDna, 'run').mockImplementation(() => true)
      jest.spyOn(mutantsRepository, 'createOrUpdateMutant').mockImplementation(() => Promise.resolve(mutant))
      const dna = [
        'ATGCGA',
        'CAGTGC',
        'TTATTT',
        'AGACGG',
        'GCGTCA',
        'TCACTG'
      ]
      expect(await mutantsService.isMutant(dna)).toBe(false)
    })

    it("should return false when size dna is less than four ", async () => {
      const hash = "1234abcd"
      var mutant = new Mutant(hash, false, 1)
      jest.spyOn(encoder, 'sha1HashString').mockImplementation(() => hash)
      jest.spyOn(mutantsRepository, 'getMutantByDna').mockImplementation(() => Promise.resolve(null))
      const run = jest.spyOn(analizeDna, 'run')
      jest.spyOn(mutantsRepository, 'createOrUpdateMutant').mockImplementation(() => Promise.resolve(mutant))
      const dna = [
        'ATG',
        'CAG',
        'TTA',
      ]
      expect(await mutantsService.isMutant(dna)).toBe(false)
      expect(run).toBeCalledTimes(0)
    })
  })

  it("should return stats when call getAll method", async () => {
    const hash = "1234abcd"
    var mutant = new Mutant(hash, true, 1)
    var human = new Mutant(hash, false, 1)
    var data = new Array<Mutant>()
    data.push(human, mutant)
    jest.spyOn(mutantsRepository, 'getAll').mockImplementation(() => Promise.resolve(data))

    expect(await mutantsService.getAllStats()).toStrictEqual(new StatsDto(1, 1))
  })
});