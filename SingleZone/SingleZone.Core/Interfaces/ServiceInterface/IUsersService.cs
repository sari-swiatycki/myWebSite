using SingleZone.Core.DTOs;
using SingleZone.Core.entities;

namespace SingleZone.Core.Interfaces.ServiceInterface
{
    public interface IUsersService
    {
        List<UserDto> GetList();         // מחזיר את כל רשימת המשתמשים ב-DTO
        UserDto GetById(int id);         // מחזיר משתמש לפי מזהה כ-DTO
        //public UserDto AddUser(UserDto userDto);
        Task<UserDto> AddUserAsync(UserDto user, string password);
        
        Task<UserDto> UpdateAsync(int id, UserDto userDto);
      
        Task<bool> RemoveAsync(int id);
        public Task<string> AuthenticateAsync(string username, string password);
        Task<UserDto> GetUserByEmailAsync(string email);
        Task<UserDto> FindByUsernameAsync(string email, string password);
        List<UserGrowthDTO> GetUserGrowthByMonth();
    }
}
