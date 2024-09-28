using System.Dynamic;
using System.Reflection;

namespace GenericCms.Helpers
{
    public static class ToExpandoHelper
    {
        public static ExpandoObject ToExpando(object obj)
        {

            var expando = new ExpandoObject();
            var dict = (IDictionary<string, object>)expando!;

            foreach (PropertyInfo property in obj.GetType().GetProperties(BindingFlags.Public | BindingFlags.Instance))
            {
                if (property.CanRead)
                {
                    dict[property.Name] = property.GetValue(obj)!;
                }
            }

            return expando;
        }
    }
}
