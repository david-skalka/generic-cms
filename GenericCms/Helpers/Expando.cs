using System.Dynamic;
using System.Text.Json;


namespace GenericCms.Helpers;

internal static class Expando
{
    public static object? GetValue(ExpandoObject obj, string key)
    {
        if (obj is not IDictionary<string, object?> dict)
            return null;

        var actualKey = dict.Keys.FirstOrDefault(k => string.Equals(k, key, StringComparison.OrdinalIgnoreCase));

        if (actualKey is null || !dict.TryGetValue(actualKey, out var value))
            return null;

        return value is JsonElement element ? UnwrapElement(element) : value;
    }

    public static IEnumerable<ExpandoObject> GetCollection(ExpandoObject obj, string key)
    {
        if (obj is not IDictionary<string, object?> dict)
            return [];

        var actualKey = dict.Keys.FirstOrDefault(k => string.Equals(k, key, StringComparison.OrdinalIgnoreCase));

        if (actualKey is null || !dict.TryGetValue(actualKey, out var value))
            return [];

        return value switch
        {
            JsonElement { ValueKind: JsonValueKind.Array } el => el
                .EnumerateArray()
                .Select(e => JsonSerializer.Deserialize<ExpandoObject>(e.GetRawText()))
                .OfType<ExpandoObject>()
                .ToList(),

            IEnumerable<object> list => list.OfType<ExpandoObject>(),
            _ => []
        };
    }

    private static object? UnwrapElement(JsonElement element) => element.ValueKind switch
    {
        JsonValueKind.String => element.GetString(),
        JsonValueKind.Number => element.TryGetDecimal(out var d) ? d : element.GetDouble(),
        JsonValueKind.True   => true,
        JsonValueKind.False  => false,
        _                    => element.GetRawText()
    };
}
