using Infinity.Data.Repositories;
using Infinity.Entities.Models.Contato;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace Infinity.Api.Controllers.Database
{
    [ApiController]
    [Route("api/[controller]")]
    public class BotController : Models.ControladorBase
    {
        private readonly ILogger _logger;
        private readonly IBotRepository _repo;

        public BotController(IHttpContextAccessor accessor, ILogger<BotController> logger, IBotRepository repo) : base(accessor)
        {
            _logger = logger;
            _repo = repo;
        }

        // POST: api/Bot/GetOptions/{SessionId}
        /// <summary>
        /// Retorna todas as opções de escolhas cadastrada de um usuário para o menu do BOT.
        /// </summary>
        /// <param name="SessionId"></param>
        /// <returns>Retorna um array de opções</returns>
        /// <response code="200">Operação realizada com exito</response>
        /// <response code="500">Ocorreu um erro interno</response>
        /// <response code="401">Usuário não autenticado</response>
        [HttpGet]
        [Route("[action]/{SessionId}")]
        public async Task<ActionResult<DataTable>> GetOptions(string SessionId)
        {
            try
            {
                var retorno = await _repo.GetOptions(SessionId);

                if (retorno is null)
                {
                    return StatusCode(StatusCodes.Status204NoContent);
                }

                return Ok(retorno);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[HttpPost] api/Bot//GetOptions(SessionId: {SessionId})",
                    SessionId);

                return StatusCode(StatusCodes.Status500InternalServerError, new Models.ErrosExcessoes
                {
                    Erro = "Ocorreu um erro ao retornar as opções.",
                    ErroDetalhado = ex.Message
                });
            }
        }
    }
}
