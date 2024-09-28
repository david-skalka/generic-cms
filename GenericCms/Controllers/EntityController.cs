using Microsoft.AspNetCore.Mvc;
using System.Dynamic;
using GenericCms.Services;
using GenericCms.Models;
using GenericCms.Helpers;




namespace GenericCms.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EntityController(EntityService[] entityServices, DynamicFormService dynamicFormService, IEntityOperation[] operations) : ControllerBase
    {


        

        [HttpPost("query/{name}")]
        public IEnumerable<ExpandoObject> Query(string name, [FromBody] ExpandoObject filter)
        {
            
            return entityServices.Single(x=>x.Name==name).Query(filter).Select(x=>(ExpandoObject)x);
        }


        [HttpGet("{name}")]
        public IEnumerable<ExpandoObject> GetAll(string name)
        {
            return entityServices.Single(x => x.Name == name).Get().Select(x => (ExpandoObject)x);
        }

        [HttpGet("{name}/{id}")]
        public ActionResult<ExpandoObject> Get(string name, string id)
        {
            return entityServices.Single(x => x.Name == name).Get(id);
        }


       



        [HttpPost("{name}")]
        public ActionResult<ExpandoObject> Create(string name, ExpandoObject data)
        {

            
            Dictionary<string, string> validationResult = dynamicFormService.ValidateWorker(data, entityServices.Single(x => x.Name == name).Model, []);


            if (validationResult.Any())
            {
                return BadRequest(validationResult);
            }

            entityServices.Single(x => x.Name == name).Create(data);
            
            return Ok();
        }




        [HttpPut("{name}/{id}")]
       public ActionResult Update(string name, string id, ExpandoObject data)
       {
            
            Dictionary<string, string> validationResult = dynamicFormService.ValidateWorker(data, entityServices.Single(x => x.Name == name).Model, []);


            if (validationResult.Any())
            {
                return BadRequest(validationResult);
            }


            entityServices.Single(x => x.Name == name).Update(id, data);
            return Ok();
        }

        

       [HttpDelete("{name}/{id}")]
       public ActionResult Delete(string name, string id)
       {
            entityServices.Single(x => x.Name == name).Delete(id);
            return Ok();
       }





        [HttpGet("Descriptor/{name}")]
        public ActionResult<EntityDescriptor> Descriptor(string name)
        {
            var service = entityServices.Single(x => x.Name == name);
            return new EntityDescriptor() { Model = service.Model, Operations = service.OperationsMap.Select(operationMapItem=> {
                var operation = operations.Single(operation => operation.GetType().FullName == operationMapItem.Value);
                return new OperationDescriptor() { InputModel = operation.InputModel, OutputModel=operation.OutputModel, Name=operationMapItem.Key } ;
            }).ToArray() };
        }

        

        [HttpPost("ExecuteOperation/{name}/{operationName}")]
        public IEnumerable<ExpandoObject> ExecuteOperation(string name, string operationName, ExpandoObject data)
        {



            return entityServices.Single(x => x.Name == name).ExecuteOperation(operationName, data).Select(ToExpandoHelper.ToExpando);
            
        }


        [HttpGet("Entities")]
        public IEnumerable<string> Entities()
        {
            return entityServices.Select(x=>x.Name);

        }


    }





   


}


