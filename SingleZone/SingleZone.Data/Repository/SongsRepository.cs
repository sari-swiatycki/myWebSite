using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using SingleZone.Core.DTOs;
using SingleZone.Core.entities;
using SingleZone.Core.Interfaces;
using SingleZone.Data;

namespace SingleZone.Data.Repository
{
    public class SongsRepository :ISongRepository
    {
        private readonly DataContext _context;

        public SongsRepository(DataContext context)
        {
            _context = context;
        }

        public List<Songs> GetAll()
        {
            return _context.SongsList.ToList();
        }

        public async Task<Songs> AddAsync(Songs song)
        {
            try
            {
                _context.SongsList.Add(song);
                _context.SaveChanges();
                return song;
            }
            catch (Exception)
            {
                return null;
            }
        }



    

        public Songs GetById(int id)
        {
            return _context.SongsList.FirstOrDefault(s => s.Id == id);
        }

        public int GetIndexById(int id)
        {
            return _context.SongsList.ToList().FindIndex(s => s.Id == id);
        }

        //public bool Update(Songs song, int index)
        //{
        //    try
        //    {
        //        var songsList = _context.SongsList.ToList();

        //        if (index < 0 || index >= songsList.Count)
        //            return false;

        //        var existingSong = songsList[index];

        //        if (!string.IsNullOrWhiteSpace(song.Title))
        //            existingSong.Title = song.Title;

        //        if (!string.IsNullOrWhiteSpace(song.Artist))
        //            existingSong.Artist = song.Artist;

        //        if (!string.IsNullOrWhiteSpace(song.Genere))
        //            existingSong.Genere = song.Genere;

        //        if (!string.IsNullOrWhiteSpace(song.audioUrl))
        //            existingSong.audioUrl = song.audioUrl;

        //        if (song.Tags != null)
        //            existingSong.Tags = song.Tags;

        //        _context.SaveChanges();
        //        return true;
        //    }
        //    catch (Exception)
        //    {
        //        return false;
        //    }
        //}



        public async Task<Songs> UpdateAsync(Songs song, int id)
        {

            var existingSong = _context.SongsList.FirstOrDefault(c => c.Id == id);
            if (existingSong == null) return null;


            existingSong.Title = song.Title;
            existingSong.Artist = song.Artist;
            existingSong.Genere = song.Genere;
            existingSong.audioUrl = song.audioUrl;
            existingSong.Tags = existingSong.Tags;

            
            try
            {
                _context.SaveChanges();
                return song;
            }
            catch
            {
                return null;
            }
        }



        public async Task<bool> DeleteAsync(int id)
        {
            var song = _context.SongsList.FirstOrDefault(c => c.Id == id);
            if (song == null) return false;

            try
            {
                _context.SongsList.Remove(song);
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }

        }

       
        //public bool Delete(int index)
        //{
        //    try
        //    {
        //        var songsList = _context.SongsList.ToList();

        //        if (index < 0 || index >= songsList.Count)
        //            return false;

        //        _context.SongsList.Remove(songsList[index]);
        //        _context.SaveChanges();
        //        return true;
        //    }
        //    catch (Exception)
        //    {
        //        return false;
        //    }
        //}



        public List<Songs> GetSongByCategory(Categories? category = null)
        {
            if (category == null)
            {
                return _context.SongsList.ToList(); // אם לא נבחרה קטגוריה, מחזיר את כל דפי העבודה
            }

            return _context.SongsList
                                   .Where(d => d.category == category)
                                   .ToList(); // אם נבחרה קטגוריה, מחזיר רק את דפי העבודה בקטגוריה זו


        }


        public List<Songs> SearchSongs(string keyword)
        {
            return _context.SongsList           
                 // כולל נתונים מטבלת ה-Playlist
                .Where(s =>
                    s.Title.Contains(keyword) ||
                    s.Artist.Contains(keyword) ||
                    s.Genere.Contains(keyword) ||
                    s.Tags.Contains(keyword) ||
                    s.category.ToString().Contains(keyword) 
                  
                )
                .ToList();
        }
    }
}
