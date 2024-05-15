using Infinity.Api.Services;
using Infinity.Entities.Models.Chat;
using Microsoft.AspNetCore.Mvc;

namespace Infinity.Api.Controllers.Whatsapp
{
    [ApiController]
    [Route("wapi/[controller]")]
    public class ChatController : Controller
    {
        private readonly ILogger _logger;
        private readonly IApplicationFactory _applicationFactory;

        public ChatController(IApplicationFactory applicationFactory)
        {
            _applicationFactory = applicationFactory;
        }

        // POST: wapi/Chat/GetContact
        /// <summary>
        /// Retorna informações sobre um contato.
        /// </summary>
        /// <param name=""></param>
        /// <returns>Retorna o pushname do contato e outras informações relevantes.</returns>
        /// <response code="200">Operação realizada com exito</response>
        /// <response code="500">Ocorreu um erro interno</response>
        /// <response code="401">Usuário não autenticado</response>
        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult> GetContact(ChatRequest request)
        {
            try
            {
                var retorno = await _applicationFactory.CallWebService($"chat/getContact/{request.ClientId}", RequestTypeEnum.POST, new { chatId = request.ContactNumber });

                if (retorno is null)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }

                return Ok(retorno);
            }
            catch (Exception ex)
            {
                //_logger.LogError(ex, $"[HttpPost] session/status/ClientId: {ClientId}",
                //    ClientId);

                return StatusCode(StatusCodes.Status500InternalServerError, new Models.ErrosExcessoes
                {
                    Erro = "Ocorreu um erro ao retornar a sessão.",
                    ErroDetalhado = ex.Message
                });
            }
        }
    }
}