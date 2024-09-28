using GenericCms.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;




namespace GenericCms.Helpers;




public class DynamicPropertyConvertor : JsonConverter
{


    public override bool CanWrite => false;

    public override bool CanConvert(Type objectType)
    {
        return objectType == typeof(DynamicProperty);
    }

    public override object ReadJson(JsonReader reader, Type objectType, object? existingValue, JsonSerializer serializer)
    {
    

        var jObject = JObject.Load(reader);
        var typeProperty = jObject["Type"]!.Value<string>();

        DynamicProperty result;
        switch (typeProperty)
        {
            case "String":
                result = jObject.ToObject< DynamicPropertyString>(serializer)!;
                break;
            case "Number":
                result = jObject.ToObject<DynamicPropertyNumber>(serializer)!;
                break;
            case "Collection":
                result = jObject.ToObject<DynamicPropertyCollection>(serializer)!;
                break;
            case "Autocomplete":
                result = jObject.ToObject<DynamicPropertyAutocomplete>(serializer)!;
                break;
            default:
                throw new NotSupportedException($"Type '{typeProperty}' is not supported.");
        }

        return result;
    }

    public override void WriteJson(JsonWriter writer, object? value, JsonSerializer serializer)
    {
        throw new NotImplementedException();
    }
}


public class DynamicPropertyDataProviderConvertor : JsonConverter
{


    public override bool CanWrite => false;

    public override bool CanConvert(Type objectType)
    {
        return objectType == typeof(AutocompleteDataProviderModel);
    }

    public override object ReadJson(JsonReader reader, Type objectType, object? existingValue, JsonSerializer serializer)
    {


        var jObject = JObject.Load(reader);
        var typeProperty = jObject["Type"]!.Value<string>();

        AutocompleteDataProviderModelEntityQuery result;
        switch (typeProperty)
        {
            case "EntityQuery":
                result = jObject.ToObject<AutocompleteDataProviderModelEntityQuery>(serializer)!;
                break;
            default:
                throw new NotSupportedException($"Type '{typeProperty}' is not supported.");
        }

        return result;
    }

    public override void WriteJson(JsonWriter writer, object? value, JsonSerializer serializer)
    {
        throw new NotImplementedException();
    }
}




