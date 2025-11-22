

using case2.Domain.Model;

namespace case2.Application.Interface
{
    public interface IExperimentService
    {
        Task AddExperiment(Experiment experiment);
        Task<IEnumerable<Experiment>> GetAllExperimentsByUserIdAsync(Guid userId);
    }
}
