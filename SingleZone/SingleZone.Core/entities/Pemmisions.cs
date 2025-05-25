using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SingleZone.Core.entities
{
    public class Pemmisions
    {
        [Key]
        public int Id { get; set; }
        public string PermissionName { get; set; }
        public string Description { get; set; }
    }
}
