using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PortalWeb.Migrations
{
    /// <inheritdoc />
    public partial class CreateNewsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$vDys.ajjPCO9uFUuIoZxtORH8o6jJUfWnWsFw7baKC8UTd7NF7mK6");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$RQUJ2Rzg.gb5XvP/9aTLPOJuSagvkMpe0xj9YQNczKeF/XK66fabi");
        }
    }
}
