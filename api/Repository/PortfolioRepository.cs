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
}