using System.Text.Json.Serialization;
using DotNetEnv;
using linkup_ms.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;


Env.Load();

var dbHost = Environment.GetEnvironmentVariable("DB_HOST");
var dbPort = Environment.GetEnvironmentVariable("DB_PORT");
var dbDatabaseName = Environment.GetEnvironmentVariable("DB_DATABASE");
var dbUser = Environment.GetEnvironmentVariable("DB_USERNAME");
var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD");

var DefaultConnection = $"Host={dbHost};Database={dbDatabaseName};Username={dbUser};Password={dbPassword};Port={dbPort};";


var builder = WebApplication.CreateBuilder(args);
// Configurar database para usar desarrollo
// builder.Services.AddDbContext<AppDbContext>(options =>
//     options.UseNpgsql(DefaultConnection));

// Configurar servicios para usar PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
        options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
    });


// Configura Swagger para manejar JSON Patch
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Your API", Version = "v1" });

    // Configura Swagger para usar NewtonsoftJson
    c.OperationFilter<SwaggerJsonPatchOperationFilter>();
});

builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

// Clase auxiliar para configurar Swagger para JSON Patch
public class SwaggerJsonPatchOperationFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        if (operation.RequestBody?.Content.Any(x => x.Key.ToLower().Contains("json-patch+json")) == true)
        {
            operation.RequestBody.Content["application/json-patch+json"].Schema = new OpenApiSchema
            {
                Type = "array",
                Items = new OpenApiSchema
                {
                    Reference = new OpenApiReference { Type = ReferenceType.Schema, Id = "Operation" }
                }
            };
        }
    }
}