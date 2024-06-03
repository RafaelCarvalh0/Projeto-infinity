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

                var responseJson = await httpResponse.Content.ReadAsStringAsync();

                switch (Convert.ToInt32(httpResponse.StatusCode))
                {
                    case 200:
                        return responseJson; // Requisição que espera um retorno de um stored procedure
                        break;

                    case 201 or 204:
                        return null; // Recurso criado com sucesso ou sem conteúdo de retorno.
                        break;

                    case 400:
                        throw new Exception(responseJson);  // Lançamento de erro de uma requisição mal-formada (bad request)
                        break;

                    case 401:
                        throw new Exception(responseJson);  // Lançamento de excessão por falta de autenticação
                        break;

                    case 403:
                        throw new Exception(responseJson); // Lançamento de excessão por falta de permissão (unauthorized)
                        break;

                    case 404:
                        throw new Exception(responseJson); // Lançamento de excessão devido ao recurso solicitado não ser encontrado (not found)
                        break;

                    case 500:
                        throw new Exception(responseJson); // Lançamento de excessão por erro interno no servidor (internal server error)
                        break;

                    default:
                        throw new Exception(responseJson); // Default
                        break;
                }

                //if (!httpResponse.IsSuccessStatusCode)
                //{
                //    if ((int)httpResponse.StatusCode >= 400 && (int)httpResponse.StatusCode <= 500)
                //        return null;

                //    throw new Exception("Ocorreu algum erro não esperado!");
                //}

                //else if (json != null && json.Length > 0)
                //{
                //    //var resultCore = JsonConvert.DeserializeObject(json);
                //    return json;
                //}

                //return null;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
    }
}
