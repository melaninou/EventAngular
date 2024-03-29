﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Kyoto.Models;
using System.IO;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;

namespace Kyoto.Controllers
{
    //[Authorize(Roles = "User")]
    [Route("api/groups")]
    [ApiController]
    public class GroupItemsController : ControllerBase
    {
        private readonly KyotoContext _context;
        private IHostingEnvironment _hostingEnvironment;

        public GroupItemsController(KyotoContext context, IHostingEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
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

            return CreateGroupTree(allgroups);

             
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

        [HttpPost, DisableRequestSizeLimit]
        [Route("upload")]
        public IActionResult Upload()
        {
            try
            {

                var file = Request.Form.Files[0];

                var folderName = "Images";
                string webRootPath = _hostingEnvironment.WebRootPath;
                var pathToSave = Path.Combine(webRootPath, folderName);
                if (!Directory.Exists(pathToSave))
                {
                    Directory.CreateDirectory(pathToSave);
                }

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }

}