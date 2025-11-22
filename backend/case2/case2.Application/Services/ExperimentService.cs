

using case2.Application.Common.Interfaces.Repositories;
using case2.Domain.Model;
using case2.Application.Interface;

namespace case2.Application.Services
{
    public class ExperimentService: IExperimentService
    {
        private readonly IExperimentRepositories _experimentRepositories;

        public ExperimentService(IExperimentRepositories experimentRepositories)
        {
            _experimentRepositories = experimentRepositories;
        }

        public async Task AddExperiment(Experiment experiment)
        {
           await _experimentRepositories.AddExperiment(experiment);
        }
        public async Task<IEnumerable<Experiment>> GetAllExperimentsByUserIdAsync(Guid userId)
        {
            return await _experimentRepositories.GetAllExperimentsByUserIdAsync(userId);
        }
    }
}
