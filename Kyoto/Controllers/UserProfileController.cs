using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Kyoto.Models;
using Kyoto.Models.User_Registration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Hosting;

namespace Kyoto.Controllers
{
    //[Authorize(Roles = "User")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        public UserProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize]
        //GET: api/UserProfile
        public async Task<User> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            var count = _userManager.Users.Count();
            return new User
            {
                Id = count + 1,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                UserName = user.UserName
            };
        }

        [HttpGet("{id}")]
        //[Authorize]
        //GET: api/UserProfile/5
        public async Task<User> GetUserProfile([FromRoute] string id)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            //var user = await _userManager.FindByIdAsync(id);

            //if (user == null)
            //{
            //    return NotFound();
            //}

            //return Ok(user);

            if (ModelState.IsValid)
            {
                //string userId = User.Claims.First(c => c.Type == "UserID").Value;
                var user = await _userManager.FindByIdAsync(id);
                return new User
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    UserName = user.UserName
                };
            }
            else
            {
                throw new Exception("Unable to GET UserProfile because the Model State is invalid.");
            }
        }


        [Authorize(Roles = "Administrator")]
        [HttpGet("ForAdmin")]
        public string GetForAdmin()
        {
            return "Web method for admin!";
        }
        [Authorize(Roles = "User")]
        [HttpGet("ForUser")]
        public string GetForUser()
        {
            return "Web method for User!";
        }
        [Authorize(Roles = "Administrator, User")]
        [HttpGet("ForAdminOrUser")]
        public string GetForAdminOrUser()
        {
            return "Web method for admin or user!";
        }

    }
}