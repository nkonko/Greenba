using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Core.Specifications
{
    public interface ISpecification<T>
    {   
        // Where criteria 36
        Expression<Func<T, bool>> Criteria { get;}
        List<Expression<Func<T, object>>> Includes {get;}
    }
}