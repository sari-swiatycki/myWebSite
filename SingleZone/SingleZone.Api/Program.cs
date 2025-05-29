//using Microsoft.EntityFrameworkCore;
//using Microsoft.IdentityModel.Tokens;
//using Microsoft.OpenApi.Models;
//using System.Text;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using SingleZone.API;
//using SingleZone.Core.entities;
//using SingleZone.Core.Interfaces;
//using SingleZone.Core.Interfaces.ServiceInterface;
//using SingleZone.Data;
//using SingleZone.Data.Repository;
//using SingleZone.Service;
//using SingleZone.Core.entities;

//var builder = WebApplication.CreateBuilder(args);

//// הוספת שירותי CORS
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAllOrigins", policy =>
//        policy.AllowAnyOrigin()
//              .AllowAnyMethod()
//              .AllowAnyHeader());
//});

//// הוספת Authentication עם JWT
//builder.Services.AddAuthentication(options =>
//{
//    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//})
//.AddJwtBearer(options =>
//{
//    options.TokenValidationParameters = new TokenValidationParameters
//    {
//        ValidateIssuer = true,
//        ValidateAudience = true,
//        ValidateLifetime = true,
//        ValidateIssuerSigningKey = true,
//        ValidIssuer = builder.Configuration["Jwt:Issuer"],
//        ValidAudience = builder.Configuration["Jwt:Audience"],
//        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
//    };
//});

//// הוספת הרשאות מבוססות-תפקידים
//builder.Services.AddAuthorization(options =>
//{
//    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
//    options.AddPolicy("EditorOrAdmin", policy => policy.RequireRole("Editor", "Admin"));
//    options.AddPolicy("ViewerOnly", policy => policy.RequireRole("Viewer"));
//});

//// הוספת שירותים
//builder.Services.AddScoped<ISongRepository, SongsRepository>();
//builder.Services.AddScoped<IRepository<PlayList>, PlayListRepository>();
//builder.Services.AddScoped<IRepository<Users>, UsersRepository>();
//builder.Services.AddScoped<IUserRepository, UsersRepository>();
//builder.Services.AddScoped<ISongsService, SongsService>();
//builder.Services.AddScoped<IPlayListService, PlayListService>();
//builder.Services.AddScoped<IUsersService, UsersService>();
//builder.Services.AddScoped<IUserRoleService, UserRoleService>();
//builder.Services.AddScoped<IRoleRpository, RoleRepository>();
//builder.Services.AddScoped<IUserRolesRepository, UserRolesRepository>();
//builder.Services.AddScoped<AuthService, AuthService>();
//builder.Services.AddScoped<IPlayListSongRepository, PlayListSongRepository>();
//builder.Services.AddScoped<IPlayListSongService, PlayListSongService>();
//builder.Services.AddScoped<IPlayListRepository, PlayListRepository>();


//// הוספת שירותי מסד נתונים
//builder.Services.AddDbContext<DataContext>(options =>
//{
//    options.UseSqlServer("Data Source=DESKTOP-SSNMLFD;Initial Catalog=SingleZone;Integrated Security=true;TrustServerCertificate=True");
//});

//builder.Services.AddAutoMapper(typeof(MappingProfile), typeof(MappingProfileApi));
//builder.Services.AddControllers();
//builder.Services.AddEndpointsApiExplorer();

//// הוספת Swagger
//builder.Services.AddSwaggerGen(c =>
//{
//    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
//});

//var app = builder.Build();

//// הגדרת סדר Middleware
//if (app.Environment.IsDevelopment())
//{
//    app.UseDeveloperExceptionPage();
//    app.UseSwagger();
//    app.UseSwaggerUI(c =>
//    {
//        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
//        c.RoutePrefix = string.Empty;
//    });
//}

//app.UseHttpsRedirection();
//app.UseCors("AllowAllOrigins");
//app.UseAuthentication();
//app.UseAuthorization();
//app.MapControllers();

//app.Run();




























using Amazon.S3;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SingleZone.API;
using SingleZone.Core.entities;
using SingleZone.Core.Interfaces.ServiceInterface;
using SingleZone.Core.Interfaces;
using SingleZone.Data.Repository;
using SingleZone.Data;
using SingleZone.Service;
using System.Text;
using Amazon.Extensions.NETCore.Setup;
using DotNetEnv;
using Microsoft.AspNetCore.Identity;


Env.Load();

var builder = WebApplication.CreateBuilder(args);

// הוספת שירותי CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());
});

// הוספת Authentication עם JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

// הוספת הרשאות מבוסס-תפקידים
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
    options.AddPolicy("EditorOrAdmin", policy => policy.RequireRole("Editor", "Admin"));
    options.AddPolicy("ViewerOnly", policy => policy.RequireRole("Viewer"));
});

// הוספת שירותי AWS S3
builder.Services.AddDefaultAWSOptions(builder.Configuration.GetAWSOptions());
builder.Services.AddSingleton<IAmazonS3>(serviceProvider =>
{
    var options = serviceProvider.GetRequiredService<IOptions<AWSOptions>>().Value;

    // הגדרת Credentials באופן ידני
    var credentials = new Amazon.Runtime.BasicAWSCredentials(
        builder.Configuration["AWS_ACCESS_KEY_ID"],
        builder.Configuration["AWS_SECRET_ACCESS_KEY"]
    );

    // הגדרת Region
    var region = Amazon.RegionEndpoint.GetBySystemName(builder.Configuration["AWS_REGION"]);


    return new AmazonS3Client(credentials, region);
});

// הוספת שירותים
builder.Services.AddScoped<ISongRepository, SongsRepository>();
builder.Services.AddScoped<IRepository<PlayList>, PlayListRepository>();
builder.Services.AddScoped<IRepository<Users>, UsersRepository>();
builder.Services.AddScoped<IUserRepository, UsersRepository>();
builder.Services.AddScoped<ISongsService, SongsService>();
builder.Services.AddScoped<IPlayListService, PlayListService>();
builder.Services.AddScoped<IUsersService, UsersService>();
builder.Services.AddScoped<IUserRoleService, UserRoleService>();
builder.Services.AddScoped<IRoleRpository, RoleRepository>();
builder.Services.AddScoped<IUserRolesRepository, UserRolesRepository>();
builder.Services.AddScoped<AuthService, AuthService>();
builder.Services.AddScoped<IPlayListSongRepository, PlayListSongRepository>();
builder.Services.AddScoped<IPlayListSongService, PlayListSongService>();
builder.Services.AddScoped<IPlayListRepository, PlayListRepository>();
builder.Services.AddScoped<IStatisticsService, StatisticsService>();
builder.Services.AddScoped<IPasswordHasher<Users>, PasswordHasher<Users>>();
builder.Services.AddScoped<TranscriptionService>();


// הוספת שירותי מסד נתונים
//builder.Services.AddDbContext<DataContext>(options =>
//{
//    options.UseSqlServer("Data Source=DESKTOP-SSNMLFD;Initial Catalog=SingleZone;Integrated Security=true;TrustServerCertificate=True");
//});



var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

builder.Services.AddAutoMapper(typeof(MappingProfile), typeof(MappingProfileApi));
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// הוספת Swagger
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
});

var app = builder.Build();

// הגדרת סדר Middleware
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        c.RoutePrefix = string.Empty;
    });
}

app.UseHttpsRedirection();
app.UseCors("AllowAllOrigins");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
