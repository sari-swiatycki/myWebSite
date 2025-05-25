
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
    public class UserRoleService : IUserRoleService
    {
        private readonly IUserRolesRepository _userRolesRepository;
        private readonly IRoleRpository _roleRpository;

        public UserRoleService(IUserRolesRepository userRolesRepository, IRoleRpository roleRpository)
        {
            _userRolesRepository = userRolesRepository;
            _roleRpository = roleRpository;

        }
        public async Task<UserRoles> AddAsync(string role, int userId)
        {
            var r = await _roleRpository.GetIdByRoleAsync(role);
            if (r == null)
                return null;
            
            UserRoles u = await _userRolesRepository.AddAsync(new UserRoles { RoleId = r.Id, UserId = userId });
            Console.WriteLine("userIddfcgvbhujnimkol;'dcftgbhujniko" + u.UserId);
            return u;
        }
    }
}
