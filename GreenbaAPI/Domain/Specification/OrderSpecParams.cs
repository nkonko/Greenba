using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Specification
{
    public class OrderSpecParams
    {
        public DateTime? DateTo { get; set; }

        public DateTime? DateFrom { get; set; }

        //public string State { get; set; }

        public int PageIndex { get; set; } = 1;

        public int PageSize { get => pageSize; set => pageSize = (value > MaxPageSize) ? MaxPageSize : value; }

        public string Sort { get; set; } = "Newest";

        private const int MaxPageSize = 50;

        private int pageSize = 6;
    }
}
