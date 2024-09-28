using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Dynamic;
using JetBrains.Annotations;
using GenericCms.Models;
using Autofac;
using Newtonsoft.Json;
using GenericCms.Helpers;






namespace GenericCms.Services
{

    public class EntityService(IMongoClient mongoClient, DatabaseSettings databaseSettings, IEntityOperation[] operations) : IStartable
    {

        private readonly IMongoDatabase _mongoDatabase = mongoClient.GetDatabase(databaseSettings.DatabaseName);

        [UsedImplicitly(ImplicitUseTargetFlags.Default)]
        public required string Name { get; set; }

        [UsedImplicitly(ImplicitUseTargetFlags.Default)]
        public required  string ModelPath { get; set; }

        DynamicProperty[] _fields = [];


        public DynamicProperty[] Model => _fields;

        [UsedImplicitly(ImplicitUseTargetFlags.Default)]
        public Dictionary<string, string> OperationsMap { get; set; } = new();


        public void Start()
        {
            
            this._fields = JsonConvert.DeserializeObject<DynamicProperty[]>(File.ReadAllText(ModelPath), new JsonSerializerSettings() { Converters = [new DynamicPropertyConvertor(), new DynamicPropertyDataProviderConvertor()] })!;
        }


        public IEnumerable<dynamic> Query([FromBody] dynamic filter)
        {
            
            return _mongoDatabase.GetCollection<dynamic>(Name).Find(((ExpandoObject)filter).ToBsonDocument()).ToList();
        }


        public IEnumerable<dynamic> Get()
        {
            return _mongoDatabase.GetCollection<dynamic>(Name).Find(Builders<dynamic>.Filter.Empty).ToList();
        }

        public dynamic Get(string id)
        {
            var filterId = Builders<dynamic>.Filter.Eq("_id", ObjectId.Parse(id));
            return _mongoDatabase.GetCollection<dynamic>(Name).Find(filterId).Single();
        }



        public void Create(dynamic data)
        {
            _mongoDatabase.GetCollection<dynamic>(Name).InsertOne(data);
        }


       
        
       
       public void Update(string id, dynamic data)
       {
            var filterId = Builders<dynamic>.Filter.Eq("_id", ObjectId.Parse(id));
            _mongoDatabase.GetCollection<dynamic>(Name).ReplaceOne(filterId, data);
       }

       
       public void Delete(string id)
       {
            var filterId = Builders<dynamic>.Filter.Eq("_id", ObjectId.Parse(id));
            _mongoDatabase.GetCollection<dynamic>(Name).DeleteOne(filterId);
       }

       
        public IEnumerable<object> ExecuteOperation(string operationName, dynamic input)
        {
            var operation = operations.Single(x => x.GetType().FullName == OperationsMap[operationName]);
            return operation.Execute(input);
        }



    }





   


}


