using Microsoft.EntityFrameworkCore.Migrations;

namespace ContactList.Infra.Migrations
{
    public partial class UpdateContact_AddContactTypeColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ContactType",
                table: "Contacts",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContactType",
                table: "Contacts");
        }
    }
}
