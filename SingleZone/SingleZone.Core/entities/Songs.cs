using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SingleZone.Core.entities
{
    [Table("Songs")]
    public class Songs
    {
        [Key]
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Artist { get; set; }
        public string? Genere { get; set; }
        public string? audioUrl { get; set; }
        public string? pictureUrl { get; set; }
        public string? Tags { get; set; }
        public int? countRating { get; set; } = 0;
        public double? AvgRating { get; set; } = 0;
        public Categories category { get; set; }
        public DateTime CreatedAt { get; set; }= DateTime.UtcNow;
        public DateTime UpdateAt { get; set; }






    }
}
