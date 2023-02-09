using FirebaseAdmin;
using FluentValidation;
using FluentValidation.AspNetCore;
using Google.Apis.Auth.OAuth2;
using IMP.AppServices;
using IMP.AppServices.Validators;
using IMP.EFCore;
using IMP.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext(builder.Configuration);
builder.Services.AddInfrastructureSevice();
builder.Services.AddAppSevice(builder.Configuration);

System.Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", "D:\\Projects\\ptn-demo-firebase-adminsdk-xqn0i-7e6cb169a6.json");

FirebaseApp.Create(new AppOptions()
{
    Credential = GoogleCredential.GetApplicationDefault(),
    ServiceAccountId = "firebase-adminsdk-xqn0i@ptn-demo.iam.gserviceaccount.com"
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateLifetime = true,
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"]))
        };

        opt.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var accessToken = context.Request.Query["access_token"];

                // If the request is for our hub...
                var path = context.HttpContext.Request.Path;
                if (!string.IsNullOrEmpty(accessToken) &&
                    (path.StartsWithSegments("/notification")))
                {
                    // Read the token out of the query string
                    context.Token = accessToken;
                }
                return Task.CompletedTask;
            }
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddCors();

builder.Services.AddControllers();

builder.Services.AddFluentValidationAutoValidation().AddFluentValidationClientsideAdapters();

builder.Services.AddValidatorsFromAssemblyContaining<AuthPasswordUpdateDtoValidator>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(opt => opt.WithOrigins(builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>())
                      .AllowAnyHeader()
                      .AllowAnyMethod()
                      .AllowCredentials());

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

