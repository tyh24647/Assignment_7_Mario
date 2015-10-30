using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Framework.DependencyInjection;
using Assignment_7_Mario.Services;

namespace Assignment_7_Mario {
    public class Startup {
        public Startup(IHostingEnvironment env) { }


        public void ConfigureServices(IServiceCollection services) {
            services.AddSingleton<IMarioService, MarioService>();
            services.AddMvc();
        }


        public void Configure(IApplicationBuilder app, IHostingEnvironment env) {
            app.UseCors(policy => policy
                .WithOrigins("*")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .WithExposedHeaders()
            );

            app.UseStaticFiles();
            app.UseMvc();
        }
    }
}
