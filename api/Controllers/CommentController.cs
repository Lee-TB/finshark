using api.Dtos.Comment;
using api.Extensions;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/comment")]
public class CommentController : ControllerBase
{
    private readonly ICommentRepository _commentRepo;
    private readonly IStockRepository _stockRepo;
    private readonly UserManager<AppUser> _userManager;
    private readonly IFMPService _fmpService;
    public CommentController(ICommentRepository commentRepo, IStockRepository stockRepo,
    UserManager<AppUser> userManager, IFMPService fmpService)
    {
        _commentRepo = commentRepo;
        _stockRepo = stockRepo;
        _userManager = userManager;
        _fmpService = fmpService;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetAll([FromQuery] CommentQueryObject queryObject)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var comments = await _commentRepo.GetAllAsync(queryObject);
        var commentsDto = comments.Select(comment => comment.ToCommentDto());
        return Ok(commentsDto);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var comment = await _commentRepo.GetByIdAsync(id);

        if (comment == null)
        {
            return NotFound();
        }

        return Ok(comment.ToCommentDto());
    }

    [Authorize]
    [HttpPost("{symbol:alpha}")]
    public async Task<IActionResult> Create([FromRoute] string symbol, CreateCommentDto commentDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var stock = await _stockRepo.GetBySymbolAsync(symbol);

        if (stock == null)
        {
            stock = await _fmpService.FindStockBySymbolAsync(symbol);
            if (stock == null)
            {
                return BadRequest("Stock does not exists");
            }
            else
            {
                await _stockRepo.CreateAsync(stock);
            }
        }

        var userName = User.GetUsername();
        var appUser = await _userManager.FindByNameAsync(userName);

        var commentModel = commentDto.ToCommentFromCreate(stock.Id);
        commentModel.AppUserId = appUser.Id;

        await _commentRepo.CreateAsync(commentModel);

        return CreatedAtAction(nameof(GetById), new { id = commentModel.Id }, commentModel.ToCommentDto());
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCommentRequestDto updateDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var commentModel = await _commentRepo.UpdateAsync(id, updateDto.ToCommentFromUpdate());

        if (commentModel == null)
        {
            return NotFound("Comment not found");
        }

        return Ok(commentModel.ToCommentDto());
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var commentModel = await _commentRepo.DeleteAsync(id);

        if (commentModel == null)
        {
            return NotFound("Comment does not exist");
        }

        return Ok(commentModel.ToCommentDto());
    }
}