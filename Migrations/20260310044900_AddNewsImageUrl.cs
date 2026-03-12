using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PortalWeb.Migrations
{
    /// <inheritdoc />
    public partial class AddNewsImageUrl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "News",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$RQUJ2Rzg.gb5XvP/9aTLPOJuSagvkMpe0xj9YQNczKeF/XK66fabi");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "News");

            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$OjG4ZMOc1.fN0Dj7.eKVPewliMcemDW069gEJ3hPH3n0xzyVlG4lK");
        }
    }
}
