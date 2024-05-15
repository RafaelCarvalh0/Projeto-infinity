using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Infinity.Data.Repositories;
using Infinity.Entities.Models.Cliente;
using Infinity.Entities.Models.Usuario;
using Infinity.Server;

namespace Infinity.Api.Controllers.Database
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class UsuarioController : Models.ControladorBase
    {
        private readonly ILogger _logger;
        private readonly IUsuarioRepository _repo;

        public UsuarioController(IHttpContextAccessor accessor, ILogger<UsuarioController> logger, IUsuarioRepository repo) : base(accessor)
        {
            _logger = logger;
            _repo = repo;
        }

        // POST: api/Usuario/Get
        /// <summary>
        /// Recupera um usuário com base na autenticação.
        /// </summary>
        /// <param name=""></param>
        /// <returns>Retorna um objeto do tipo usuário</returns>
        /// <response code="200">Operação realizada com exito</response>
        /// <response code="500">Ocorreu um erro interno</response>
        /// <response code="401">Usuário não autenticado</response>
        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<IEnumerable<UsuarioRequest>>> Get(UsuarioRequest request)
        {
            try
            {
                var retorno = await _repo.Get(request);

                if (retorno.ClientId is null)
                {
                    return StatusCode(StatusCodes.Status401Unauthorized);
                }

                return Ok(retorno);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[HttpPost] api/Usuario/Get(request: {request})",
                    request);

                return StatusCode(StatusCodes.Status500InternalServerError, new Models.ErrosExcessoes
                {
                    Erro = "Ocorreu um erro ao retornar o usuário.",
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
