using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Places.Models;
using Yandex;

namespace Places.Controllers
{
    public class GeoTagController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET api/GeoTag
        public IQueryable<GeoTag> GetGeoTags([FromUri]SearchQuery query)
        {
            IQueryable<GeoTag> geotags = db.Set<GeoTag>();

            if (query.City != null)
            {
                geotags = geotags.Where(p => p.Address.City.Contains(query.City));
            }

            if (query.Street != null)
            {
                geotags = geotags.Where(p => p.Address.Street.Contains(query.Street));
            }

            if (query.HouseNumber != 0)
            {
                geotags = geotags.Where(p => p.Address.HouseNumber.Equals(query.HouseNumber));
            }

            if (query.KindId != 0)
            {
                geotags = geotags.Where(p => p.KindId.Equals(query.KindId));
            }

            if (query.TypeId != 0)
            {
                geotags = geotags.Where(p => p.KindId.Equals(query.KindId));
            }

            if (query.AddressLine != null)
            {
                geotags = geotags.Where(p => p.Address.AddressLine.Contains(query.AddressLine));
            }

        
            return geotags;
        }

        // GET api/GeoTag/5
        [ResponseType(typeof(GeoTag))]
        public IHttpActionResult GetGeoTag(int id)
        {
            GeoTag geotag = db.GeoTags.Find(id);
            if (geotag == null)
            {
                return NotFound();
            }

            return Ok(geotag);
        }

        // PUT api/GeoTag/5
        [Authorize]
        public IHttpActionResult PutGeoTag(int id, GeoTag geotag)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != geotag.Id)
            {
                return BadRequest();
            }

            db.Entry(geotag).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GeoTagExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/GeoTag
        [ResponseType(typeof(GeoTag))]
        [Authorize]
        public IHttpActionResult PostGeoTag(GeoTag geotag)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            Address address = geotag.Address;
            string placeAddress = string.Format("{0} {1} {2} {3}", address.City, address.Street, address.HouseNumber, address.Housing);
            GeoObjectCollection results = YandexGeocoder.Geocode(placeAddress);
            foreach (GeoObject result in results)
            {
                geotag.Point = new Point();
                geotag.Point.Lat = result.Point.Lat;
                geotag.Point.Long = result.Point.Long;
                db.GeoTags.Add(geotag);
                db.SaveChanges();

                return CreatedAtRoute("DefaultApi", new { id = geotag.Id }, geotag);
            }

            return BadRequest();
        }

        // DELETE api/GeoTag/5
        [Authorize]
        [ResponseType(typeof(GeoTag))]
        public IHttpActionResult DeleteGeoTag(int id)
        {
            GeoTag geotag = db.GeoTags.Find(id);
            if (geotag == null)
            {
                return NotFound();
            }

            db.GeoTags.Remove(geotag);
            db.SaveChanges();

            return Ok(geotag);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool GeoTagExists(int id)
        {
            return db.GeoTags.Count(e => e.Id == id) > 0;
        }
    }
}