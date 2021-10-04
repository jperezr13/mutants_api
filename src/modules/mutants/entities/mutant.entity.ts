import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Mutant {
    @PrimaryColumn()
    @Column({ primary: true })
    readonly dna: string;

    @Column()
    readonly isMutant: boolean;

    @Column()
    readonly quantity: number;

    constructor(dna: string, isMutant: boolean, quantity: number) {
        this.dna = dna;
        this.isMutant = isMutant;
        this.quantity = quantity;
    }
}
