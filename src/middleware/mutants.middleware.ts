import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ValidateDna } from '../domain/utils/validateDna/validateDna.utils';

@Injectable()
export class MutantsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const dna = req.body.dna
    if (!Array.isArray(dna) || !new ValidateDna().isValid(dna)) {
      res.status(HttpStatus.BAD_REQUEST).send({
        message: 'The dna you want to analyze is not valid',
      })
      return;
    }
    next();
  }  
}