
namespace case2.Domain.Model
{
    public class Experiment
    {
        public int id { get; set; }
        public Guid userid { get; set; }
        public int inputcurrent { get; set; }
        public int inputtemperature { get; set; }
        public float outputenergy { get; set; }
        public float outputcurrent { get; set; }
        public DateTime createdat { get; set; }
    }
}
