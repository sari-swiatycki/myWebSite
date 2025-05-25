using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SingleZone.Core.entities
{
  public  class PlayListSong
    {
             [Key]
            public int Id { get; set; }
           
            public int PlayListId { get; set; }
            [ForeignKey(nameof(PlayListId))]
            public PlayList Playlist { get; set; }
            public int SongId { get; set; }
            [ForeignKey(nameof(SongId))]
            public Songs Song { get; set; }


    }
}
