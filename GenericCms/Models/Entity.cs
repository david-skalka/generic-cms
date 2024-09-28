using JetBrains.Annotations;

namespace GenericCms.Models
{



    public class EntityDescriptor
    {

        [UsedImplicitly(ImplicitUseTargetFlags.Default)]
        public required DynamicProperty[] Model { get; init; }


        [UsedImplicitly(ImplicitUseTargetFlags.Default)]
        public required OperationDescriptor[] Operations { get; init; }

    }



    public class OperationDescriptor
    {
        [UsedImplicitly(ImplicitUseTargetFlags.Default)]
        public required string Name { get; init; }

        [UsedImplicitly(ImplicitUseTargetFlags.Default)]
        public required DynamicProperty[] InputModel { get; init; }

        [UsedImplicitly(ImplicitUseTargetFlags.Default)]
        public required DynamicProperty[] OutputModel { get; init; }


    }


}
