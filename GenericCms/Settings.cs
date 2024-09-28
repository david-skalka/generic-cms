using JetBrains.Annotations;

namespace GenericCms;





[UsedImplicitly(ImplicitUseTargetFlags.Default)]
public class DatabaseSettings
{
    [UsedImplicitly(ImplicitUseTargetFlags.Default)]
    public required string DatabaseName { get; init; }
}