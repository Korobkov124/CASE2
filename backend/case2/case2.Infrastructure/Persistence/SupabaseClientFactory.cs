
using Microsoft.Extensions.Configuration;

namespace case2.Infrastructure.Persistence
{
    public class SupabaseClientFactory
    {
        private readonly IConfiguration _config;

        public SupabaseClientFactory(IConfiguration config)
        {
            _config = config;
        }

        public Supabase.Client Create()
        {
            return new Supabase.Client(
                _config["Supabase:Url"]!,
                _config["Supabase:AnonKey"]
            );
        }
    }
}
