using Domain.Entities;

namespace Domain.Specification
{
    public class LogsSpecification : BaseSpecification<Log>
    {
        public LogsSpecification(LogsSpecParams logsParams) :
            base(x =>
            ((!logsParams.DateFrom.HasValue && !logsParams.DateTo.HasValue) ||
            (logsParams.DateFrom.HasValue && logsParams.DateTo.HasValue &&
            x.Logged >= logsParams.DateFrom.Value && x.Logged <= logsParams.DateTo.Value) ||
            (logsParams.DateFrom.HasValue && !logsParams.DateTo.HasValue &&
            x.Logged >= logsParams.DateFrom.Value) ||
            (!logsParams.DateFrom.HasValue && logsParams.DateTo.HasValue &&
            x.Logged <= logsParams.DateTo.Value)) &&
            (string.IsNullOrEmpty(logsParams.Search) || x.Message.ToLower().Contains(logsParams.Search.ToLower())) &&
            (string.IsNullOrEmpty(logsParams.Level) || x.Level.ToLower().Contains(logsParams.Level.ToLower()))
            )
        {
            ApplyPaging(logsParams.PageSize * (logsParams.PageIndex - 1), logsParams.PageSize);

            if (!string.IsNullOrEmpty(logsParams.Sort))
            {
                switch (logsParams.Sort)
                {
                    case "Oldest":
                        AddOrderBy(p => p.Logged);
                        break;
                    default:
                        AddOrderByDesc(p => p.Logged);
                        break;
                }
            }
        }

        public LogsSpecification(int id) : base(x => x.Id == id)
        {
        }
    }
}
