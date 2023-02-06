using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace IMP.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class initdb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Role = table.Column<string>(type: "text", nullable: false),
                    Address = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    LastUpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "CreatedAt", "Email", "LastUpdatedAt", "Name", "Password", "Role" },
                values: new object[,]
                {
                    { 1, null, new DateTime(2023, 2, 4, 20, 47, 55, 120, DateTimeKind.Local).AddTicks(3628), "admin@gmail.com", new DateTime(2023, 2, 4, 20, 47, 55, 120, DateTimeKind.Local).AddTicks(3638), "Admin", "e6e061838856bf47e1de730719fb2609", "admin" },
                    { 2, null, new DateTime(2023, 2, 4, 20, 47, 55, 120, DateTimeKind.Local).AddTicks(3641), "user@gmail.com", new DateTime(2023, 2, 4, 20, 47, 55, 120, DateTimeKind.Local).AddTicks(3641), "User", "e6e061838856bf47e1de730719fb2609", "user" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
