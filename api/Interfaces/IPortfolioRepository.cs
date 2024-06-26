using api.Models;

namespace api.Interfaces;

public interface IPortfolioRepository
{
    Task<List<Stock>> GetUserPortfolioAsync(AppUser user);
    Task<Portfolio> CreateAsync(Portfolio portfolioModel);
    Task<Portfolio> DeletePortfolioAsync(AppUser appUser, string symbol);
}