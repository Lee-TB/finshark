using api.Extensions;
using api.Interfaces;
using api.Models;
using api.Repository;
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
    private readonly IStockRepository _stockRepository;

    public PortfolioController(UserManager<AppUser> userManager, IPortfolioRepository portfolioRepository, IStockRepository stockRepository)
    {
        _userManager = userManager;
        _portfolioRepository = portfolioRepository;
        _stockRepository = stockRepository;
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

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> AddPortfolio(string symbol)
    {
        var username = User.GetUsername();
        var appUser = await _userManager.FindByNameAsync(username);

        var stock = await _stockRepository.GetBySymbolAsync(symbol);

        if (stock == null)
        {
            return BadRequest("Stock not found");
        }

        var userPortfolio = await _portfolioRepository.GetUserPortfolioAsync(appUser);

        if (userPortfolio.Any(x => x.Symbol.ToLower() == symbol.ToLower()))
        {
            return BadRequest("Cannot add same stock to portfolio");
        }

        var portfolioModel = new Portfolio
        {
            StockId = stock.Id,
            AppUserId = appUser.Id,
        };

        await _portfolioRepository.CreateAsync(portfolioModel);
        return Created();
    }

    [HttpDelete]
    [Authorize]
    public async Task<IActionResult> DeletePortfolio(string symbol)
    {
        var username = User.GetUsername();
        var appUser = await _userManager.FindByNameAsync(username);

        var userPortfolio = await _portfolioRepository.GetUserPortfolioAsync(appUser);

        var filteredStock = userPortfolio.Where(x => x.Symbol.ToLower() == symbol.ToLower()).ToList();

        if (filteredStock.Count == 1)
        {
            await _portfolioRepository.DeletePortfolioAsync(appUser, symbol);
        }
        else
        {
            return BadRequest("Stock not in your portfolio");
        }

        return Ok();
    }
}