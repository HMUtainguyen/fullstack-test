import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrationNameHere1694244184319 implements MigrationInterface {
    name = 'migrationNameHere1694244184319';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`products\`.\`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`category\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`products\`.\`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`password\` varchar(255) NOT NULL, \`username\` varchar(200) NOT NULL, \`roles\` text NOT NULL, \`isAccountDisabled\` tinyint NOT NULL, \`email\` varchar(200) NOT NULL, \`createdAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`username\` (\`username\`), UNIQUE INDEX \`email\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP INDEX \`email\` ON \`products\`.\`users\``,
        );
        await queryRunner.query(
            `DROP INDEX \`username\` ON \`products\`.\`users\``,
        );
        await queryRunner.query(`DROP TABLE \`products\`.\`users\``);
        await queryRunner.query(`DROP TABLE \`products\`.\`products\``);
    }
}
