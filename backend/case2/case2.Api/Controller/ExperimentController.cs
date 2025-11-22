using case2.Application.Interface;
using case2.Domain.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace case2.Api.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExperimentController : ControllerBase
    {
        private readonly IExperimentService _experimentService; 

        public ExperimentController(IExperimentService experimentService)
        {
            _experimentService = experimentService;
        }

        [HttpGet("GetAllByUserId")]

        public async Task<IActionResult> GetAllByUserId([FromQuery] Guid userId)
        {
            IEnumerable<Experiment> experiments = await _experimentService.GetAllExperimentsByUserIdAsync(userId);
            return Ok(experiments);
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] Experiment experiment)
        {
            await _experimentService.AddExperiment(experiment);
            return Ok();
        }
    }
}
