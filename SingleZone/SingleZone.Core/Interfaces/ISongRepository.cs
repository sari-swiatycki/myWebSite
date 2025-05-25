using SingleZone.Core.DTOs;
using SingleZone.Core.entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SingleZone.Core.Interfaces
{
  public  interface ISongRepository:IRepository<Songs>
    {
        List<Songs> GetSongByCategory(Categories? category = null);
     
      List<Songs> SearchSongs(string keyword);
    }
}
