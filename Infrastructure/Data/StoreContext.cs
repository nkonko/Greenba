using System.Reflection;
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class StoreContext : DbContext
    {
        // Base gives it to the base constructor (parent) DbContext();
        public StoreContext(DbContextOptions<StoreContext> options) : base(options){}

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductBrand> ProductBrands { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }

        // This method creates the migratiob
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // base == dbContext class (where we derive from)
            base.OnModelCreating(modelBuilder);
            // The assembly where we have the our configurations
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        }
    }
}