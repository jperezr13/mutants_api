import { ApiProperty } from '@nestjs/swagger'

export class StatsDto {
    @ApiProperty()
    readonly count_mutant_dna: number;

    @ApiProperty()
    readonly count_human_dna: number;
    
    @ApiProperty()
    readonly ratio: number;

    constructor(count_mutant_dna: number, count_human_dna: number) {
        this.count_mutant_dna = count_mutant_dna;
        this.count_human_dna = count_human_dna;
        this.ratio = count_human_dna == 0 ? 0 : count_mutant_dna / count_human_dna
    }
}