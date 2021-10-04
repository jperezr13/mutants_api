import { ApiProperty } from '@nestjs/swagger'

export class MutantDto {
    @ApiProperty()
    readonly dna: string;

    @ApiProperty()
    readonly isMutant: boolean;
    
    @ApiProperty()
    readonly quantity: number;

    constructor(dna: string, isMutant: boolean, quantity: number) {
        this.dna = dna;
        this.isMutant = isMutant;
        this.quantity = quantity;
    }
}