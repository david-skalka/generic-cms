using System.Dynamic;
using System.Text.Json;
using FluentValidation;
using GenericCms.Helpers;

namespace GenericCms.Example.Validators;

public sealed class ProductCategoryValidator : AbstractValidator<ExpandoObject>
{
    public ProductCategoryValidator()
    {
        ClassLevelCascadeMode = CascadeMode.Continue;
        RuleLevelCascadeMode  = CascadeMode.Continue;

        RuleFor(x => Expando.GetValue(x, "name"))
            .NotEmpty().WithMessage("Category name is required")
            .Configure(cfg => cfg.PropertyName = "name");

        RuleForEach(x => Expando.GetCollection(x, "products"))
            .Configure(cfg => cfg.PropertyName = "products")
            .ChildRules(product =>
            {
                product.RuleFor(p => Expando.GetValue(p, "name"))
                    .NotEmpty().WithMessage("Product name is required")
                    .Configure(cfg => cfg.PropertyName = "name");

                product.RuleForEach(p => Expando.GetCollection(p, "images"))
                    .Configure(cfg => cfg.PropertyName = "images")
                    .ChildRules(image =>
                    {
                        image.RuleFor(i => Expando.GetValue(i, "title"))
                            .Must(v => !string.IsNullOrWhiteSpace(v?.ToString()))
                            .WithMessage("Image title is empty")
                            .Configure(cfg => cfg.PropertyName = "title");

                        image.RuleFor(i => Expando.GetValue(i, "path"))
                            .NotEmpty().WithMessage("Path is missing")
                            .Configure(cfg => cfg.PropertyName = "path");
                    });
            });
    }
}