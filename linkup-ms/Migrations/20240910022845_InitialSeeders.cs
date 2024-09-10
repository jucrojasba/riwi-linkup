using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace linkup_ms.Migrations
{
    /// <inheritdoc />
    public partial class InitialSeeders : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Sector",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sector", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserRole",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRole", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    IsConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    SectorId = table.Column<int>(type: "integer", nullable: false),
                    RoleId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Sector_SectorId",
                        column: x => x.SectorId,
                        principalTable: "Sector",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Users_UserRole_RoleId",
                        column: x => x.RoleId,
                        principalTable: "UserRole",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Languages",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "inglés" },
                    { 2, "español" },
                    { 3, "francés" },
                    { 4, "alemán" },
                    { 5, "chino" }
                });

            migrationBuilder.InsertData(
                table: "Sector",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "tecnología" },
                    { 2, "finanzas" },
                    { 3, "salud" },
                    { 4, "educación" },
                    { 5, "manufactura" }
                });

            migrationBuilder.InsertData(
                table: "SoftSkills",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "comunicación" },
                    { 2, "trabajo en equipo" },
                    { 3, "resolución de problemas" },
                    { 4, "adaptabilidad" },
                    { 5, "creatividad" },
                    { 6, "gestión del tiempo" },
                    { 7, "liderazgo" },
                    { 8, "inteligencia emocional" },
                    { 9, "pensamiento crítico" },
                    { 10, "resolución de conflictos" }
                });

            migrationBuilder.InsertData(
                table: "TechnicalSkills",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "javaScript" },
                    { 2, "python" },
                    { 3, "java" },
                    { 4, "c#" },
                    { 5, "sql" },
                    { 6, "nextJs" },
                    { 7, "nodeJs" },
                    { 8, "docker" },
                    { 9, "aws" },
                    { 10, "machine learning" }
                });

            migrationBuilder.InsertData(
                table: "UserRole",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "administrador" },
                    { 2, "cliente" }
                });

            migrationBuilder.InsertData(
                table: "CoderSoftSkills",
                columns: new[] { "CoderId", "SoftSkillId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 2, 2 },
                    { 3, 3 },
                    { 4, 4 },
                    { 5, 5 },
                    { 6, 6 },
                    { 7, 7 },
                    { 8, 8 },
                    { 9, 9 },
                    { 10, 10 }
                });

            migrationBuilder.InsertData(
                table: "LanguageLevels",
                columns: new[] { "Id", "LanguageId", "Name" },
                values: new object[,]
                {
                    { 1, 1, "a1" },
                    { 2, 2, "a2" },
                    { 3, 3, "b1" },
                    { 4, 4, "b2" },
                    { 5, 5, "c1" },
                    { 6, 1, "c2" }
                });

            migrationBuilder.InsertData(
                table: "TechnicalSkillLevels",
                columns: new[] { "Id", "Name", "TechnicalSkillId" },
                values: new object[,]
                {
                    { 1, "junior", 1 },
                    { 2, "semi-senior", 2 },
                    { 3, "senior", 3 }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "IsConfirmed", "Name", "Password", "PhoneNumber", "RoleId", "SectorId" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 2, 15, 1, 17, 51, 0, DateTimeKind.Utc), "jackeline.cardona@example.com", true, "jackeline cardona", "riwi123", "1234567890", 1, 1 },
                    { 2, new DateTime(2024, 3, 10, 1, 17, 51, 0, DateTimeKind.Utc), "jane.smith@example.com", true, "jane smith", "riwi123", "2345678901", 2, 2 },
                    { 3, new DateTime(2024, 4, 5, 1, 17, 51, 0, DateTimeKind.Utc), "alice.johnson@example.com", true, "alice johnson", "riwi123", "3456789012", 2, 4 },
                    { 4, new DateTime(2024, 5, 20, 1, 17, 51, 0, DateTimeKind.Utc), "bob.williams@example.com", true, "bob williams", "riwi123", "4567890123", 2, 3 },
                    { 5, new DateTime(2024, 6, 25, 1, 17, 51, 0, DateTimeKind.Utc), "charlie.brown@example.com", true, "charlie brown", "riwi123", "5678901234", 2, 2 },
                    { 6, new DateTime(2024, 7, 10, 1, 17, 51, 0, DateTimeKind.Utc), "diana.clark@example.com", true, "diana clark", "riwi123", "6789012345", 2, 1 },
                    { 7, new DateTime(2024, 8, 15, 1, 17, 51, 0, DateTimeKind.Utc), "edward.davis@example.com", true, "edward davis", "riwi123", "7890123456", 2, 5 },
                    { 8, new DateTime(2024, 9, 10, 1, 17, 51, 0, DateTimeKind.Utc), "fiona.evans@example.com", true, "fiona evans", "riwi123", "8901234567", 2, 2 },
                    { 9, new DateTime(2024, 10, 5, 1, 17, 51, 0, DateTimeKind.Utc), "george.fisher@example.com", true, "george fisher", "riwi123", "9012345678", 2, 5 },
                    { 10, new DateTime(2024, 11, 1, 1, 17, 51, 0, DateTimeKind.Utc), "hannah.green@example.com", true, "hannah green", "riwi123", "0123456789", 2, 3 }
                });

            migrationBuilder.InsertData(
                table: "CoderLanguageLevels",
                columns: new[] { "CoderId", "LanguageLevelId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 2, 3 },
                    { 3, 2 },
                    { 4, 4 },
                    { 5, 5 },
                    { 6, 2 },
                    { 7, 3 },
                    { 8, 4 },
                    { 9, 6 },
                    { 10, 3 }
                });

            migrationBuilder.InsertData(
                table: "CoderTechnicalSkillLevels",
                columns: new[] { "CoderId", "TechnicalSkillLevelId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 2, 3 },
                    { 3, 2 },
                    { 4, 1 },
                    { 5, 3 },
                    { 6, 2 },
                    { 7, 3 },
                    { 8, 1 },
                    { 9, 1 },
                    { 10, 3 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_RoleId",
                table: "Users",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_SectorId",
                table: "Users",
                column: "SectorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Sector");

            migrationBuilder.DropTable(
                name: "UserRole");

            migrationBuilder.DeleteData(
                table: "CoderLanguageLevels",
                keyColumns: new[] { "CoderId", "LanguageLevelId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "CoderLanguageLevels",
                keyColumns: new[] { "CoderId", "LanguageLevelId" },
                keyValues: new object[] { 2, 3 });

            migrationBuilder.DeleteData(
                table: "CoderLanguageLevels",
                keyColumns: new[] { "CoderId", "LanguageLevelId" },
                keyValues: new object[] { 3, 2 });

            migrationBuilder.DeleteData(
                table: "CoderLanguageLevels",
                keyColumns: new[] { "CoderId", "LanguageLevelId" },
                keyValues: new object[] { 4, 4 });

            migrationBuilder.DeleteData(
                table: "CoderLanguageLevels",
                keyColumns: new[] { "CoderId", "LanguageLevelId" },
                keyValues: new object[] { 5, 5 });

            migrationBuilder.DeleteData(
                table: "CoderLanguageLevels",
                keyColumns: new[] { "CoderId", "LanguageLevelId" },
                keyValues: new object[] { 6, 2 });

            migrationBuilder.DeleteData(
                table: "CoderLanguageLevels",
                keyColumns: new[] { "CoderId", "LanguageLevelId" },
                keyValues: new object[] { 7, 3 });

            migrationBuilder.DeleteData(
                table: "CoderLanguageLevels",
                keyColumns: new[] { "CoderId", "LanguageLevelId" },
                keyValues: new object[] { 8, 4 });

            migrationBuilder.DeleteData(
                table: "CoderLanguageLevels",
                keyColumns: new[] { "CoderId", "LanguageLevelId" },
                keyValues: new object[] { 9, 6 });

            migrationBuilder.DeleteData(
                table: "CoderLanguageLevels",
                keyColumns: new[] { "CoderId", "LanguageLevelId" },
                keyValues: new object[] { 10, 3 });

            migrationBuilder.DeleteData(
                table: "CoderSoftSkills",
                keyColumns: new[] { "CoderId", "SoftSkillId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "CoderSoftSkills",
                keyColumns: new[] { "CoderId", "SoftSkillId" },
                keyValues: new object[] { 2, 2 });

            migrationBuilder.DeleteData(
                table: "CoderSoftSkills",
                keyColumns: new[] { "CoderId", "SoftSkillId" },
                keyValues: new object[] { 3, 3 });

            migrationBuilder.DeleteData(
                table: "CoderSoftSkills",
                keyColumns: new[] { "CoderId", "SoftSkillId" },
                keyValues: new object[] { 4, 4 });

            migrationBuilder.DeleteData(
                table: "CoderSoftSkills",
                keyColumns: new[] { "CoderId", "SoftSkillId" },
                keyValues: new object[] { 5, 5 });

            migrationBuilder.DeleteData(
                table: "CoderSoftSkills",
                keyColumns: new[] { "CoderId", "SoftSkillId" },
                keyValues: new object[] { 6, 6 });

            migrationBuilder.DeleteData(
                table: "CoderSoftSkills",
                keyColumns: new[] { "CoderId", "SoftSkillId" },
                keyValues: new object[] { 7, 7 });

            migrationBuilder.DeleteData(
                table: "CoderSoftSkills",
                keyColumns: new[] { "CoderId", "SoftSkillId" },
                keyValues: new object[] { 8, 8 });

            migrationBuilder.DeleteData(
                table: "CoderSoftSkills",
                keyColumns: new[] { "CoderId", "SoftSkillId" },
                keyValues: new object[] { 9, 9 });

            migrationBuilder.DeleteData(
                table: "CoderSoftSkills",
                keyColumns: new[] { "CoderId", "SoftSkillId" },
                keyValues: new object[] { 10, 10 });

            migrationBuilder.DeleteData(
                table: "CoderTechnicalSkillLevels",
                keyColumns: new[] { "CoderId", "TechnicalSkillLevelId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "CoderTechnicalSkillLevels",
                keyColumns: new[] { "CoderId", "TechnicalSkillLevelId" },
                keyValues: new object[] { 2, 3 });

            migrationBuilder.DeleteData(
                table: "CoderTechnicalSkillLevels",
                keyColumns: new[] { "CoderId", "TechnicalSkillLevelId" },
                keyValues: new object[] { 3, 2 });

            migrationBuilder.DeleteData(
                table: "CoderTechnicalSkillLevels",
                keyColumns: new[] { "CoderId", "TechnicalSkillLevelId" },
                keyValues: new object[] { 4, 1 });

            migrationBuilder.DeleteData(
                table: "CoderTechnicalSkillLevels",
                keyColumns: new[] { "CoderId", "TechnicalSkillLevelId" },
                keyValues: new object[] { 5, 3 });

            migrationBuilder.DeleteData(
                table: "CoderTechnicalSkillLevels",
                keyColumns: new[] { "CoderId", "TechnicalSkillLevelId" },
                keyValues: new object[] { 6, 2 });

            migrationBuilder.DeleteData(
                table: "CoderTechnicalSkillLevels",
                keyColumns: new[] { "CoderId", "TechnicalSkillLevelId" },
                keyValues: new object[] { 7, 3 });

            migrationBuilder.DeleteData(
                table: "CoderTechnicalSkillLevels",
                keyColumns: new[] { "CoderId", "TechnicalSkillLevelId" },
                keyValues: new object[] { 8, 1 });

            migrationBuilder.DeleteData(
                table: "CoderTechnicalSkillLevels",
                keyColumns: new[] { "CoderId", "TechnicalSkillLevelId" },
                keyValues: new object[] { 9, 1 });

            migrationBuilder.DeleteData(
                table: "CoderTechnicalSkillLevels",
                keyColumns: new[] { "CoderId", "TechnicalSkillLevelId" },
                keyValues: new object[] { 10, 3 });

            migrationBuilder.DeleteData(
                table: "TechnicalSkills",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "TechnicalSkills",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "TechnicalSkills",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "TechnicalSkills",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "TechnicalSkills",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "TechnicalSkills",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "TechnicalSkills",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "LanguageLevels",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "LanguageLevels",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "LanguageLevels",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "LanguageLevels",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "LanguageLevels",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "LanguageLevels",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "SoftSkills",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "SoftSkills",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "SoftSkills",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "SoftSkills",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "SoftSkills",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "SoftSkills",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "SoftSkills",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "SoftSkills",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "SoftSkills",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "SoftSkills",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "TechnicalSkillLevels",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "TechnicalSkillLevels",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "TechnicalSkillLevels",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Languages",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "TechnicalSkills",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "TechnicalSkills",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "TechnicalSkills",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
