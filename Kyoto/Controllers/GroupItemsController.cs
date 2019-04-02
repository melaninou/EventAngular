using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Kyoto.Models;

namespace Kyoto.Controllers
{
    [Route("api/groups")]
    [ApiController]
    public class GroupItemsController : ControllerBase
    {
        private readonly KyotoContext _context;

        public GroupItemsController(KyotoContext context)
        {
            _context = context;
        }

        // GET: api/GroupItems
        [HttpGet]
        public IEnumerable<GroupItem> GetGroupItem()
        {
            return _context.GroupItem;
        }

        // GET: api/GroupItems/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGroupItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var groupItem = await _context.GroupItem.FindAsync(id);

            if (groupItem == null)
            {
                return NotFound();
            }

            return Ok(groupItem);
        }

        // PUT: api/GroupItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGroupItem([FromRoute] int id, [FromBody] GroupItem groupItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != groupItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(groupItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GroupItemExists(id))
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

        // POST: api/GroupItems
        [HttpPost]
        public async Task<IActionResult> PostGroupItem(GroupItem groupItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.GroupItem.Add(groupItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGroupItem", new { id = groupItem.Id }, groupItem);
        }

        // DELETE: api/GroupItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGroupItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var groupItem = await _context.GroupItem.FindAsync(id);
            if (groupItem == null)
            {
                return NotFound();
            }

            _context.GroupItem.Remove(groupItem);
            await _context.SaveChangesAsync();

            return Ok(groupItem);
        }

        private bool GroupItemExists(int id)
        {
            return _context.GroupItem.Any(e => e.Id == id);
        }
    }
}