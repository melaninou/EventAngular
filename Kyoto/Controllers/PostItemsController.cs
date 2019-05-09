using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Kyoto.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Rewrite.Internal.UrlMatches;

namespace Kyoto.Controllers
{
    //[Authorize(Roles = "User")]
    [Route("api/posts")]
    [ApiController]
    public class PostItemsController : ControllerBase
    {
        private readonly KyotoContext _context;

        public PostItemsController(KyotoContext context)
        {
            _context = context;
        }

        // GET: api/posts
        [HttpGet]
        public IEnumerable<PostItem> GetPostItem([FromQuery(Name = "groupId")]List<int> ids = null)
        {
            List<PostItem> filteredPosts = new List<PostItem>();
            if (ModelState.IsValid)
            {
                if (ids == null || ids.Count == 0)
                {
                    return _context.PostItem;
                }
                else
                {
                    foreach (var id in ids)
                    {
                        filteredPosts.AddRange(_context.PostItem.Where(x => x.GroupId == id).ToList());
                    }

                    return filteredPosts;
                }
                
            }
            else
            {
                throw new Exception("Unable to GET PostItems because the Model State is invalid.");
            }
        }


        [HttpGet("group/{id}")]
        public IEnumerable<PostItem> GetGroupPostItems([FromRoute] int id)
        {
            if (ModelState.IsValid)
            {
                var allPosts = _context.PostItem;
                var groupPosts = new List<PostItem>();

                foreach (var group in allPosts)
                {
                    if (group.GroupId == id)
                    {
                        groupPosts.Add(group);
                    }
                }

                return groupPosts;
            }
            else
            {
                throw new Exception("Unable to GET PostItems because the Model State is invalid.");
            }
        }

        // GET: api/posts/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPostItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var postItem = await _context.PostItem.FindAsync(id);

            if (postItem == null)
            {
                return NotFound();
            }

            return Ok(postItem);
        }

        // PUT: api/PostItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPostItem([FromRoute] int id, [FromBody] PostItem postItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != postItem.ID)
            {
                return BadRequest();
            }

            _context.Entry(postItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PostItems
        [HttpPost]
        public async Task<IActionResult> PostPostItem([FromBody] PostItem postItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.PostItem.Add(postItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPostItem", new { id = postItem.ID }, postItem);
        }

        // DELETE: api/PostItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePostItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var postItem = await _context.PostItem.FindAsync(id);
            if (postItem == null)
            {
                return NotFound();
            }

            _context.PostItem.Remove(postItem);
            await _context.SaveChangesAsync();

            return Ok(postItem);
        }

        private bool PostItemExists(int id)
        {
            return _context.PostItem.Any(e => e.ID == id);
        }
    }
}