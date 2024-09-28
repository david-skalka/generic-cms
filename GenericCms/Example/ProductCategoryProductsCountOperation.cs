using System.Dynamic;
using GenericCms.Services;
using GenericCms.Models;
using JetBrains.Annotations;
using MongoDB.Driver;



namespace GenericCms.Example
{
    [UsedImplicitly(ImplicitUseTargetFlags.Default)]

    public class ProductCategoryProductsCountOperation(IMongoClient mongoClient, DatabaseSettings databaseSettings) : IEntityOperation
    {

        private readonly IMongoDatabase _mongoDatabase = mongoClient.GetDatabase(databaseSettings.DatabaseName);

        public DynamicProperty[] InputModel => [ new DynamicPropertyNumber() { Name="MinCount", DefaultValue=1 } ];

        public DynamicProperty[] OutputModel => [new DynamicPropertyString() { Name = "Path", DefaultValue = String.Empty }, new DynamicPropertyNumber() { Name = "Count", DefaultValue = 0 }];

        public IEnumerable<dynamic> Execute(dynamic input)
        {
            return _mongoDatabase.GetCollection<dynamic>("ProductCategory").Find(Builders<dynamic>.Filter.Empty).ToList().Select(x => ((ExpandoObject)x)).Select(x=> {
                dynamic retD = new ExpandoObject();
                retD.Path = ((dynamic)x).Path;
                retD.Count = ((dynamic)x).Products.Count;
                return retD;
            }).Where(x => x.Count > input.MinCount);
            
        }



    }





   


}


