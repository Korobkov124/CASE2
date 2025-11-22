
using case2.Application.Common.Interfaces.Repositories;
using case2.Domain.Model;
using Microsoft.EntityFrameworkCore;
using Supabase.Gotrue;
using System;

namespace case2.Infrastructure.Persistence.Repositories
{
    public class ExperimentRepositories : IExperimentRepositories
    {
        private readonly ApplicationDbContext _context;
        private readonly Random _rnd;
        public ExperimentRepositories(ApplicationDbContext context)
        {
            _context = context;
            _rnd = new Random();
        }

        public async Task<IEnumerable<Experiment>> GetAllExperimentsByUserIdAsync(Guid userId)
        {
            return await _context.Experiments.Where(e => e.userid == userId).ToListAsync();
        }

        public async Task AddExperiment(Experiment experiment)
        {
            try
            {
                experiment.createdat = DateTime.Now;
                experiment.id = _rnd.Next(1, 1000000);
                await _context.Experiments.AddAsync(experiment);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine($"Ошибка базы данных: {ex.InnerException?.Message}");
                throw;
            }

        }
    }
}
