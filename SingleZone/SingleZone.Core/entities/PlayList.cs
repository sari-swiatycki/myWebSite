using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SingleZone.Core.entities
{
    [Table("PlayLists")]
    public class PlayList       
    {
        [Key]
        public int Id { get; set; }
        public string?  Name { get; set; }

        public int userId { get; set; }

        [ForeignKey(nameof(userId))]
        public Users? user { get; set; }
    }
}
