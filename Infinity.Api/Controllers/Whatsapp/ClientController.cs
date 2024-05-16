using Infinity.Api.Services;
using Infinity.Entities.Models.Client;
using Infinity.Entities.Models.Client.Wapi;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Infinity.Api.Controllers.Whatsapp
{
    [ApiController]
    [Route("wapi/[controller]")]
    public class ClientController : Controller
    {
        private readonly ILogger _logger;
        private readonly IApplicationFactory _applicationFactory;

        public ClientController(IApplicationFactory applicationFactory)
        {
            _applicationFactory = applicationFactory;
        }

        // GET: wapi/Client/GetChats
        /// <summary>
        /// Retorna uma lista de todos os chats disponíveis.
        /// </summary>
        /// <param name="ClientId"></param>
        /// <returns>Retorna uma lista de todos os chats disponíveis.</returns>
        /// <response code="200">Operação realizada com exito</response>
        /// <response code="500">Ocorreu um erro interno</response>
        /// <response code="401">Usuário não autenticado</response>
        [HttpGet]
        [Route("[action]/{ClientId}")]
        public async Task<ActionResult> GetChats(string ClientId)
        {
            try
            {
                var retorno = await _applicationFactory.CallWebService($"client/getChats/{ClientId}", RequestTypeEnum.GET);

                if (retorno is null)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }

                return Ok(retorno);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"[HttpPost] session/status/ClientId: {ClientId}",
                    ClientId);

                return StatusCode(StatusCodes.Status500InternalServerError, new Models.ErrosExcessoes
                {
                    Erro = "Ocorreu um erro ao retornar a sessão.",
                    ErroDetalhado = ex.Message
                });
            }
        }

        // POST: wapi/Client/SendMessage
        /// <summary>
        /// Faz o envio de mensagens único ou em lote para a API do Whatsapp.
        /// </summary>
        /// <param name=""></param>
        /// <returns>Não retorna nada.</returns>
        /// <response code="200">Operação realizada com exito</response>
        /// <response code="500">Ocorreu um erro interno</response>
        /// <response code="401">Usuário não autenticado</response>
        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult> SendMessage(ClientRequest request)
        {
            try
            {
                HttpClient client = new HttpClient();
                byte[] imageBytes = await client.GetByteArrayAsync(request.Imagem);
                string base64Styring = Convert.ToBase64String(imageBytes);

                var model = new SendMessageWithMediaRequest()
                {
                    contentType = "string",
                    content = request.Mensagem,
                    options = new Options()
                    {
                        media = new Media
                        {
                            mimetype = "image/jpeg/png/jpg",
                            data = base64Styring,
                            filename = request.Imagem
                        }
                    }
                };

                object retorno = null;
                foreach (var item in request.contatos.celular)
                {
                    model.chatId = item;

                    var modelSerialized = JsonConvert.SerializeObject(model);
                    retorno = await _applicationFactory.CallWebService($"client/sendMessage/{request.ClientId}", RequestTypeEnum.POST, modelSerialized);

                    var teste = 1;
                }

                if (retorno is null)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }

                return Ok(retorno);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"[HttpPost] client/sendMessage/ClientId: {request}",
                    request);

                return StatusCode(StatusCodes.Status500InternalServerError, new Models.ErrosExcessoes
                {
                    Erro = "Ocorreu um erro ao retornar a sessão.",
                    ErroDetalhado = ex.Message
                });
            }
        }

        //public async Task<SendMessageWithMediaRequest> MontarRequisicao(ClientRequest request)
        //{
        //    HttpClient client = new HttpClient();

        //    byte[] imageBytes = await client.GetByteArrayAsync(request.Imagem);
        //    string base64Styring = Convert.ToBase64String(imageBytes);

        //    var model = new SendMessageWithMediaRequest()
        //    {
        //        contentType = "string",
        //        content = request.Mensagem,
        //        options = new Options()
        //        {
        //            media = new Media
        //            {
        //                mimetype = "image/jpeg/png/jpg",
        //                data = base64Styring,
        //                filename = request.Imagem
        //            }
        //        }
        //    };

        //    return model;

        //}
    }
}
