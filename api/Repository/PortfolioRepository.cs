using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository;

public class PortfolioRepository : IPortfolioRepository
{
    private readonly ApplicationDbContext _context;
    public PortfolioRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Stock>> GetUserPortfolioAsync(AppUser user)
    {
        return await _context.Portfolios.Where(p => p.AppUserId == user.Id)
        .Select(p => new Stock
        {
            Id = p.Stock.Id,
            Symbol = p.Stock.Symbol,
            CompanyName = p.Stock.CompanyName,
            Purchase = p.Stock.Purchase,
            Industry = p.Stock.Industry,
            MarketCap = p.Stock.MarketCap,

        }).ToListAsync();
    }

    public async Task<Portfolio> CreateAsync(Portfolio portfolioModel)
    {
        await _context.Portfolios.AddAsync(portfolioModel);
        await _context.SaveChangesAsync();
        return portfolioModel;
    }

    public async Task<Portfolio> DeletePortfolioAsync(AppUser appUser, string symbol)
    {
        var portfolioModel = await _context.Portfolios.FirstOrDefaultAsync(x => x.AppUserId == appUser.Id && x.Stock.Symbol == symbol);

        if (portfolioModel == null)
        {
            return null;
        }

        _context.Portfolios.Remove(portfolioModel);
        await _context.SaveChangesAsync();
        return portfolioModel;
    }
}