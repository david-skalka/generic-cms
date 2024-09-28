using Microsoft.AspNetCore.Mvc;
using System.Dynamic;
using GenericCms.Models;



namespace GenericCms.Services
{

    public class DynamicFormService : ControllerBase
    {

  


        public Dictionary<string, string> ValidateWorker(ExpandoObject deserialized, DynamicProperty[] fields, string[] path)
        {
            var fceValidators = new Dictionary<string, Func<object, string?>>() {

                { "NotEmpty", value =>(string)value == string.Empty ? "Value is empty" : null   }
            };



            Dictionary<string, object> values = deserialized.ToDictionary(x => x.Key, x => x.Value!);


            Dictionary<string, string> retD = fields.Where(x => x.Validators != null).ToDictionary(x => x.Name, x =>
            {
                return x.Validators!.Select(validator => fceValidators[validator](values[x.Name])).Where(y => y != null).Select(y=>y!).ToArray();
            }).Where(y => y.Value.Any()).ToDictionary(y => string.Join(".", path.Concat([y.Key])), y => y.Value.First());


            fields.Where(x => x.GetType() == typeof(DynamicPropertyCollection)).ToList().ForEach(field =>
            {

                var collection = (List<dynamic>)values[field.Name];
                var index = 0;
                collection.ForEach(item =>
                {
                    Dictionary<string, string> nextRetD = ValidateWorker(item, ((DynamicPropertyCollection)field).Properties, path.Concat([string.Format($"{field.Name}[{index}]")]).ToArray());
                    retD = retD.Concat(nextRetD.Select(x => new KeyValuePair<string, string>(x.Key, x.Value))).ToDictionary(x => x.Key, x => x.Value);
                    index++;
                });


            });

            return retD;

        }



    }






}


