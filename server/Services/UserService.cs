using Microsoft.EntityFrameworkCore;
using server.Models;
using System.Security.Claims;

namespace server.Services
{
    public class UserService : IUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public UserDto GetCurrentUser()
        {
            var email = _httpContextAccessor.HttpContext.User.FindFirst("Email")?.Value;
            var name = _httpContextAccessor.HttpContext.User.FindFirst("Name")?.Value;

            return new UserDto
            {
                Email = email,
                Name = name
            };
        }

        public Guid GetUserId()
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst("Id")?.Value;
            var parsedUserId = userId != null ? Guid.Parse(userId) : Guid.Empty;

            return parsedUserId;
        }
    }
}
