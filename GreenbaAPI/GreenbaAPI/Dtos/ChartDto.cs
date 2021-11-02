using System.Collections.Generic;

namespace GreenbaAPI.Dtos
{
    public class ChartDto
    {
        public List<string> Dates { get; set; }

        public List<int> ErrorCount { get; set; }
    }
}
