using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Routing;
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
            app.UseStaticFiles();
            app.UseMvc();
            app.UseCors(policy => policy
                .WithHeaders("*")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .WithOrigins()
            );
        }
    }
}
