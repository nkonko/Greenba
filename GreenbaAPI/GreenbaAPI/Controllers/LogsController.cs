using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Errors;
using Domain.Entities;
using Domain.Specification;
using GreenbaAPI.Dtos;
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

            var countSpec = new LogsFiltersCountSpecification(logsParams);

            var totalItems = await unitOfWork.Repository<Log>().CountAsync(countSpec);

            return Ok(new Pagination<Log>(logsParams.PageIndex, logsParams.PageSize, totalItems, logs));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Log>> GetLog(int id)
        {
            var spec = new LogsSpecification(id);

            var log = await unitOfWork.Repository<Log>().GetEntityWithSpec(spec);

            if (log == null)
            {
                return NotFound(new ApiResponse(404));
            }

            return Ok(log);
        }

        [HttpGet("getchartdata")]
        public async Task<ActionResult<ChartDto>> GetChartData()
        {
            var response = new ChartDto() { Dates = new List<string>(), ErrorCount = new List<int>() };

            var specParams = new LogsSpecParams() { Level = "Error", PageSize = 1000 };

            var spec = new LogsSpecification(specParams);

            var logs = await unitOfWork.Repository<Log>().ListAsync(spec);

            if (logs == null)
            {
                return NotFound(new ApiResponse(404));
            }

            var dates = logs.GroupBy(x => x.Logged);

            foreach (var date in dates)
            {
                response.Dates.Add(date.Key.ToString("dd-mm-yyyy"));
                response.ErrorCount.Add(date.Count());
            }

            return Ok(response);
        }
    }
}
