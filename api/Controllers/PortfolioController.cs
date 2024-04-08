using api.Extensions;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/portfolio")]
public class PortfolioController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly IPortfolioRepository _portfolioRepository;

    public PortfolioController(UserManager<AppUser> userManager, IPortfolioRepository portfolioRepository)
    {
        _userManager = userManager;
        _portfolioRepository = portfolioRepository;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetUserPortfolio()
    {
        var username = User.GetUsername();
        var appUser = await _userManager.FindByNameAsync(username);
        var userPortfolios = await _portfolioRepository.GetUserPortfolioAsync(appUser);
        return Ok(userPortfolios);
    }
}