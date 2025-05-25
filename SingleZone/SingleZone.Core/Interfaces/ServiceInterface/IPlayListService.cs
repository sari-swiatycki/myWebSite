using SingleZone.Core.DTOs;
using SingleZone.Core.entities;

namespace SingleZone.Core.Interfaces.ServiceInterface
{
    public interface IPlayListService
    {
        List<PlayListDto> GetList();         // מחזיר את כל רשימת הפלייליסטים ב-DTO
        PlayListDto GetById(int id);         // מחזיר פלייליסט לפי מזהה כ-DTO
        Task< PlayListDto> AddPlayListAsync(PlayListDto playListDto);
       

        Task<PlayListDto> UpdateAsync(int id, PlayListDto playListDto);

        Task<bool> RemoveAsync(int id); // מסיר פלייליסט לפי מזהה
        List<PlayList> GetPlaylistsByUserId(int userId);
    }
}
