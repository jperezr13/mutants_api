import { Injectable } from '@nestjs/common';

import { MutantsRepository } from '../repository/mutants.repository';
import { StatsDto } from '../dto/stats-dto';
import { MutantDto } from '../dto/mutant-dto';
import { AnalizeDna } from '../../../domain/utils/analyzeDna/analyzeDna.utils';
import { Encoder } from '../../../domain/utils/encoder/encoder';

@Injectable()
export class MutantsService {
    constructor(
        private mutantsRepository: MutantsRepository,
        private encoder: Encoder,
        private analizeDna: AnalizeDna
    ) {

    }

    isMutant = async (dna: string[]): Promise<boolean> => {
        var hash = this.encoder.sha1HashString(dna)
        var mutant = await this.mutantsRepository.getMutantByDna(hash)
        if (!mutant) {
            const isMutant = dna.length > 3 ? this.analizeDna.run(dna) : false;
            mutant = await this.mutantsRepository.createOrUpdateMutant(new MutantDto(hash, isMutant, 1))
        } else {
            mutant = await this.mutantsRepository.createOrUpdateMutant(new MutantDto(mutant.dna, mutant.isMutant, mutant.quantity + 1))
        }
        return mutant.isMutant;
    }

    getAllStats = async (): Promise<StatsDto> => {
        const data = await this.mutantsRepository.getAll();
        const mutants = data.filter((item) => item.isMutant).length
        const humans = data.length - mutants
        return new StatsDto(mutants, humans)
    }
}
