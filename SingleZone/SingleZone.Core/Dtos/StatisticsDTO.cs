using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SingleZone.Core.Dtos
{
    public class UserStatisticsDto
    {
        public int UserId { get; set; }
        public string Username { get; set; } = string.Empty;
        public int SongsCount { get; set; }
        public int PlayListsCount { get; set; }
    }

    public class SystemStatisticsDto
    {
        public int TotalUsers { get; set; }
        public int TotalSongs { get; set; }
        public int TotalPlayLists { get; set; }
    }
}
