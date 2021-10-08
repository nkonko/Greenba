using Ardalis.Specification;
using Domain.Entities;

namespace Domain.Specification
{
    public class LogsSpecification : BaseSpecification<Log>
    {
        public LogsSpecification(LogsSpecParams logsParams):
            base(x =>
            (logsParams.DateFrom.HasValue && logsParams.DateTo.HasValue &&
            x.Logged >= logsParams.DateFrom.Value && x.Logged <= logsParams.DateTo.Value) ||
            (logsParams.DateFrom.HasValue && !logsParams.DateTo.HasValue &&
            x.Logged >= logsParams.DateFrom.Value) ||
            (!logsParams.DateFrom.HasValue && logsParams.DateTo.HasValue &&
            x.Logged <= logsParams.DateTo.Value)
            )
        {
        }

        public LogsSpecification(int id) : base(x => x.Id == id)
        {
        }
    }
}
