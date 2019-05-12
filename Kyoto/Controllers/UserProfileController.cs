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