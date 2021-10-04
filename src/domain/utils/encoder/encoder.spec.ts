import { Encoder } from './encoder';

let encoder: Encoder

beforeEach(async () => {
    encoder = new Encoder()
});

it('should be defined', () => {
    expect(encoder).toBeDefined();
});