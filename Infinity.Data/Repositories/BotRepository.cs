using Infinity.Entities.Models.Cliente;
using Microsoft.Extensions.Logging;
using Rabrune.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infinity.Data.Repositories
{
    public interface IBotRepository
    {
        public Task<DataTable> GetOptions(string SessionId);
    }

    public class BotRepository : IBotRepository
    {
        private readonly ILogger<BotRepository> _logger;
        private readonly IUniversal _repo;

        public BotRepository(ILogger<BotRepository> logger, IUniversal repo)
        {
            _logger = logger;
            _repo = repo;
        }

        public async Task<DataTable> GetOptions(string SessionId)
        {
            try
            {
                //DataTable table = await _repo.ExecuteDataTableAsync(
                //    command: "proc_contato_buscar",
                //    type: CommandType.StoredProcedure,
                //    new SqlParameter(parameterName: "p_usuario_id", value: Utils.DBNullParse(request.UsuarioId)),
                //    new SqlParameter(parameterName: "p_nome", value: Utils.DBNullParse(request.Nome)),
                //    new SqlParameter(parameterName: "p_celular", value: Utils.DBNullParse(request.Celular))
                //);

                return null;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
