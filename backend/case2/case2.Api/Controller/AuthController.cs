using case2.Application.Common.DTOs;
using case2.Application.Common.Interfaces;
using case2.Application.Common.Model;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace case2.Api.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest req)
        {
            AuthResult? authResult = await _authService.SignUpAsync(req.Email, req.Password);
            if (authResult == null || authResult.UserId == null)
            {
                return BadRequest("Registration failed");
            }
            return Ok(authResult);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest req)
        {
            AuthResult? authResult = await _authService.SignInAsync(req.Email, req.Password);
            if (authResult == null || authResult.UserId == null)
            {
                return Unauthorized("Invalid credentials");
            }
            return Ok(authResult);
        }
    }
}
