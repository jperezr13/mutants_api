import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MutantsController } from './controller/mutants.controller';
import { Mutant } from './entities/mutant.entity';
import { MutantsService } from './services/mutants.service';
import { MutantsRepository } from './repository/mutants.repository';
import { Encoder } from '../../domain/utils/encoder/encoder';
import { AnalizeDna } from '../../domain/utils/analyzeDna/analyzeDna.utils';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mutant])
  ],
  controllers: [MutantsController],
  providers: [MutantsService, MutantsRepository, Encoder, AnalizeDna],
})
export class MutantsModule { }
