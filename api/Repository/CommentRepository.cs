using api.Data;
using api.Dtos.Comment;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace api.Repository;

public class CommentRepository : ICommentRepository
{
    private readonly ApplicationDbContext _context;
    public CommentRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Comment>> GetAllAsync(CommentQueryObject queryObject)
    {
        var comments = _context.Comments.Include(c => c.AppUser).AsQueryable();

        if (!string.IsNullOrWhiteSpace(queryObject.Symbol))
        {
            comments = comments.Where(c => c.Stock.Symbol == queryObject.Symbol);
        }

        if (queryObject.IsDescending == true)
        {
            comments = comments.OrderByDescending(c => c.CreatedOn);
        }

        return await comments.ToListAsync();
    }

    public async Task<Comment?> GetByIdAsync(int id)
    {
        return await _context.Comments.Include(c => c.AppUser).FirstOrDefaultAsync(c => c.Id == id);
    }


    public async Task<Comment> CreateAsync(Comment commentModel)
    {
        await _context.Comments.AddAsync(commentModel);
        await _context.SaveChangesAsync();
        return commentModel;
    }

    public async Task<Comment?> UpdateAsync(int id, Comment updateComment)
    {
        var existingComment = await _context.Comments.FirstOrDefaultAsync(c => c.Id == id);

        if (existingComment == null)
        {
            return null;
        }

        existingComment.Title = updateComment.Title;
        existingComment.Content = updateComment.Content;

        await _context.SaveChangesAsync();
        return existingComment;
    }

    public async Task<Comment?> DeleteAsync(int id)
    {
        var commentModel = await _context.Comments.FirstOrDefaultAsync(c => c.Id == id);

        if (commentModel == null)
        {
            return null;
        }

        _context.Comments.Remove(commentModel);
        await _context.SaveChangesAsync();
        return commentModel;
    }
}