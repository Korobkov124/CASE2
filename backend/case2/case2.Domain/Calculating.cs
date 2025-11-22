namespace case2.Domain
{
    public class Calculating
    {
        const float Usr = 4.4F;
        const float electricEquivalent = 0.336F;
        const int standardTemp = 950;
        const int standardCurrentStrength = 170; // в kA
        const float standardCurrentOutput = 90.0F; // в %

        public float energyConsumption(float currentOutput)
        {
            if (currentOutput == 0)
                throw new ArgumentException("Current output cannot be zero.", nameof(currentOutput));
            return (Usr / (currentOutput * electricEquivalent)) * 100000;
        }

        public float currentOutput(int T, int I)
        {
            int adjustedTemp = T;
            if (I != standardCurrentStrength)
            {
                int diffCurrentStrength = Diff(I, standardCurrentStrength);
                adjustedTemp += diffCurrentStrength * 5;
            }

            int diffTemp = Diff(adjustedTemp, standardTemp);
            float deltaTemp = 2 * (diffTemp / 10f);
            return standardCurrentOutput - deltaTemp;
        }

        private int Diff(int value1, int value2)
        {
            return Math.Abs(value1 - value2);
        }
    }
}
