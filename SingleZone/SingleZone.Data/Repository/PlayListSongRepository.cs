using Microsoft.EntityFrameworkCore;
using SingleZone.Core.entities;
using SingleZone.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SingleZone.Data.Repository
{
    public class PlayListSongRepository : IPlayListSongRepository
    {
        private readonly DataContext _context;

        public PlayListSongRepository(DataContext context)
        {
            _context = context;
        }

        public async Task AddSongToPlayListAsync(int playListId, int songId)
        {
            var exists = await _context.PlayListSong
                .AnyAsync(ps => ps.PlayListId == playListId && ps.SongId == songId);

            if (!exists)
            {
                var playlistSong = new PlayListSong
                {
                    PlayListId = playListId,
                    SongId = songId
                };

                _context.PlayListSong.Add(playlistSong);
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception("The song is already in the playlist.");
            }
        }



        public async Task<List<Songs>> GetSongsByPlayListIdAsync(int playListId)
        {
            return await _context.PlayListSong
                .Where(ps => ps.PlayListId == playListId)
                .Include(ps => ps.Song) // לוודא שטוענים את השירים
                .Select(ps => ps.Song!) // לוודא שהתוצאה לא ריקה
                .ToListAsync();
        }

        public async Task RemoveSongFromPlayListAsync(int playListId, int songId)
        {
            var playlistSong = await _context.PlayListSong
                .FirstOrDefaultAsync(ps => ps.PlayListId == playListId && ps.SongId == songId);

            if (playlistSong != null)
            {
                _context.PlayListSong.Remove(playlistSong);
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception("The song is not found in the playlist.");
            }
        }

    }
}
