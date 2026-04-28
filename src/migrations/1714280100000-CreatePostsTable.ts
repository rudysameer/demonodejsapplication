import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class CreatePostsTable1714280100000 implements MigrationInterface {
    name = "CreatePostsTable1714280100000";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "posts",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    { name: "title", type: "varchar", length: "255" },
                    { name: "body", type: "text" },
                    { name: "published", type: "boolean", default: false },
                    { name: "authorId", type: "int", isNullable: true },
                    { name: "createdAt", type: "timestamp", default: "now()" },
                    { name: "updatedAt", type: "timestamp", default: "now()" },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            "posts",
            new TableForeignKey({
                columnNames: ["authorId"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("posts");
        if (table) {
            const fk = table.foreignKeys.find((fk) =>
                fk.columnNames.includes("authorId")
            );
            if (fk) await queryRunner.dropForeignKey("posts", fk);
        }
        await queryRunner.dropTable("posts");
    }
}
