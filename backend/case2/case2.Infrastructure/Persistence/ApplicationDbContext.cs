using case2.Domain.Model;
using Microsoft.EntityFrameworkCore;

namespace case2.Infrastructure.Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {   
        }

        public DbSet<Experiment> Experiments => Set<Experiment>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Experiment>(entity =>
            {
                entity.ToTable("Experiment"); // таблица в базе должна быть с маленькими буквами

                entity.HasKey(e => e.id);
                entity.Property(e => e.id).UseIdentityColumn(); // автоинкремент int

                entity.Property(e => e.userid).IsRequired();
                entity.Property(e => e.inputcurrent).IsRequired();
                entity.Property(e => e.inputtemperature).IsRequired();
                entity.Property(e => e.outputenergy).HasPrecision(10, 5).IsRequired();
                entity.Property(e => e.outputcurrent).HasPrecision(10, 5).IsRequired();

                entity.Property(e => e.createdat)
                    .HasColumnType("date")
                    .HasDefaultValueSql("CURRENT_DATE");
            });
        }
    }
}
