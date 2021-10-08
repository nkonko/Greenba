using Domain.Entities;

namespace Domain.Specification
{
    public class LogsFiltersCountSpecification : BaseSpecification<Log>
    {
        public LogsFiltersCountSpecification(LogsSpecParams logsParams) : 
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
        }
    }
}
