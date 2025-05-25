using SingleZone.Core.entities;
using System;
using System.Collections.Generic;

namespace SingleZone.Core.DTOs
{
    public class SongDto
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Artist { get; set; }
        public string? Genere { get; set; }
        public string? AudioUrl { get; set; }
        public string? pictureUrl { get; set; }

        public string? Tags { get; set; }
        public int? countRating { get; set; } = 0;
        public double? AvgRating { get; set; } = 0;
        public Categories category { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdateAt { get; set; }

    }
}
