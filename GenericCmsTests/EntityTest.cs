using GenericCms;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using System.Net.Http.Json;

namespace GenericCmsTests
{
    public class Tests
    {
        private HttpClient _client;
        
        private DefaultSeeder _seeder;

        private WebApplicationFactory<Program> _factory;
        private MongoDbController _mongoDbController;

        [OneTimeSetUp]
        public void OneTimeSetUp()
        {

            string mongoPath = Path.GetFullPath(Path.Combine(TestContext.CurrentContext.TestDirectory, @"..\..\..\..\", "MongoDB"));
            var mongoPort = 27019;

            var mongoDataDir = Path.Combine(TestContext.CurrentContext.TestDirectory, "MongoDBData", Guid.NewGuid().ToString());


            if (!Directory.Exists(mongoDataDir))
            {
                Directory.CreateDirectory(mongoDataDir);
            }

            _mongoDbController = new MongoDbController(mongoPort, Path.Combine(mongoPath, "bin", "mongod.exe"), mongoDataDir);

            _mongoDbController.StartMongoDb();

            _factory = new AutofacWebApplicationFactory<Program>().WithDefaultConfigureTestContainer("mongodb://localhost:27019");

            _client = _factory.CreateClient();

            var databaseSettings = _factory.Services.GetRequiredService<DatabaseSettings>();
            var database = _factory.Services.GetRequiredService<IMongoClient>().GetDatabase(databaseSettings.DatabaseName);
            _seeder = new DefaultSeeder(database);


        }

        [OneTimeTearDown]
        public void OneTimeTearDown()
        {
            _factory.Dispose();


            _mongoDbController.StopMongoDb();

            _client.Dispose();
        }



        [SetUp]
        public void SetUp()
        {

           _seeder.Seed();


        }

        [TearDown]
        public void TearDown()
        {
            _seeder.Clean();
        }



        [Test]
        public async Task Query()
        {
            var response = await _client.PostAsJsonAsync("/Entity/Query/ProductCategory", new { });
            response.EnsureSuccessStatusCode();

        }

        [Test]
        public async Task GetAll()
        {
            var response = await _client.GetAsync("/Entity/ProductCategory");
            response.EnsureSuccessStatusCode();

        }


        [Test]
        public async Task Get()
        {
            var response = await _client.GetAsync("/Entity/ProductCategory/66e58ec49d17fbe377f68812");
            response.EnsureSuccessStatusCode();

        }




        [Test]
        public async Task Create()
        {
            var response = await _client.PostAsJsonAsync("/Entity/ProductCategory",new
            {
                name= "Notebooks",
                path= "Notebooks",
                description= "",
                products= Array.Empty<dynamic>()
            });
            response.EnsureSuccessStatusCode();

        }



        [Test]
        public async Task Update()
        {
            var response = await _client.PutAsJsonAsync("/Entity/ProductCategory/66e58ec49d17fbe377f68812", new
            {
                name = "Notebooks",
                path = "Notebooks",
                description = "",
                products = Array.Empty<dynamic>()
            });
            response.EnsureSuccessStatusCode();

        }




        [Test]
        public async Task Delete()
        {
            var response = await _client.DeleteAsync("/Entity/ProductCategory/66e58ec49d17fbe377f68812");
            response.EnsureSuccessStatusCode();

        }






        [Test]
        public async Task Descriptor()
        {
            var response = await _client.GetAsync("/Entity/Descriptor/ProductCategory");
            response.EnsureSuccessStatusCode();

        }



        [Test]
        public async Task ExecuteOperation()
        {
            var response = await _client.PostAsJsonAsync("/Entity/ExecuteOperation/ProductCategory/ProductsCount", new { MinCount=0 });
            response.EnsureSuccessStatusCode();

        }



        [Test]
        public async Task Entities()
        {
            var response = await _client.GetAsync("/Entity/Entities");
            response.EnsureSuccessStatusCode();

        }

    }
}