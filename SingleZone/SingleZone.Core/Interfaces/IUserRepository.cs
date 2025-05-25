
using SingleZone.Core.entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SingleZone.Core.Interfaces
{
    public interface IUserRepository:IRepository<Users>
    {
        //public Task<IEnumerable<Users>> GetAsync();
        //public Task<Users> GetByIdAsync(int user);
        //public Task<Users> AddAsync(Users user);
        //public Task<bool> UpdateAsync(int id, Users user);
        //public Task DeleteAsync(int id);
        Task<Users> FindByUsernameAsync(string username,string password);
        Task<Users> AddAsync(Users user);

        Task<Users?> GetByEmailAsync(string email);
    }
}
