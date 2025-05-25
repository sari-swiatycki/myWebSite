using SingleZone.Core.Dtos;
using SingleZone.Core.entities;
using SingleZone.Core.Interfaces;
using SingleZone.Core.Interfaces.ServiceInterface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SingleZone.Service
{
    public class StatisticsService: IStatisticsService
    {
        private readonly IUserRepository _userRepository;
        private readonly ISongRepository _songRepository;
        private readonly IPlayListRepository _playlistRepository;


        public StatisticsService(IUserRepository userRepository, ISongRepository songRepository, IPlayListRepository playlistRepository)
        {
            _userRepository = userRepository;
            _songRepository = songRepository;
            _playlistRepository = playlistRepository;

        }

        // סטטיסטיקה לכל משתמש

        //public IEnumerable<UserStatisticsDto> GetUserStatisticsAsync()
        //{
        //    var users = _userRepository.GetAll();
        //    var Songs = _songRepository.GetAll();
        //    var playlist = _playlistRepository.GetAll();

        //    var userStats = users.Select(user => new UserStatisticsDto
        //    {
        //        UserId = user.Id,
        //        Username = user.UserName,
        //        //SongsCount = Songs.Count(a => a.Id == user.Id),
        //        PlayListsCount = playlist.Count(f => f.userId == user.Id)
        //    }).ToList();

        //    return userStats;
        //}

        // סטטיסטיקה כללית של המערכת
        public SystemStatisticsDto GetSystemStatisticsAsync()
        {
            var users = _userRepository.GetAll();
            var totalUsers = users.Count();
            var songs = _songRepository.GetAll();
            var totalSongs = songs.Count();
            var playlists = _playlistRepository.GetAll();
            var totalPlaylists = playlists.Count();

            var systemStats = new SystemStatisticsDto
            {
                TotalUsers = totalUsers,
                TotalSongs = totalSongs,
                TotalPlayLists = totalPlaylists
            };

            return systemStats;
        }
    }
}

