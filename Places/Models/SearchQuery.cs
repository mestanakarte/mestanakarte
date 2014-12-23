using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Places.Models
{
    public class SearchQuery
    {
        public string City { get; set; }
        public string Street { get; set; }
        public int HouseNumber { get; set; }
        public int KindId { get; set; }
        public int TypeId { get; set; }
        public string AddressLine { get; set; }
    }
}