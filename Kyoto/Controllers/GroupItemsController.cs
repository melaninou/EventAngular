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


        [HttpGet]
        [Route("tree")]
        public IEnumerable<Group> GetGroupItemTree()
        {
            IEnumerable<GroupItem> allgroups = _context.GroupItem;



            //Group baseGroup = new Group();
            //foreach (var group in allgroups)
            //{
            //    if (group.Id == group.ParentId)
            //    {
            //        baseGroup = new Group
            //        {
            //            Id = group.Id, Name = group.Name, ParentId = group.ParentId
            //        };

            //        //addSubGroups(baseGroup.ParentId, allgroups, );

            //        //Group subGroup = null;
            //        //foreach (var child in allgroups)
            //        //{
            //        //    if()
            //        //}

            //    }
            //}

            return CreateGroupTree(allgroups);

            //return _context.Group; 
        }

    

    private List<Group> CreateGroupTree(IEnumerable<GroupItem> categories)
        {
            List<Group> nodes = new List<Group>();

            foreach (var item in categories)
            {
                if (item.ParentId == 0)
                    nodes.Add(new Group { Id = item.Id, Name = item.Name });
                else
                {
                    CreateNode(nodes, item);
                }
            }
            return nodes;
        }

        private void CreateNode(List<Group> nodes, GroupItem parent)
        {
            foreach (var node in nodes)
            {
                if (node.Id == parent.ParentId)
                {
                    node.Children.Add(new Group { Id = parent.Id, Name = parent.Name });
                }
                else
                {
                    CreateNode(node.Children, parent);
                }
            }
       
    }



    //private void addSubGroups(int parentId, IEnumerable<GroupItem> allgroups, )
    //    {
    //        Group subGroup = null;
    //        foreach (var child in allgroups)
    //        {
    //            if (child.ParentId == parentId)
    //            {

    //            }
    //        }
    //    }

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