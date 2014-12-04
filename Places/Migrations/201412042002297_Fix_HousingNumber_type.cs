namespace Places.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Fix_HousingNumber_type : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Addresses", "HouseNumber", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Addresses", "HouseNumber", c => c.String());
        }
    }
}
