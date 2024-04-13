using api.Dtos.Stock;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Newtonsoft.Json;

namespace api.Service;

public class FMPService : IFMPService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;

    public FMPService(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _config = config;
    }
    public async Task<Stock?> FindStockBySymbolAsync(string symbol)
    {
        try
        {
            var result = await _httpClient
                .GetAsync($"https://financialmodelingprep.com/api/v3/profile/{symbol}?apikey={_config["FMPKey"]}");

            if (result.IsSuccessStatusCode)
            {
                var content = await result.Content.ReadAsStringAsync();
                var FMPStocks = JsonConvert.DeserializeObject<FMPStock[]>(content);
                var FMPStock = FMPStocks[0];

                if (FMPStock != null)
                {
                    return FMPStock.ToStockFromFMPStock();
                }
                return null;
            }
            return null;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return null;
        }
    }
}