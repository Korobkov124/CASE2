using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace case2.Infrastructure.Persistence.Models
{
    [Table("User")]
    public class UserRecord : BaseModel
    {
        [PrimaryKey("Id", true)]
        [Column("Id")]
        public string Id { get; set; }

        [Column("Name")]
        public string Name { get; set; }
    }
}
