using SingleZone.Core.entities;
using System.Collections.Generic;

namespace SingleZone.Core.Interfaces
{
    public interface IRepository<T>
    {
        List<T> GetAll();

        

        Task<T> AddAsync(T entity);

        T GetById(int id);

        int GetIndexById(int id);

        Task<T> UpdateAsync(T entity, int index);


        Task<bool> DeleteAsync(int index);
        
     
    }
}
