using Infinity.Api.Services;
using Infinity.Entities.Models.Client;
using Microsoft.AspNetCore.Mvc;

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
        /// <param name="ClientId"></param>
        /// <returns>Não retorna nada.</returns>
        /// <response code="200">Operação realizada com exito</response>
        /// <response code="500">Ocorreu um erro interno</response>
        /// <response code="401">Usuário não autenticado</response>
        [HttpPost]
        [Route("[action]/{ClientId}")]
        public async Task<ActionResult> SendMessage(ClientRequest request)
        {
            try
            {
                var retorno = await _applicationFactory.CallWebService($"client/sendMessage/{request.ClientId}", RequestTypeEnum.POST, request);

                if (retorno is null)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }

                return Ok(retorno);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"[HttpPost] client/sendMessage/ClientId: {request.ClientId}",
                    request);

                return StatusCode(StatusCodes.Status500InternalServerError, new Models.ErrosExcessoes
                {
                    Erro = "Ocorreu um erro ao retornar a sessão.",
                    ErroDetalhado = ex.Message
                });
            }
        }
    }
}
