using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class StoreContext : DbContext
    {
        // Base gives it to the base constructor (parent) DbContext();
        public StoreContext(DbContextOptions<StoreContext> options) : base(options){}

        public DbSet<Product> Products { get; set; }
    }
}