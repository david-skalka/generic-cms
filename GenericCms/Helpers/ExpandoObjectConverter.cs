using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using System.Dynamic;


namespace GenericCms.Helpers;


public class ExpandoObjectConverter(Func<string, string> propertyNameResolver) : JsonConverter<ExpandoObject>
{

    

   
    

    public override ExpandoObject ReadJson(JsonReader reader, Type objectType, ExpandoObject? existingValue, bool hasExistingValue, JsonSerializer serializer)
    {
        var jToken = JToken.Load(reader);
        return ConvertJTokenToExpando(jToken);
    }

    private ExpandoObject ConvertJTokenToExpando(JToken token)
    {
        if (token is JObject jObject)
        {
            return ToExpando(jObject);
        }
        else
        {
            throw new JsonSerializationException("Expected a JObject.");
        }
    }

    private ExpandoObject ToExpando(JObject jObject)
    {
        var expando = new ExpandoObject() as IDictionary<string, object>;

        foreach (var property in jObject.Properties())
        {
            if (property.Value is JObject propertyJObject)
            {
                expando.Add(propertyNameResolver(property.Name), ToExpando(propertyJObject));
            }
            else if (property.Value is JArray propertyJarray)
            {
                expando.Add(propertyNameResolver(property.Name), HandleJArray(propertyJarray));
            }
            else
            {
                expando.Add(propertyNameResolver(property.Name), property.Value.ToObject<object>()!);
            }
        }

        return (ExpandoObject)expando!;
    }

    private List<object> HandleJArray(JArray jArray)
    {
        var list = new List<object>();

        foreach (var item in jArray)
        {
            if (item is JObject itemJObject)
            {
                list.Add(ToExpando(itemJObject));
            }
            else if (item is JArray itemJArray)
            {
                list.Add(HandleJArray(itemJArray));
            }
            else
            {
                list.Add(item.ToObject<object>()!);
            }
        }

        return list;
    }

    public override void WriteJson(JsonWriter writer, ExpandoObject? value, JsonSerializer serializer)
    {
        var res = JsonConvert.SerializeObject(value, new JsonSerializerSettings() { ContractResolver=new CamelCasePropertyNamesContractResolver() });
        writer.WriteRawValue(res);
        
    }
}