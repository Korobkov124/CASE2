
namespace case2.Application.Interface
{
    public interface IGraphicService
    {
        float GetCurrentOutput(int T, int I);
        float GetEnergyConsumption(float currentOutput);
    }
}
