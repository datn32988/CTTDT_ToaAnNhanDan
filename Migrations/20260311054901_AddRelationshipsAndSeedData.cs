using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PortalWeb.Migrations
{
    /// <inheritdoc />
    public partial class AddRelationshipsAndSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_News_Categories_CategoryId",
                table: "News");

            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$XpIzLarGzXQc4yykN7qwyOWBGw4/9zTxkCkUOXeYwGyoyhSjUoWvm");

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CreatedDate", "Description", "IsActive", "Name", "Slug", "UpdatedDate" },
                values: new object[,]
                {
                    { 1, new DateTime(2026, 3, 11, 12, 49, 0, 891, DateTimeKind.Local).AddTicks(9094), "Các tin tức tổng hợp", true, "Tin tức", "tin-tuc", null },
                    { 2, new DateTime(2026, 3, 11, 12, 49, 0, 891, DateTimeKind.Local).AddTicks(9123), "Tin tức về công nghệ", true, "Công nghệ", "cong-nghe", null },
                    { 3, new DateTime(2026, 3, 11, 12, 49, 0, 891, DateTimeKind.Local).AddTicks(9128), "Tin tức kinh doanh", true, "Kinh doanh", "kinh-doanh", null },
                    { 4, new DateTime(2026, 3, 11, 12, 49, 0, 891, DateTimeKind.Local).AddTicks(9131), "Tin tức thể thao", true, "Thể thao", "the-thao", null },
                    { 5, new DateTime(2026, 3, 11, 12, 49, 0, 891, DateTimeKind.Local).AddTicks(9135), "Tin tức giải trí", true, "Giải trí", "giai-tri", null }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_News_Categories_CategoryId",
                table: "News",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_News_Categories_CategoryId",
                table: "News");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$5LDxZlkFv51snmIrdExl7.NfOB6sUdBJLkP2VcJ4mPFVYXCfhCEEu");

            migrationBuilder.AddForeignKey(
                name: "FK_News_Categories_CategoryId",
                table: "News",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id");
        }
    }
}
