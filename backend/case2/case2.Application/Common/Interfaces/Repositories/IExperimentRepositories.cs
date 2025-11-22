using case2.Domain.Model;

namespace case2.Application.Common.Interfaces.Repositories
{
    public interface IExperimentRepositories
    {
        Task<IEnumerable<Experiment>> GetAllExperimentsByUserIdAsync(Guid userId);
        Task AddExperiment(Experiment experiment);
    }
}
