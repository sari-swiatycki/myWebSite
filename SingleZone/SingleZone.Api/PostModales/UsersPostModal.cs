using SingleZone.Core.entities;
using System.ComponentModel.DataAnnotations.Schema;
using static SingleZone.Core.entities.Users;

namespace SingleZone.API.PostModales
{
    public class UsersPostModal
    {

        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
