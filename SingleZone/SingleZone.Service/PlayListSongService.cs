using SingleZone.Core.Interfaces.ServiceInterface;
using SingleZone.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SingleZone.Core.entities;
using Microsoft.AspNetCore.Mvc;

namespace SingleZone.Service
{
    public class PlayListSongService : IPlayListSongService
    {
        private readonly IPlayListSongRepository _playListSongRepository;

        public PlayListSongService(IPlayListSongRepository playListSongRepository)
        {
            _playListSongRepository = playListSongRepository;
        }

        public async Task AddSongToPlayListAsync(int playListId, int songId)
        {
            await _playListSongRepository.AddSongToPlayListAsync(playListId, songId);
        }



        public async Task<List<Songs>> GetSongsByPlayListIdAsync(int playListId)
        {
            return await _playListSongRepository.GetSongsByPlayListIdAsync(playListId);
        }

        public async Task RemoveSongFromPlayListAsync(int playListId, int songId)
        {
            await _playListSongRepository.RemoveSongFromPlayListAsync(playListId, songId);
        }


    }

}
