using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace GenericCmsTests
{

    public class AutofacWebApplicationFactory<TStartup> : WebApplicationFactory<TStartup> where TStartup : class
    {
        protected override IHost CreateHost(IHostBuilder builder)
        {
            builder.UseServiceProviderFactory(new CustomServiceProviderFactory());
            return base.CreateHost(builder);
        }



        
    }

    
    public class CustomServiceProviderFactory : IServiceProviderFactory<ContainerBuilder>
    {
        private readonly AutofacServiceProviderFactory _wrapped = new();
        private IServiceCollection _services = null!;


        public ContainerBuilder CreateBuilder(IServiceCollection services)
        {
            _services = services;
            return _wrapped.CreateBuilder(services);
        }

        public IServiceProvider CreateServiceProvider(ContainerBuilder containerBuilder)
        {
            var sp = _services.BuildServiceProvider();
#pragma warning disable CS0612 // Type or member is obsolete
            var filters = sp.GetRequiredService<IEnumerable<IStartupConfigureContainerFilter<ContainerBuilder>>>();
#pragma warning restore CS0612 // Type or member is obsolete

            foreach (var filter in filters)
            {
                filter.ConfigureContainer(_ => { })(containerBuilder);
            }

            return _wrapped.CreateServiceProvider(containerBuilder);
        }
    }
}
