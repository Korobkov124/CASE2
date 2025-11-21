using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace case2.Api.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [Authorize]
        [HttpGet("test")]
        public IActionResult GetTest()
        {
            return Ok("Test successful");
        }
    }
}
