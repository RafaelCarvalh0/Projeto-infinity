using Infinity.Data.Repositories;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Newtonsoft.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.Intrinsics.Arm;

namespace Infinity.Api.Services
{
    public interface IApplicationFactory
    {
        Task<dynamic> CallWebService(string endPoint, RequestTypeEnum requestTypeEnum, object obj = default(object));
    }

    public class ApplicationFactory: IApplicationFactory
    {
        private HttpClient client = new();
        private Uri UriBase;

        public ApplicationFactory(ILogger<ApplicationFactory> logger, string URIBaseWhatsappAPI, string ApiKey)
        {
            UriBase = new Uri(URIBaseWhatsappAPI);
            client.Timeout = TimeSpan.FromMinutes(5);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Add("x-api-key", ApiKey);
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
        }

        public async Task<dynamic> CallWebService(string Endpoint, RequestTypeEnum method, object request = default(object))
        {
            try
            {
                string uri = UriBase + Endpoint;

                HttpResponseMessage httpResponse = new HttpResponseMessage();

                switch (method)
                {
                    case RequestTypeEnum.GET:
                        httpResponse = await client.GetAsync(uri);
                        break;
                    case RequestTypeEnum.POST:
                        httpResponse = await client.PostAsJsonAsync(uri, request);
                        break;
                    case RequestTypeEnum.PUT:
                        httpResponse = await client.PutAsJsonAsync(uri, request);
                        break;
                    case RequestTypeEnum.DELETE:
                        httpResponse = await client.DeleteAsync(uri);
                        break;
                    default:
                        break;
                }

                var json = await httpResponse.Content.ReadAsStringAsync();

                if (!httpResponse.IsSuccessStatusCode)
                {
                    if ((int)httpResponse.StatusCode >= 400 && (int)httpResponse.StatusCode <= 500)
                        return null;

                    throw new Exception("Ocorreu algum erro não esperado!");
                }

                else if (json != null && json.Length > 0)
                {
                    //var resultCore = JsonConvert.DeserializeObject(json);
                    return json;
                }

                return null;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
    }
}
