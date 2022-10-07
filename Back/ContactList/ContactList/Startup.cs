using AutoMapper;
using ContactList.Domain.Models;
using ContactList.Domain.Service;
using ContactList.Infra.Context;
using ContactList.Infra.Entities;
using ContactList.Infra.Service;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace ContactList
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(
                context => context.UseSqlite(Configuration.GetConnectionString("Default"))
            );
            services.AddControllers()
                .AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling =
                    Newtonsoft.Json.ReferenceLoopHandling.Ignore
                );
            services.AddCors();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ContactList.API", Version = "v1" });
            });

            var config = new MapperConfiguration(cfg =>
            {
                #region Contacts
                cfg.CreateMap<ContactDto, Contact>().ReverseMap();
                #endregion

                #region Persons
                cfg.CreateMap<PersonDto, Person>().ReverseMap();
                #endregion
            });
            IMapper mapper = config.CreateMapper();
            services.AddSingleton(mapper);

            services.AddScoped<IContactService, ContactService>();
            services.AddScoped<IPersonService, PersonService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ContactList.API v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors(c => c.AllowAnyHeader()
                              .AllowAnyMethod()
                              .AllowAnyOrigin()

            );

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
