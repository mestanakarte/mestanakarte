using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Places.Models
{
    public class GeoTag
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Tag> Tags { get; set; }
        public int UserId { get; set; }
        public int KindId { get; set; }
        public int TypeId { get; set; }
        public virtual Address Address { get; set; }
    }
}