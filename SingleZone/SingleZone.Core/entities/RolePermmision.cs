using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SingleZone.Core.entities;


namespace SingleZone.Core.entities
{
    public class RolePermmision
    {
        [Key]
        public int Id { get; set; }
        public int PermissionId { get; set; }
        [ForeignKey(nameof(PermissionId))]

        public Pemmisions Permission { get; set; }
        public int RoleId { get; set; }
        [ForeignKey(nameof(RoleId))]


        public Roles Role { get; set; }
    }
}
