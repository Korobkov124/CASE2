
using case2.Application.Interface;
using case2.Domain;

namespace case2.Application.Services
{
    public class GraphicService : IGraphicService
    {
        private readonly Calculating _calculating;
        public GraphicService(Calculating calculating)
        {
            _calculating = calculating;
        }
        public float GetEnergyConsumption(float currentOutput)
        {
            return _calculating.energyConsumption(currentOutput);
        }

        public float GetCurrentOutput(int T, int I)
        {
            return _calculating.currentOutput(T, I);
        }
    }
}
