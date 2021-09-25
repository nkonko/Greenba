namespace Domain.Specification
{
    public class LogsSpecParams
    {
        private const int MaxPageSize = 50;

        public int PageIndex { get; set; } = 1;

        public int PageSize { get => pageSize; set => pageSize = (value > MaxPageSize) ? MaxPageSize : value; }

        public string Sort { get; set; }

        private int pageSize = 6;
    }
}
