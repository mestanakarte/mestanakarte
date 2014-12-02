using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Places.Models
{
    public class Point
    {   
        [Key]
        public int GeoTagId { get; set; }
        public double Lat { get; set; }
        public double Long { get; set; }
    }
}