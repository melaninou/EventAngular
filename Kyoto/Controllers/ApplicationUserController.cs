using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Kyoto.Models;
using Kyoto.Models.User_Registration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Kyoto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        private readonly ApplicationSettings _appSettings;

        public ApplicationUserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IOptions<ApplicationSettings> appSettings)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
        }

        // GET: api/ApplicationUser
        [HttpGet]
        public IEnumerable<ApplicationUser> GetAllUsers()
        {
            List<ApplicationUser> userList = new List<ApplicationUser>();
            foreach (var user in _userManager.Users)
            {
                userList.Add(user);
            }
            return userList;
        }


       [HttpPost("Register")] //POST: api/ApplicationUser/Register
        public async Task<IActionResult> PostApplicationUser(ApplicationUserModel model)
        {
            model.Role = "User";
            var applicationUser = new ApplicationUser()
            {
                UserName = model.UserName,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName
            };

            try
            {
                var result = await _userManager.CreateAsync(applicationUser, model.Password);
                await _userManager.AddToRoleAsync(applicationUser, model.Role);
                var loginModel = new LoginModel
                {
                    UserName = model.UserName,
                    Password = model.Password
                };
                return Ok(result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpPost("Login")] //POST: api/ApplicationUser/Login
        public async Task<IActionResult> Login(LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                // Get Role assigned to user
                var role = await _userManager.GetRolesAsync(user);
                IdentityOptions _options = new IdentityOptions();
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID", user.Id.ToString()),
                        new Claim(_options.ClaimsIdentity.RoleClaimType, role.FirstOrDefault()), //saves the role claim in the JWT payload section.
                    }),
                    Expires = DateTime.UtcNow.AddHours(3), //login time window is 3 hours.
                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.Secret)),
                        SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            else
            {
                return BadRequest(new { message = "Username or Password is incorrect!" });
            }
        }

        [HttpPut("EditProfile")]
        public async Task<IActionResult> EditProfile(User inputUser) //peab token olema kaasas
        {
            if (inputUser == null)
            {
                return BadRequest("Edit Profile Input data is invalid!");
            }
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return BadRequest("User not Found!");
            }

            user.FirstName = inputUser.FirstName;
            user.LastName = inputUser.LastName;
            user.Email = inputUser.Email;
            user.UserName = inputUser.UserName;

            await _userManager.UpdateAsync(user);
            return Ok(user);


        }
    }
}