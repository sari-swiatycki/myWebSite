using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SingleZone.Core.Dtos
{
  public class AddSongToPlayListRequest
    {
        public int PlayListId { get; set; }
        public int SongId { get; set; }

    }
}
