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

namespace Places.Controllers
{
    public class KindController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET api/Kind
        public IQueryable<Kind> GetKinds()
        {
            return db.Kinds;
        }

        // GET api/Kind/5
        [ResponseType(typeof(Kind))]
        public IHttpActionResult GetKind(int id)
        {
            Kind kind = db.Kinds.Find(id);
            if (kind == null)
            {
                return NotFound();
            }

            return Ok(kind);
        }

        // PUT api/Kind/5
        [Authorize]
        public IHttpActionResult PutKind(int id, Kind kind)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != kind.Id)
            {
                return BadRequest();
            }

            db.Entry(kind).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KindExists(id))
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

        // POST api/Kind
        [Authorize]
        [ResponseType(typeof(Kind))]
        public IHttpActionResult PostKind(Kind kind)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Kinds.Add(kind);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = kind.Id }, kind);
        }

        // DELETE api/Kind/5
        [ResponseType(typeof(Kind))]
        [Authorize]
        public IHttpActionResult DeleteKind(int id)
        {
            Kind kind = db.Kinds.Find(id);
            if (kind == null)
            {
                return NotFound();
            }

            db.Kinds.Remove(kind);
            db.SaveChanges();

            return Ok(kind);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool KindExists(int id)
        {
            return db.Kinds.Count(e => e.Id == id) > 0;
        }
    }
}