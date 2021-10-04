import { Body, Controller, Get, HttpStatus, Inject, Post, Res } from '@nestjs/common';

import { StatsDto } from '../dto/stats-dto';
import { MutantsService } from '../services/mutants.service';

@Controller()
export class MutantsController {

    constructor(
        @Inject(MutantsService)
        private mutantsService: MutantsService
    ) {

    }

    @Post('mutant')
    async validateMutant(@Body('dna') dna: string[], @Res() response): Promise<{ message: string }> {
        try {
            var isMutant = await this.mutantsService.isMutant(dna)
            if (isMutant) {
                return response.status(HttpStatus.OK).json({ message: `This is a Mutant` })
            } else {
                return response.status(HttpStatus.FORBIDDEN).json({ message: `This is a Human` })
            }
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({ message: `An error ocurred -> ${err.message}` })
        }
    }

    @Get('stats')
    async getStats(@Res() response): Promise<StatsDto> {
        try {
            const stats = await this.mutantsService.getAllStats()
            return response.status(HttpStatus.OK).json(stats)
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({ message: `An error ocurred -> ${err.message}` })
        }
    }
}
