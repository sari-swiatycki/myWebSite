
using SingleZone.Core.entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SingleZone.Core.Interfaces.ServiceInterface
{
    public interface IUserRoleService
    {
        public Task<UserRoles> AddAsync(string role, int userId);

    }
}
