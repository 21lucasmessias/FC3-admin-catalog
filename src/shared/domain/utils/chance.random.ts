import Chance from 'chance';
import { Random } from './random.interface';

export class ChanceRandom implements Random {
  private chance: Chance.Chance;

  constructor() {
    this.chance = Chance();
  }

  chars(length?: number): string {
    return this.chance.word({ length });
  }

  paragraphs(length?: number): string {
    return this.chance.paragraph({ sentences: length });
  }
}
