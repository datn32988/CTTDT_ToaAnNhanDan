using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PortalWeb.Migrations
{
    /// <inheritdoc />
    public partial class AddStatistics : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$5LDxZlkFv51snmIrdExl7.NfOB6sUdBJLkP2VcJ4mPFVYXCfhCEEu");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$.6J8vjgMjleOJiQzvnu6AuUGAuRklVgB326Yw.9ibi30wyqMPwzAy");
        }
    }
}
