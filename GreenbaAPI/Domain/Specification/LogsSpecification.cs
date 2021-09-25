using Domain.Entities;

namespace Domain.Specification
{
    public class LogsSpecification : BaseSpecification<Log>
    {
        public LogsSpecification(LogsSpecParams logsParams)
        {
            ApplyPaging(logsParams.PageSize * (logsParams.PageIndex - 1), logsParams.PageSize);

            if (!string.IsNullOrEmpty(logsParams.Sort))
            {
                switch (logsParams.Sort)
                {
                    case "levelAsc":
                        AddOrderBy(p => p.Level);
                        break;
                    case "levelDesc":
                        AddOrderByDesc(p => p.Level);
                        break;
                    default:
                        AddOrderBy(p => p.Id);
                        break;
                }
            }
        }
    }
}
