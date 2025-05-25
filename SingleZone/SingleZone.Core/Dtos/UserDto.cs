using System;
using System.Collections.Generic;
using SingleZone.Core.entities;
using static SingleZone.Core.entities.Users;

namespace SingleZone.Core.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdateAt { get; set; }


    }
}

