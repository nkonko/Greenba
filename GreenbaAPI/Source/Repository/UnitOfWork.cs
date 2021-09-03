using System;
using System.Collections;
using System.Threading.Tasks;
using Domain;
using Source.Repository.Interfaces;

namespace Source.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly StoreContext context;

        private Hashtable repositories;

        public UnitOfWork(StoreContext context)
        {
            this.context = context;
        }

        public async Task<int> Complete()
        {
            return await context.SaveChangesAsync();
        }

        public void Dispose()
        {
            context.Dispose();
        }

        public IRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {
            if (repositories == null)
            {
                repositories = new Hashtable();
            }

            var type = typeof(TEntity).Name;

            if(!repositories.ContainsKey(type))
            {
                var repositoryType = typeof(Repository<>);
                var repositoryInstance = Activator.CreateInstance(repositoryType.MakeGenericType(typeof(TEntity)), context);

                repositories.Add(type, repositoryInstance);
            }

            return (IRepository<TEntity>)repositories[type];
        }
    }
}
