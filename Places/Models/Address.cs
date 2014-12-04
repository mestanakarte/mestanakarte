using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Places.Models
{
    public class Address
    {   
        [Key]
        public int GeoTagId { get; set; }
        public String City { get; set; }
        public String Street { get; set; }
        public int HouseNumber { get; set; }
        public int Housing { get; set; }
    }
}