using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ToaAnNhanDan.Api.Migrations
{
    /// <inheritdoc />
    public partial class DbForAllHome : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_AspNetUsers_AuthorId",
                table: "Posts");

            migrationBuilder.DropForeignKey(
                name: "FK_Posts_PostCategories_IdCategory",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Posts_AuthorId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "AuthorId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Posts");

            migrationBuilder.RenameColumn(
                name: "IdCategory",
                table: "Posts",
                newName: "CategoryId");

            migrationBuilder.RenameColumn(
                name: "Doc",
                table: "Posts",
                newName: "Content");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Posts",
                newName: "CreatedAt");

            migrationBuilder.RenameIndex(
                name: "IX_Posts_IdCategory",
                table: "Posts",
                newName: "IX_Posts_CategoryId");

            migrationBuilder.AddColumn<int>(
                name: "ParentId",
                table: "PostCategories",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PostId = table.Column<int>(type: "int", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AuthorName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comments_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PostMedias",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PostId = table.Column<int>(type: "int", nullable: false),
                    Url = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    MediaType = table.Column<int>(type: "int", nullable: false),
                    OrderIndex = table.Column<int>(type: "int", nullable: false),
                    IsThumbnail = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostMedias", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PostMedias_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PostCategories_ParentId",
                table: "PostCategories",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_PostId",
                table: "Comments",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_PostMedias_PostId",
                table: "PostMedias",
                column: "PostId");

            migrationBuilder.AddForeignKey(
                name: "FK_PostCategories_PostCategories_ParentId",
                table: "PostCategories",
                column: "ParentId",
                principalTable: "PostCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_PostCategories_CategoryId",
                table: "Posts",
                column: "CategoryId",
                principalTable: "PostCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PostCategories_PostCategories_ParentId",
                table: "PostCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_Posts_PostCategories_CategoryId",
                table: "Posts");

            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "PostMedias");

            migrationBuilder.DropIndex(
                name: "IX_PostCategories_ParentId",
                table: "PostCategories");

            migrationBuilder.DropColumn(
                name: "ParentId",
                table: "PostCategories");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Posts",
                newName: "Date");

            migrationBuilder.RenameColumn(
                name: "Content",
                table: "Posts",
                newName: "Doc");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "Posts",
                newName: "IdCategory");

            migrationBuilder.RenameIndex(
                name: "IX_Posts_CategoryId",
                table: "Posts",
                newName: "IX_Posts_IdCategory");

            migrationBuilder.AddColumn<string>(
                name: "AuthorId",
                table: "Posts",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Posts",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_AuthorId",
                table: "Posts",
                column: "AuthorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_AspNetUsers_AuthorId",
                table: "Posts",
                column: "AuthorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_PostCategories_IdCategory",
                table: "Posts",
                column: "IdCategory",
                principalTable: "PostCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
