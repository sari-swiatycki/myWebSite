using SingleZone.Core.entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SingleZone.Core.Interfaces.ServiceInterface
{
    public interface IPlayListSongService
    {
        Task AddSongToPlayListAsync(int playListId, int songId);
        Task<List<Songs>> GetSongsByPlayListIdAsync(int playListId);
        Task RemoveSongFromPlayListAsync(int playListId, int songId);
    }

}
