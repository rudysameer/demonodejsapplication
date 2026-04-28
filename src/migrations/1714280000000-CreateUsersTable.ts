import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1714280000000 implements MigrationInterface {
    name = "CreateUsersTable1714280000000";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    { name: "name", type: "varchar", length: "100" },
                    { name: "email", type: "varchar", length: "255", isUnique: true },
                    { name: "password", type: "varchar", length: "255" },
                    { name: "isActive", type: "boolean", default: true },
                    { name: "createdAt", type: "timestamp", default: "now()" },
                    { name: "updatedAt", type: "timestamp", default: "now()" },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }
}
