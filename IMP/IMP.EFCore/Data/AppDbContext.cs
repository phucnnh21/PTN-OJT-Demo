using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace IMP.EFCore
{
    public class AppDbContext : DbContext
    {
        public AppDbContext() { }

        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

            IConfigurationRoot configuration = builder.Build();
            optionsBuilder.UseNpgsql(configuration.GetConnectionString("AppDB"));

            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Email = "admin@gmail.com", Name = "Admin", Password= "e6e061838856bf47e1de730719fb2609", Role = UserRole.ADMIN },
                new User { Id = 2, Email = "user@gmail.com", Name = "User", Password = "e6e061838856bf47e1de730719fb2609", Role = UserRole.USER }
            );
        }
    }
}
