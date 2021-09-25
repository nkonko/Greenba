using System.Threading.Tasks;
using Domain.Entities;
using Domain.Specification;
using GreenbaAPI.Helpers;
using Microsoft.AspNetCore.Mvc;
using Source.Repository.Interfaces;

namespace GreenbaAPI.Controllers
{
    public class LogsController : BaseApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public LogsController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<Log>>> GetLogs([FromQuery] LogsSpecParams logsParams)
        {
            var spec = new LogsSpecification(logsParams);

            var logs = await unitOfWork.Repository<Log>().ListAsync(spec);

            return Ok(new Pagination<Log>(logsParams.PageIndex, logsParams.PageSize, 0, logs));
        }
    }
}
