using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Infinity.Data.Repositories;
using Infinity.Entities.Models.Cliente;
using Infinity.Entities.Models.Usuario;
using Infinity.Server;
using Infinity.Api.Services;

namespace Infinity.Api.Controllers.Whatsapp
{
    [ApiController]
    [Route("wapi/[controller]")]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class SessionController : Controller
    {
        private readonly ILogger _logger;
        private readonly IApplicationFactory _applicationFactory;

        public SessionController(IApplicationFactory applicationFactory)
        {
            _applicationFactory = applicationFactory;
        }

        // GET: api/Session/Status
        /// <summary>
        /// Verifica o status da sessão.
        /// </summary>
        /// <param name="ClientId"></param>
        /// <returns>Retorna o status atual da sessão do usuário</returns>
        /// <response code="200">Operação realizada com exito</response>
        /// <response code="500">Ocorreu um erro interno</response>
        /// <response code="401">Usuário não autenticado</response>
        [HttpGet]
        [Route("[action]/{ClientId}")]
        public async Task<ActionResult> Status(string ClientId)
        {
            try
            {

                var retorno = await _applicationFactory.CallWebService($"session/status/{ClientId}", RequestTypeEnum.GET);

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

        // GET: api/Session/Start
        /// <summary>
        /// Inicia uma sessão no Whatsapp.
        /// </summary>
        /// <param name="ClientId"></param>
        /// <returns>Retorna um booleano sobre a tentativa de inicio de sessão</returns>
        /// <response code="200">Operação realizada com exito</response>
        /// <response code="500">Ocorreu um erro interno</response>
        /// <response code="401">Usuário não autenticado</response>
        [HttpGet]
        [Route("[action]/{ClientId}")]
        public async Task<ActionResult> Start(string ClientId)
        {
            try
            {

                var retorno = await _applicationFactory.CallWebService($"session/start/{ClientId}", RequestTypeEnum.GET);

                if (retorno is null)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }

                return Ok(retorno);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"[HttpPost] session/start/ClientId: {ClientId}",
                    ClientId);

                return StatusCode(StatusCodes.Status500InternalServerError, new Models.ErrosExcessoes
                {
                    Erro = "Ocorreu um erro ao retornar a sessão.",
                    ErroDetalhado = ex.Message
                });
            }
        }

        // GET: api/Session/GetQR
        /// <summary>
        /// Solicita um QRCode para leitura.
        /// </summary>
        /// <param name="ClientId"></param>
        /// <returns>Retorna um QRcode no formato binário</returns>
        /// <response code="200">Operação realizada com exito</response>
        /// <response code="500">Ocorreu um erro interno</response>
        /// <response code="401">Usuário não autenticado</response>
        [HttpGet]
        [Route("[action]/{ClientId}")]
        public async Task<ActionResult> GetQR(string ClientId)
        {
            try
            {

                var retorno = await _applicationFactory.CallWebService($"session/qr/{ClientId}", RequestTypeEnum.GET);

                if (retorno is null)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }

                return Ok(retorno);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"[HttpPost] session/start/ClientId: {ClientId}/image",
                    ClientId);

                return StatusCode(StatusCodes.Status500InternalServerError, new Models.ErrosExcessoes
                {
                    Erro = "Ocorreu um erro ao retornar a sessão.",
                    ErroDetalhado = ex.Message
                });
            }
        }

        // GET: api/Session/Terminate
        /// <summary>
        /// Encerra a sessão do usuário.
        /// </summary>
        /// <param name="ClientId"></param>
        /// <returns>Encerra a sessão do usuário</returns>
        /// <response code="200">Operação realizada com exito</response>
        /// <response code="500">Ocorreu um erro interno</response>
        /// <response code="401">Usuário não autenticado</response>
        [HttpGet]
        [Route("[action]/{ClientId}")]
        public async Task<ActionResult> Terminate(string ClientId)
        {
            try
            {

                var retorno = await _applicationFactory.CallWebService($"session/terminate/{ClientId}", RequestTypeEnum.GET);

                if (retorno is null)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }

                return Ok(retorno);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"[HttpPost] session/start/Get(ClientId: {ClientId})",
                    ClientId);

                return StatusCode(StatusCodes.Status500InternalServerError, new Models.ErrosExcessoes
                {
                    Erro = "Ocorreu um erro ao retornar a sessão.",
                    ErroDetalhado = ex.Message
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
}

