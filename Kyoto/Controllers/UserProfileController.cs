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
        private readonly KyotoContext _context;

        private UserManager<ApplicationUser> _userManager;
        public UserProfileController(UserManager<ApplicationUser> userManager, KyotoContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet]
        [Authorize]
        //GET: api/UserProfile
        public async Task<User> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            var count = _userManager.Users.Count();
            var idCount = count + 1;
            var imageName = "";

            try
            {
                imageName = _context.Member.FindAsync(userId).Result.Image;
            }
            catch (Exception e)
            {
               
            }
        

            if (imageName == "")
            {
                var imageUser = new Member();
                imageUser.Id = userId;
                imageUser.Name = user.FirstName;
                imageUser.Image = "defaultProfile.jpg";
                _context.Member.Add(imageUser);
                await _context.SaveChangesAsync();
                imageName = "defaultProfile.jpg";
            }

            var test = _context.Member.Count();

            return new User
            {
               // Id = idCount.ToString(),
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                UserName = user.UserName,
                ImageName = imageName

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