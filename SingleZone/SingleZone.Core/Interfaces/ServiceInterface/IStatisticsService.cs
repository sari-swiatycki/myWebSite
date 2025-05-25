using SingleZone.Core.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SingleZone.Core.Interfaces.ServiceInterface
{
   public interface IStatisticsService
    {
        //IEnumerable<UserStatisticsDto> GetUserStatisticsAsync();
        SystemStatisticsDto GetSystemStatisticsAsync();
    }
}
