using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Specifications;

namespace Core.Interfaces
{
  public interface IGenericRepository<T> where T : BaseEntity
  {
    Task<T> GetByIdAsync(int id);
    Task<IReadOnlyList<T>> ListAllAsync();
    Task<T> GetEntityWithSpec(ISpecification<T> spec);
    Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec);
    Task<int> CountAsync (ISpecification<T> spec);

    // They are not asyc
    // the reason for this is we are not going to be adding the items to the db
    // when we use any of these methods.
    // We are only saying to EF we want to add this so track it (so its happening in memory).
    // Our unit of work is responsible for saving it into the db not the repository.
    void Add(T entity);
    void Update (T entity);
    void Delete (T entity);

  }
}