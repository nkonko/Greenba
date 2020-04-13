using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
  public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Product>
  {
      // constructor with no paramaters
    public ProductsWithTypesAndBrandsSpecification()
    {
        AddInclude(x =>x.ProductType);
        AddInclude(x =>x.ProductBrand);
    }

    // First part is the paramater for our criteria, section part is the expression
    // The base creates a new instance of our BaseSpecification
    public ProductsWithTypesAndBrandsSpecification(int id) : base(x =>x.Id == id)
    {
        AddInclude(x =>x.ProductType);
        AddInclude(x =>x.ProductBrand);
    }

    // the other constructor (with a spec paramater)
  }
}