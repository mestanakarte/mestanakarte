namespace Places.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addpointmodel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Points",
                c => new
                    {
                        GeoTagId = c.Int(nullable: false, identity: true),
                        Lat = c.Double(nullable: false),
                        Long = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.GeoTagId);
            
            AddColumn("dbo.GeoTags", "Point_GeoTagId", c => c.Int());
            CreateIndex("dbo.GeoTags", "Point_GeoTagId");
            AddForeignKey("dbo.GeoTags", "Point_GeoTagId", "dbo.Points", "GeoTagId");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.GeoTags", "Point_GeoTagId", "dbo.Points");
            DropIndex("dbo.GeoTags", new[] { "Point_GeoTagId" });
            DropColumn("dbo.GeoTags", "Point_GeoTagId");
            DropTable("dbo.Points");
        }
    }
}
