using GenericCms.Models;



namespace GenericCms.Services
{

    public interface IEntityOperation
    {

        DynamicProperty[] InputModel { get; }

        DynamicProperty[] OutputModel { get; }

        IEnumerable<object> Execute(dynamic input);

    }





   


}


