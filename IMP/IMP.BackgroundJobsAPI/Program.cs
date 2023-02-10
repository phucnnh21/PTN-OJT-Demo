using Hangfire;
using Hangfire.PostgreSql;
using HangfireBasicAuthenticationFilter;
using IMP.BackgroundServices;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddBackgroundSevices(builder.Configuration);

builder.Services.AddCors();

string hangfireDb = Environment.GetEnvironmentVariable("ConnectionString_Hangfire") ?? builder.Configuration.GetConnectionString("Hangfire") ?? string.Empty;

// Hangfire
builder.Services.AddHangfire(config => config.UsePostgreSqlStorage(hangfireDb));
builder.Services.AddHangfireServer();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
    app.UseSwagger();
    app.UseSwaggerUI();
// }

app.UseCors(opt => opt.WithOrigins(builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>())
                      .AllowAnyHeader()
                      .AllowAnyMethod()
                      .AllowCredentials());

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseHangfireDashboard(
    "/hangfire",
    new DashboardOptions
    {
        Authorization = new[]  {
                new HangfireCustomBasicAuthenticationFilter {
                    User = Environment.GetEnvironmentVariable("Hangfire_User") ?? builder.Configuration.GetValue<string>("HangfireSettings:UserName"),
                    Pass = Environment.GetEnvironmentVariable("Hangfire_Password") ?? builder.Configuration.GetValue<string>("HangfireSettings:Password")
                }
            }
    });

app.MapControllers();

app.Run();
