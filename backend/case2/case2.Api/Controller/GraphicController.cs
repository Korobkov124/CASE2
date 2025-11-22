using case2.Application.Common.DTOs;
using case2.Application.Interface;
using case2.Domain.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace case2.Api.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class GraphicController : ControllerBase
    {
        private readonly IGraphicService _graphicService;
        private readonly IExperimentService _experimentService;
        public GraphicController(IGraphicService graphicService, IExperimentService experimentService)
        {
            _graphicService = graphicService;
            _experimentService = experimentService;
        }

        [HttpGet("GraphicParametrs")]
        public async Task<IActionResult> GraphicParametrs(int T, int I, Guid UserId)
        {
            float _currentOutput = _graphicService.GetCurrentOutput(T, I);
            float _energyConsumption = _graphicService.GetEnergyConsumption(_currentOutput);
            GraphicsDTO graphicsDTO = new GraphicsDTO
            {
                currentOutput = _currentOutput,
                energyConsumption = _energyConsumption
            };

            Experiment experiment = new Experiment
            {
                userid = UserId,
                inputcurrent = T,
                inputtemperature = I,
                outputenergy = _energyConsumption,
                outputcurrent = _currentOutput
            };

            await _experimentService.AddExperiment(experiment);

            return Ok(graphicsDTO);
        }
    }
}
