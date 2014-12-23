using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Places.Models
{
    public class GeoTag
    {
        public int Id { get; set; }
        public string Description { get; set; }
        [Required]
        public string Name { get; set; }
        public virtual ICollection<Tag> Tags { get; set; }
        public int UserId { get; set; }
        public int KindId { get; set; }
        public int TypeId { get; set; }
        [Required(ErrorMessage = "Address is required.")]
        public virtual Address Address { get; set; }
        [Required(ErrorMessage = "Location is required.")]
        public virtual Point Point { get; set; }
    }
}