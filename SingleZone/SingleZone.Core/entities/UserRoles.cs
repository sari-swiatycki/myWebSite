using SingleZone.Core.entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SingleZone.Core.entities
{
    public class UserRoles
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public Users User { get; set; }
        public int RoleId { get; set; }

        [ForeignKey(nameof(RoleId))]
        public Roles Role { get; set; }
    }
}
