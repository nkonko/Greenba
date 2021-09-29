using System.Threading.Tasks;
using API.Errors;
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

            return Ok(new Pagination<Log>(logsParams.PageIndex, logsParams.PageSize, 10, logs));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Log>> GetProduct(int id)
        {
            var spec = new LogsSpecification(id);

            var log = await unitOfWork.Repository<Log>().GetEntityWithSpec(spec);

            if (log == null)
            {
                return NotFound(new ApiResponse(404));
            }

            return Ok(log);
        }
    }
}
