
using Autofac;
using GenericCms;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using MongoDB.Driver;

namespace GenericCmsTests.Support
{

    public static class AutofacWebApplicationFactoryExtensions
    {
        public static WebApplicationFactory<Program> WithDefaultConfigureTestContainer(this AutofacWebApplicationFactory<Program> factory, string connectionString)
        {
            return factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureTestContainer<ContainerBuilder>(x =>
                {
                    x.RegisterInstance<IMongoClient>(new MongoClient(connectionString)).As<IMongoClient>();
                });
            });


        }
    }

}
