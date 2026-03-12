using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace PortalWeb.Swagger
{
    public class FileUploadOperationFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            // Chỉ áp dụng cho các endpoint có [Consumes("multipart/form-data")]
            var hasConsumesAttribute = context.MethodInfo
                .GetCustomAttributes(typeof(ConsumesAttribute), false)
                .Cast<ConsumesAttribute>()
                .Any(attr => attr.ContentTypes.Contains("multipart/form-data"));

            if (!hasConsumesAttribute)
                return;

            // Tạo schema đơn giản cho file upload
            operation.RequestBody = new OpenApiRequestBody
            {
                Content = new Dictionary<string, OpenApiMediaType>
                {
                    ["multipart/form-data"] = new OpenApiMediaType
                    {
                        Schema = new OpenApiSchema
                        {
                            Type = "object",
                            Properties = new Dictionary<string, OpenApiSchema>
                            {
                                ["Title"] = new OpenApiSchema
                                {
                                    Type = "string",
                                    Description = "News title"
                                },
                                ["Content"] = new OpenApiSchema
                                {
                                    Type = "string",
                                    Description = "News content"
                                },
                                ["Image"] = new OpenApiSchema
                                {
                                    Type = "string",
                                    Format = "binary",
                                    Description = "Image file"
                                }
                            },
                            Required = new HashSet<string> { "Title", "Content" }
                        }
                    }
                }
            };
        }
    }
}