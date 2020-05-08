using System;
using System.Linq;
using System.Reflection;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Infrastructure.Data
{
  public class StoreContext : DbContext
  {
    // Base gives it to the base constructor (parent) DbContext();
    public StoreContext(DbContextOptions<StoreContext> options) : base(options) { }

    public DbSet<Product> Products { get; set; }
    public DbSet<ProductBrand> ProductBrands { get; set; }
    public DbSet<ProductType> ProductTypes { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<DeliveryMethod> DeliveryMethods { get; set; }

    // This method creates the migratiob
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      // base == dbContext class (where we derive from)
      base.OnModelCreating(modelBuilder);
      // The assembly where we have the our configurations
      modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

      if (Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite")
      {
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
          var properties = entityType.ClrType.GetProperties().Where(p => p.PropertyType == typeof(decimal));

          var dateTimeProperties = entityType.ClrType.GetProperties().Where(p => p.PropertyType == typeof(DateTimeOffset));

          foreach (var property in properties)
          {
            modelBuilder.Entity(entityType.Name).Property(property.Name).HasConversion<double>();
          }

          foreach (var property in dateTimeProperties)
          {
              modelBuilder.Entity(entityType.Name).Property(property.Name).HasConversion(new DateTimeOffsetToBinaryConverter());
          }
        }
      }
    }
  }
}