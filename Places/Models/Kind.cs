using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Places.Models
{
    public class Kind
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Type> Types { get; set; }
    }
}