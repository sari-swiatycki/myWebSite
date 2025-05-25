using SingleZone.Core.entities;
using System.Collections.Generic;

namespace SingleZone.Core.Interfaces
{
    // ממשק מותאם לפלייליסטים
    public interface IPlayListRepository : IRepository<PlayList>
    {
        List<PlayList> GetPlaylistsByUserId(int userId);
    }
}
