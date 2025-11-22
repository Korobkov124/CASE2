using case2.Application.Common.DTOs;
using case2.Application.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace case2.Api.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class GraphicController : ControllerBase
    {
        private readonly IGraphicService _graphicService;
        public GraphicController(IGraphicService graphicService)
        {
            _graphicService = graphicService;
        }

        [HttpGet("GraphicParametrs")]
        public IActionResult GraphicParametrs(int T, int I)
        {
            float _currentOutput = _graphicService.GetCurrentOutput(T, I);
            GraphicsDTO graphicsDTO = new GraphicsDTO
            {
                currentOutput = _currentOutput,
                energyConsumption = _graphicService.GetEnergyConsumption(_currentOutput)
            };

            return Ok(graphicsDTO);
        }
    }
}
