using MongoDB.Bson;
using MongoDB.Driver;


namespace GenericCmsTests
{
    public class DefaultSeeder(IMongoDatabase mongoDatabase)
    {

        readonly Dictionary<string, BsonDocument[]> _data = new() {
            { "ProductCategory" ,  [


                new ()
        {
            { "_id", new ObjectId("66e58ec49d17fbe377f68812") },
            { "Name", "Notebooks" },
            { "Path", "Notebooks" },
            { "Description", string.Empty },
            { "Products", new BsonArray() }
        },new ()
        {
            { "_id", new ObjectId("66e58ed69d17fbe377f6881a") },
            { "Name", "Lenovo" },
            { "Path", "Notebooks;Lenovo" },
            { "Description", string.Empty },
            { "Products", new BsonArray() }
        },
                new BsonDocument
        {
            { "_id", new ObjectId("66ee7dd19d17fbe377f6c53c") },
            { "Name", "ThinkPads" },
            { "Path", "Notebooks;Lenovo;ThinkPads" },
            { "Description", string.Empty },
            { "Products", new BsonArray
                {
                    new BsonDocument
                    {
                        { "Name", "Thinkpad x9" },
                        { "Description", string.Empty },
                        { "Price", 79 },
                        { "Images", new BsonArray
                            {
                                new BsonDocument
                                {
                                    { "Title", "Image1" },
                                    { "Path", "image1.jpg" }
                                }
                            }
                        }
                    }
                }
            }
        }


            ]}
            
        };





        public void Seed()
        {



            foreach (var item in _data)
            {


                mongoDatabase.GetCollection<BsonDocument>(item.Key).InsertMany(item.Value);
            }
        }


        public void Clean()
        {
            foreach (var item in _data)
            {
                mongoDatabase.GetCollection<dynamic>(item.Key).DeleteMany(Builders<dynamic>.Filter.Empty);
            }
        }







    }
}