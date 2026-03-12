using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PortalWeb.Migrations
{
    /// <inheritdoc />
    public partial class RemoveAdminsAndUseUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admins");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2026, 3, 11, 12, 51, 54, 811, DateTimeKind.Local).AddTicks(6828));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2026, 3, 11, 12, 51, 54, 811, DateTimeKind.Local).AddTicks(6847));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2026, 3, 11, 12, 51, 54, 811, DateTimeKind.Local).AddTicks(6859));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedDate",
                value: new DateTime(2026, 3, 11, 12, 51, 54, 811, DateTimeKind.Local).AddTicks(6863));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedDate",
                value: new DateTime(2026, 3, 11, 12, 51, 54, 811, DateTimeKind.Local).AddTicks(6864));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Avatar", "CreatedDate", "Email", "FirstName", "IsActive", "LastLoginDate", "LastName", "Password", "Role", "UpdatedDate", "Username" },
                values: new object[] { 1, null, new DateTime(2026, 3, 11, 12, 51, 54, 811, DateTimeKind.Local).AddTicks(5577), "admin@portal.com", "System", true, null, "Administrator", "$2a$11$lzs9O95UCIacnuVELOJz7u7R3.E1MXkgMT0oVuWb1RBbwoVnNIHQW", 2, null, "admin" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.CreateTable(
                name: "Admins",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admins", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Admins",
                columns: new[] { "Id", "Password", "Username" },
                values: new object[] { 1, "$2a$11$XpIzLarGzXQc4yykN7qwyOWBGw4/9zTxkCkUOXeYwGyoyhSjUoWvm", "admin" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2026, 3, 11, 12, 49, 0, 891, DateTimeKind.Local).AddTicks(9094));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2026, 3, 11, 12, 49, 0, 891, DateTimeKind.Local).AddTicks(9123));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2026, 3, 11, 12, 49, 0, 891, DateTimeKind.Local).AddTicks(9128));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedDate",
                value: new DateTime(2026, 3, 11, 12, 49, 0, 891, DateTimeKind.Local).AddTicks(9131));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedDate",
                value: new DateTime(2026, 3, 11, 12, 49, 0, 891, DateTimeKind.Local).AddTicks(9135));
        }
    }
}
