import { Injectable } from '@nestjs/common'
import { createHmac } from 'crypto'

@Injectable()
export class Encoder {
    sha1HashString(dna: string[]) : string {
        const pattern = "sha256"
        const secret = "abcd1234"
        const dnaString = dna.join('')
        return createHmac(pattern, secret).update(dnaString).digest('hex')
    }
}