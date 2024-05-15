using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Infinity.Api;
using System.IO.Compression;
using System.Reflection;
using Infinity.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddNewtonsoftJson(x => // Serializador default
{
    // Fix System.InvalidCastException
    x.SerializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.DefaultContractResolver();
});

builder.Logging.ClearProviders();
builder.Logging.AddConfiguration(builder.Configuration.GetSection("Logging"));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Logging.AddEventLog(settings =>
{
    settings.SourceName = "Infinity.Web";
    settings.LogName = "Infinity";

    // Create application log in event viewer:
    // New-EventLog -LogName Promatec -Source Promatec.Web
});

//Dados na session
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromSeconds(10);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddHttpContextAccessor();

builder.Services.AddTransient<IApplicationFactory, ApplicationFactory>(provider =>
{
    var logger = provider.GetRequiredService<ILogger<ApplicationFactory>>();

    return new ApplicationFactory(logger, builder.Configuration["URIBaseWhatsappAPI"], builder.Configuration["ApiKey"]);
});

builder.Services.AddTransient<Infinity.Data.IUniversal, Infinity.Data.Universal>(provider =>
{
    var logger = provider.GetRequiredService<ILogger<Infinity.Data.Universal>>();

    return new Infinity.Data.Universal(logger, builder.Configuration["ConnectionStrings:SQL"]);
});

builder.Services.AddTransient<Infinity.Data.Repositories.IUsuarioRepository, Infinity.Data.Repositories.UsuarioRepository>(provider =>
{
    var logger = provider.GetRequiredService<ILogger<Infinity.Data.Repositories.UsuarioRepository>>();
    var universal = provider.GetRequiredService<Infinity.Data.IUniversal>();

    var accessor = provider.GetRequiredService<IHttpContextAccessor>();
    var codigoUsuario = Convert.ToInt32(accessor.HttpContext.User.Claims.Where(x => x.Type == "userid").FirstOrDefault()?.Value ?? "0");

    return new Infinity.Data.Repositories.UsuarioRepository(logger, universal, codigoUsuario);
});

builder.Services.AddTransient<Infinity.Data.Repositories.IClienteRepository, Infinity.Data.Repositories.ClienteRepository>(provider =>
{
    var logger = provider.GetRequiredService<ILogger<Infinity.Data.Repositories.ClienteRepository>>();
    var universal = provider.GetRequiredService<Infinity.Data.IUniversal>();

    var accessor = provider.GetRequiredService<IHttpContextAccessor>();
    var codigoUsuario = Convert.ToInt32(accessor.HttpContext.User.Claims.Where(x => x.Type == "userid").FirstOrDefault()?.Value ?? "0");
    return new Infinity.Data.Repositories.ClienteRepository(logger, universal, codigoUsuario);
});

builder.Services.AddTransient<Infinity.Data.Repositories.IContatoRepository, Infinity.Data.Repositories.ContatoRepository>(provider =>
{
    var logger = provider.GetRequiredService<ILogger<Infinity.Data.Repositories.ContatoRepository>>();
    var universal = provider.GetRequiredService<Infinity.Data.IUniversal>();

    var accessor = provider.GetRequiredService<IHttpContextAccessor>();
    var codigoUsuario = Convert.ToInt32(accessor.HttpContext.User.Claims.Where(x => x.Type == "userid").FirstOrDefault()?.Value ?? "0");
    return new Infinity.Data.Repositories.ContatoRepository(logger, universal, codigoUsuario);
});

// JWT Authentication
//var secret = builder.Configuration["JWTAuth:Secret"] ?? "dsadmin@promatec.local";
//var secretBytes = System.Text.Encoding.UTF8.GetBytes(secret);

//builder.Services.AddAuthentication()
//    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
//    {
//        options.TokenValidationParameters = new TokenValidationParameters
//        {
//            ValidateIssuer = true,
//            ValidIssuer = builder.Configuration["JWTAuth:Issuer"] ?? "https://localhost:44380",
//            ValidateAudience = true,
//            ValidAudience = builder.Configuration["JWTAuth:Audience"] ?? "https://localhost:44380",
//            ValidateIssuerSigningKey = true,
//            IssuerSigningKey = new SymmetricSecurityKey(secretBytes),
//            ValidateLifetime = true
//        };
//    });

//builder.Services.AddAuthorization(options =>
//{
//    // By default, all incoming requests will be authorized according to the default policy.
//    options.FallbackPolicy = options.DefaultPolicy;
//});

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Version = "v1",
        Title = "Infinity API",
        Description = "ASP.NET Core Web API",
        Contact = new Microsoft.OpenApi.Models.OpenApiContact
        {
            Name = "Infinity Operating System",
            Email = "sac@Infinity.com",
            Url = new Uri("https://infinityOs.com.br/"),
        }
    });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization. Insira seu token abaixo, conforme exemplo a seguir. Exemplo: 'Bearer token'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement() {
                    {   new OpenApiSecurityScheme {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,
                        },
                        new List<string>()
                    }
                });

    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);

});

#region Compression
builder.Services.Configure<GzipCompressionProviderOptions>(options =>
{
    options.Level = CompressionLevel.Optimal;
});

builder.Services.AddResponseCompression(options =>
{
    //options.EnableForHttps = true;
    options.Providers.Add<GzipCompressionProvider>();
});
#endregion Compression

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configuração do middleware CORS
app.UseCors(builder =>
{
    builder.AllowAnyOrigin(); // Permitir solicitações de qualquer origem
    builder.AllowAnyMethod(); // Permitir solicitações de qualquer método (GET, POST, etc.)
    builder.AllowAnyHeader(); // Permitir solicitações de qualquer cabeçalho
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseSession();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();