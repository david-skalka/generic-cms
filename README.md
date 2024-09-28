<h1 align="center">Welcome to Generic Headless CMS Architecture👋</h1>
<p>

 ![.Net](https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white)
 ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
 ![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)

  ![Dotnet coverage](https://gist.githubusercontent.com/david-skalka/ee887513e0318f0ceeee0caaf8271286/raw/879e7308fda0d1f2da88106f6ba6f86727befc96/dotnet-coverage.svg)
  ![Angular coverage](https://gist.githubusercontent.com/david-skalka/0205fa3b1b481951ba27260c463757aa/raw/afd0b672db6df5fafca3f910f662bca078f5628a/angular-coverage.svg)
  
</p>


This repository demonstrates a generic, testable headless CMS architecture built with .NET, MongoDB, and an Angular-based admin interface. The core principle is to represent any real-world use case through entities and their operations. The CMS allows users to define entities and associate their operations using an autofac.json configuration. A single, simple, generic EntityService with custom operations is used to handle any real-world use case, ensuring both flexibility and reusability across the system.
### 🏠 [Homepage](https://github.com/david-skalka/DotnetCmsPattern)

## Screenshots

### Entity edit
<a href="Images/Content.png">
  <img src="Images/Content.png" width="400" >
</a>



## Features
- Configure entities and their properties through autofact.json configuration
- Extend entity functionality by adding custom IEntityOperation, such as aggregation queries. (see ProductsCount operation in example)
- Collection property type (e.g. images of product)
- Hierarchical entity design using path pattern ( see Path property in example)
- Flexible query endpoint for accessing your store ( MongoDB json expression )
- Server side field validation rules


## Property types
- String
- Number
- Collection
- Autocomplete


## Prerequisites
- net8.0
- npm
- MongoDB 7.0



## Example
### Here’s an example of how the Entities/product-category.json properties file might look to represent the ProductCategory tree, including a list of products and their associated images:
```
[
  {
    "Name": "Name",
    "Type": "String",
    "DefaultValue": "",
    "Validators": [
      "NotEmpty"
    ]
  },
  {
    "Name": "Path",
    "Type": "Autocomplete",
    "DefaultValue": "",
    "DataProvider": {
      "Type": "EntityQuery",
      "Name": "ProductCategory",
      "Expression": {},
      "Property": "Path"
    }
  },
  {
    "Name": "Description",
    "Type": "String",
    "DefaultValue": ""
  },
  {
    "Name": "Products",
    "Type": "Collection",
    "DefaultValue": [],
    "Properties": [
      {
        "Name": "Name",
        "Type": "String",
        "DefaultValue": ""
      },
      {
        "Name": "Description",
        "Type": "String",
        "DefaultValue": ""
      },
      {
        "Name": "Price",
        "Type": "Number",
        "DefaultValue": ""
      },
      {
        "Name": "Images",
        "Type": "Collection",
        "DefaultValue": [],
        "Properties": [
          {
            "Name": "Title",
            "Type": "String",
            "DefaultValue": "",
            "Validators": [
              "NotEmpty"
            ]
          },
          {
            "Name": "Path",
            "DefaultValue": "",
            "Type": "String"
          }
        ]
      }
    ]
  }
]
```
### Here’s an example of what the autofac.json configuration might look like for registering the ProductCategory entity and adding an operation like ProductsCount
```
{
  "components": [
    {
      "type": "MongoDB.Driver.MongoClient, MongoDB.Driver",
      "services": [
        {
          "type": "MongoDB.Driver.IMongoClient, MongoDB.Driver"
        }
      ],
      "instanceScope": "singleInstance",
      "parameters": {
        "connectionString": "mongodb://localhost:27017"
      }
    },
    {
      "type": "DotnetCms.Services.EntityService, DotnetCms",
      "instanceScope": "singleInstance",
      "injectProperties": true,
      "properties": {
        "Name": "ProductCategory",
        "ModelPath": "Example\\Entities\\product-category.json",
        "OperationsMap": { "ProductsCount": "DotnetCms.Example.ProductCategoryProductsCountOperation" }
      },
      "services": [
        {
          "type": "Autofac.IStartable, Autofac"
        },
        {
          "type": "DotnetCms.Services.EntityService, DotnetCms"
        }
      ]
    },
    {
      "type": "DotnetCms.Example.ProductCategoryProductsCountOperation, DotnetCms",
      "instanceScope": "singleInstance",

      "services": [
        {
          "type": "DotnetCms.Services.IEntityOperation, DotnetCms"
        }
      ]
    },
    {
      "type": "DotnetCms.Services.DynamicFormService, DotnetCms",
      "instanceScope": "singleInstance"
    },
    {
      "type": "DotnetCms.DatabaseSettings, DotnetCms",
      "instanceScope": "singleInstance",
      "injectProperties": true,
      "properties": {
        "DatabaseName": "DotnetCms"

      }
    }
  ]
}
```

### Entity Query endpoint

```
curl -X 'POST' \
  'https://localhost:7000/Content/query/ProductCategory' \
  -H 'accept: text/plain' \
  -H 'Content-Type: application/json' \
  -d '{"path": {"$regex": "^Notebooks;.*" }}'
```





## Author

👤 **David Skalka**


## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
