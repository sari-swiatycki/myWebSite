
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SingleZone.Core.entities;

//using static SingleZone.Core.entities.Users;

namespace SingleZone.Core.Interfaces
{
    public interface IRoleRpository
    {
        Task<IEnumerable<Roles>> GetAllAsync();
        public Task<Roles> GetRoleByIdAsync(int id);
        public Task<Roles> GetIdByRoleAsync(string role);
        public Task<Roles> AddAsync(Roles role);
        public Task<bool> UpdateAsync(int id, Roles role);
        Task DeleteAsync(int id);
        public int GetIdByRole(string role);
    }
}
