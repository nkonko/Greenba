﻿using System;

namespace Domain.Specification
{
    public class LogsSpecParams
    {
        public DateTime? DateTo { get; set; }

        public DateTime? DateFrom { get; set; }

        public string Level { get; set; }

        public string Search { get => search; set => search = value.ToLower(); }

        private string search;

        public int PageIndex { get; set; } = 1;

        public int PageSize { get => pageSize; set => pageSize = (value > MaxPageSize) ? MaxPageSize : value; }

        public string Sort { get; set; } = "Newest";

        private const int MaxPageSize = 50;

        private int pageSize = 6;
    }
}
