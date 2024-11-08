import { Shift } from '../../src/entity/Shift';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class ShiftSeeder implements Seeder {
  track?: boolean;
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const shiftRepository = dataSource.getRepository(Shift);
    const shiftsToInsert = shifts.map((shift) => ({ name: shift }));
    await shiftRepository.save(shiftsToInsert);
  }
}

const shifts = ['Manhã', 'Tarde', 'Noite'];
