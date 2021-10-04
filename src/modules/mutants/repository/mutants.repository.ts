import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Mutant } from '../entities/mutant.entity';
import { MutantDto } from '../dto/mutant-dto';

@Injectable()
export class MutantsRepository {
    constructor(
        @InjectRepository(Mutant)
        private readonly mutantRepository: Repository<Mutant>
    ) {

    }

    createOrUpdateMutant = async (mutantDto: MutantDto): Promise<Mutant> => {
        var mutant = new Mutant(mutantDto.dna, mutantDto.isMutant, mutantDto.quantity)
        return await this.mutantRepository.save(mutant);
    }

    getMutantByDna = async (dna: string): Promise<Mutant> => {
        return await this.mutantRepository.findOne(dna)
    }

    getAll = async (): Promise<Mutant[]> => {
        return await this.mutantRepository.find();
    }
}
