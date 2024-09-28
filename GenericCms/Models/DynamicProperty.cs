using JetBrains.Annotations;

namespace GenericCms.Models
{


    public abstract class DynamicProperty
    {
        [UsedImplicitly(ImplicitUseTargetFlags.Default)]
        public required string Name { get; init; }

        [UsedImplicitly(ImplicitUseTargetFlags.Default)]
        public List<string>? Validators { get; init; }

        [UsedImplicitly(ImplicitUseTargetFlags.Default)]
        public abstract string Type { get; }

        [UsedImplicitly(ImplicitUseTargetFlags.Default)]
        public required object DefaultValue { get; init; }
    }

    public class DynamicPropertyString : DynamicProperty
    {
        public override string Type => "String";
    }

    public class DynamicPropertyNumber : DynamicProperty
    {
        public override string Type => "Number";
    }

    public class DynamicPropertyCollection : DynamicProperty
    {
        [UsedImplicitly(ImplicitUseTargetFlags.Default)]
        public required DynamicProperty[] Properties { get; init; }

        public override string Type => "Collection";
    }


    public class DynamicPropertyAutocomplete : DynamicProperty
    {

        public override string Type => "Autocomplete";

        [UsedImplicitly(ImplicitUseTargetFlags.Default)]
        public required AutocompleteDataProviderModel DataProvider { get; init; }
    }



    public abstract class AutocompleteDataProviderModel {

        [UsedImplicitly(ImplicitUseTargetFlags.Default)]
        public abstract string Type { get; }
    }


    public class AutocompleteDataProviderModelEntityQuery : AutocompleteDataProviderModel
    {
        public override string Type => "EntityQuery";

        [UsedImplicitly(ImplicitUseTargetFlags.Default)]
        public required string Name { get; init; }

        [UsedImplicitly(ImplicitUseTargetFlags.Default)]
        public required dynamic Expression { get; init; }

        [UsedImplicitly(ImplicitUseTargetFlags.Default)]
        public required string Property { get; init; }

    }



}
