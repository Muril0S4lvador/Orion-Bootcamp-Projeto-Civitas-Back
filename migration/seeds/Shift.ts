import { ShiftRepository } from '../../src/repositories/ShiftRepository';

export async function seed() {
  const shiftRepository = new ShiftRepository();
  shiftRepository.save({ name: 'Manhã' });
  shiftRepository.save({ name: 'Tarde' });
  shiftRepository.save({ name: 'Noite' });
}
