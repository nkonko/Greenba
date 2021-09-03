using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;

namespace Source.Repository.Interfaces
{
    public interface IRepository<T> where T : BaseEntity
    {
        Task<T> GetByIdAsync(int id);

        Task<IReadOnlyList<T>> ListAllAsync();

        Task<T> GetEntityWithSpec(ISpecification<T> specification);

        Task<IReadOnlyList<T>> ListAsync(ISpecification<T> specification);

        Task<int> CountAsync(ISpecification<T> spec);

        void Add(T entity);

        void Update(T entity);

        void Delete(T entity);
    }
}
