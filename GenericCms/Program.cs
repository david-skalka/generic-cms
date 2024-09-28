using Autofac;
using Autofac.Configuration;
using Autofac.Extensions.DependencyInjection;
using CaseExtensions;
using GenericCms.Helpers;
using JetBrains.Annotations;


namespace GenericCms;

[UsedImplicitly(ImplicitUseTargetFlags.Default)]
public class Program
{
    public static void Main(string[] args)
    {

        var builder = WebApplication.CreateBuilder(args);

        builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());

        builder.Services.AddControllers().AddNewtonsoftJson((x =>
        {
            x.SerializerSettings.Converters.Add(new ExpandoObjectConverter(y => y.ToPascalCase()));

        }));



        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(c =>
        {
            c.UseAllOfForInheritance();
        });


        


        var autofacConf = builder.Configuration.GetValue<string>("AutofacConf")!;

        var config = new ConfigurationBuilder()
            .AddJsonFile(autofacConf, optional: false, reloadOnChange: true)
            .Build();


        builder.Host.ConfigureContainer<ContainerBuilder>(containerBuilder =>
        {
            var module = new ConfigurationModule(config);
            containerBuilder.RegisterModule(module);
        });


        var app = builder.Build();
        


        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }


        app.UseHttpsRedirection();


        app.MapControllerRoute(name: "default", pattern: "{controller}/{action=Index}/{id?}");


        app.Run();

        

    }
}

