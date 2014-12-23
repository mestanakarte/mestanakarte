namespace Places.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_AddressLine : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.GeoTags", "Address_GeoTagId", "dbo.Addresses");
            DropForeignKey("dbo.GeoTags", "Point_GeoTagId", "dbo.Points");
            DropIndex("dbo.GeoTags", new[] { "Address_GeoTagId" });
            DropIndex("dbo.GeoTags", new[] { "Point_GeoTagId" });
            AddColumn("dbo.Addresses", "AddressLine", c => c.String());
            AlterColumn("dbo.GeoTags", "Name", c => c.String(nullable: false));
            AlterColumn("dbo.GeoTags", "Address_GeoTagId", c => c.Int(nullable: false));
            AlterColumn("dbo.GeoTags", "Point_GeoTagId", c => c.Int(nullable: false));
            CreateIndex("dbo.GeoTags", "Address_GeoTagId");
            CreateIndex("dbo.GeoTags", "Point_GeoTagId");
            AddForeignKey("dbo.GeoTags", "Address_GeoTagId", "dbo.Addresses", "GeoTagId", cascadeDelete: true);
            AddForeignKey("dbo.GeoTags", "Point_GeoTagId", "dbo.Points", "GeoTagId", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.GeoTags", "Point_GeoTagId", "dbo.Points");
            DropForeignKey("dbo.GeoTags", "Address_GeoTagId", "dbo.Addresses");
            DropIndex("dbo.GeoTags", new[] { "Point_GeoTagId" });
            DropIndex("dbo.GeoTags", new[] { "Address_GeoTagId" });
            AlterColumn("dbo.GeoTags", "Point_GeoTagId", c => c.Int());
            AlterColumn("dbo.GeoTags", "Address_GeoTagId", c => c.Int());
            AlterColumn("dbo.GeoTags", "Name", c => c.String());
            DropColumn("dbo.Addresses", "AddressLine");
            CreateIndex("dbo.GeoTags", "Point_GeoTagId");
            CreateIndex("dbo.GeoTags", "Address_GeoTagId");
            AddForeignKey("dbo.GeoTags", "Point_GeoTagId", "dbo.Points", "GeoTagId");
            AddForeignKey("dbo.GeoTags", "Address_GeoTagId", "dbo.Addresses", "GeoTagId");
        }
    }
}
