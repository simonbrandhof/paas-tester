import { MigrationInterface, QueryRunner } from 'typeorm';

export abstract class BaseMigration implements MigrationInterface {
  down(queryRunner: QueryRunner): Promise<any> {
    return Promise.reject('Rollback of db migrations is unsupported');
  }

  abstract up(queryRunner: QueryRunner): Promise<any>;
}
