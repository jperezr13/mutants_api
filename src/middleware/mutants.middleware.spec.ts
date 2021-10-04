import { MutantsMiddleware } from './mutants.middleware';

describe('MutantsMiddleware', () => {
  it('should be defined', () => {
    expect(new MutantsMiddleware()).toBeDefined();
  });
});
