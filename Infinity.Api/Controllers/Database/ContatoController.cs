using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Infinity.Data.Repositories;
using Infinity.Entities.Models.Cliente;
using Infinity.Server;
using Infinity.Entities.Models.Contato;
using System.Data;

namespace Infinity.Api.Controllers.Database
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ContatoController : Models.ControladorBase
    {
        private readonly ILogger _logger;
        private readonly IContatoRepository _repo;

        public ContatoController(IHttpContextAccessor accessor, ILogger<ContatoController> logger, IContatoRepository repo) : base(accessor)
        {
            _logger = logger;
            _repo = repo;
        }


        // POST: api/Contato/Buscar
        /// <summary>
        /// Busca todos os contatos, baseado nos parâmetros da requisição.
        /// </summary>
        /// <param name=""></param>
        /// <returns>Retorna um array de contatos</returns>
        /// <response code="200">Operação realizada com exito</response>
        /// <response code="500">Ocorreu um erro interno</response>
        /// <response code="401">Usuário não autenticado</response>
        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<DataTable>> Buscar(ContatoRequest request)
        {
            try
            {
                var retorno = await _repo.Buscar(request);

                if (retorno is null)
                {
                    return StatusCode(StatusCodes.Status204NoContent);
                }

                return Ok(retorno);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[HttpPost] api/Clientes/Get(request: {request})",
                    request);

                return StatusCode(StatusCodes.Status500InternalServerError, new Models.ErrosExcessoes
                {
                    Erro = "Ocorreu um erro ao inserir este número.",
                    ErroDetalhado = ex.Message
                });
            }
        }


        // POST: api/Contato/Salvar
        /// <summary>
        /// Salva um contato no banco de dados.
        /// </summary>
        /// <param name=""></param>
        /// <returns>Não retorna nada</returns>
        /// <response code="200">Operação realizada com exito</response>
        /// <response code="500">Ocorreu um erro interno</response>
        /// <response code="401">Usuário não autenticado</response>
        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult> Salvar(ContatoRequest request)
        {
            try
            {
                var retorno = await _repo.Salvar(request);

                if (retorno is null)
                {
                    return StatusCode(StatusCodes.Status204NoContent);
                }

                return Ok(retorno);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[HttpPost] api/Clientes/Get(request: {request})",
                    request);

                return StatusCode(StatusCodes.Status500InternalServerError, new Models.ErrosExcessoes
                {
                    Erro = "Ocorreu um erro ao inserir este número.",
                    ErroDetalhado = ex.Message
                });
            }
        }


        // POST: api/Contato/SalvarLista
        /// <summary>
        /// Salva uma lista de contatos de uma única vez.
        /// </summary>
        /// <param name=""></param>
        /// <returns>Retorna as quantidades de inseridos e/ou não inseridos</returns>
        /// <response code="200">Operação realizada com exito</response>
        /// <response code="500">Ocorreu um erro interno</response>
        /// <response code="401">Usuário não autenticado</response>
        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<ContatoResponse>> SalvarLista(ContatoRequest request)
        {
            try
            {
                var retorno = await _repo.SalvarLista(request);

                if (retorno is null)
                {
                    return StatusCode(StatusCodes.Status204NoContent);
                }

                return Ok(retorno);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[HttpPost] api/Clientes/Get(request: {request})",
                    request);

                return StatusCode(StatusCodes.Status500InternalServerError, new Models.ErrosExcessoes
                {
                    Erro = "Ocorreu um erro ao inserir a lista de contatos.",
                    ErroDetalhado = ex.Message
                });
            }
        }


        // POST: api/Contato/Editar
        /// <summary>
        /// Edita um contato existente.
        /// </summary>
        /// <param name=""></param>
        /// <returns>Não retorna nada</returns>
        /// <response code="200">Operação realizada com exito</response>
        /// <response code="500">Ocorreu um erro interno</response>
        /// <response code="401">Usuário não autenticado</response>
        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult> Editar(ContatoRequest request)
        {
            try
            {
                var retorno = await _repo.Editar(request);

                if (retorno is null)
                {
                    return StatusCode(StatusCodes.Status204NoContent);
                }

                return Ok(retorno);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[HttpPost] api/Clientes/Get(request: {request})",
                    request);

                return StatusCode(StatusCodes.Status500InternalServerError, new Models.ErrosExcessoes
                {
                    Erro = "Ocorreu um erro ao inserir este número.",
                    ErroDetalhado = ex.Message
                });
            }
        }

        // DELETE: api/Contato/Excluir
        /// <summary>
        /// Exclui um contato específico no banco de dados.
        /// </summary>
        /// <param name="UserId ContatoId"></param>
        /// <returns>Não retorna nada</returns>
        /// <response code="200">Operação realizada com exito</response>
        /// <response code="500">Ocorreu um erro interno</response>
        /// <response code="401">Usuário não autenticado</response>
        [HttpDelete]
        [Route("[action]/{UserId}/{ContatoId}")]
        public async Task<ActionResult> Excluir(int UserId, int ContatoId)
        {
            try
            {
                var retorno = await _repo.Excluir(UserId, ContatoId);

                if (retorno is null)
                {
                    return StatusCode(StatusCodes.Status204NoContent);
                }

                return Ok(retorno);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[HttpPost] api/Contato/Excluir(IdUser: {IdUser}, ContatoId: {ContatoId})",
                    UserId, ContatoId);

                return StatusCode(StatusCodes.Status500InternalServerError, new Models.ErrosExcessoes
                {
                    Erro = "Ocorreu um erro ao inserir este número.",
                    ErroDetalhado = ex.Message
                });
            }
        }

        // DELETE: api/Contato/ExcluirTudo
        /// <summary>
        /// Exclui todos os contatos do usuário.
        /// </summary>
        /// <param name="UserId Senha"></param>
        /// <returns>Não retorna nada</returns>
        /// <response code="200">Operação realizada com exito</response>
        /// <response code="500">Ocorreu um erro interno</response>
        /// <response code="401">Usuário não autenticado</response>
        [HttpDelete]
        [Route("[action]/{UserId}/{Senha}")]
        public async Task<ActionResult> ExcluirTudo(int UserId, string Senha)
        {
            try
            {
                var retorno = await _repo.ExcluirTudo(UserId, Senha);

                if (retorno is null)
                {
                    return StatusCode(StatusCodes.Status204NoContent);
                }

                return Ok(retorno);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[HttpPost] api/Contato/ExcluirTudo(IdUser: {IdUser}, Senha: {Senha})",
                    UserId, Senha);

                return StatusCode(StatusCodes.Status500InternalServerError, new Models.ErrosExcessoes
                {
                    Erro = "Ocorreu um erro ao excluir todos os contatos.",
                    ErroDetalhado = ex.Message.Contains("!") ? ex.Message.Substring(0, ex.Message.IndexOf('!') + 1) : ex.Message
                });
            }
        }

        //private readonly ILogger<WeatherForecastController> _logger;

        //public WeatherForecastController(ILogger<WeatherForecastController> logger)
        //{
        //    _logger = logger;
        //}

        //[HttpGet(Name = "GetWeatherForecast")]
        //public IEnumerable<WeatherForecast> Get()
        //{
        //    return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        //    {
        //        Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
        //        TemperatureC = Random.Shared.Next(-20, 55),
        //        Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        //    })
        //    .ToArray();
        //}
    }
    //public class ClienteController : ControllerBase
    //{
    //    public IActionResult Index()
    //    {
    //        return View();
    //    }
    //}
}
