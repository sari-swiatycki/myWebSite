using SingleZone.Core.DTOs;
using SingleZone.Core.entities;

namespace SingleZone.Core.Interfaces.ServiceInterface
{
    public interface ISongsService
    {

        List<SongDto> GetList();         // מחזיר את כל רשימת השירים ב-DTO
        SongDto GetById(int id);         // מחזיר שיר לפי מזהה כ-DTO
       Task <SongDto> AddSongAsync(SongDto songDto);  // מוסיף שיר חדש מ-DTO
    

        Task<SongDto> UpdateAsync(int id, SongDto songDto);
        Task<bool> RemoveAsync(int id);
        // מסיר שיר לפי מזהה
        IEnumerable<SongDto> GetSongByCategory(Categories? category = null);
        List<SongDto> SearchSongsByKeyword(string keyword);
        Task<bool> AddRatingAsync(int songId, double rating);
    }
}
