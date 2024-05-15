using Microsoft.Extensions.Logging;
using Infinity.Entities.Models.Cliente;
using Infinity.Entities.Models.Usuario;
using Rabrune.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;
using static System.Reflection.Metadata.BlobBuilder;

namespace Infinity.Data.Repositories
{
    public interface IUsuarioRepository
    {
        public Task<UsuarioResponse> Get(UsuarioRequest request);
    }

    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly ILogger<UsuarioRepository> _logger;
        private readonly IUniversal _repo;
        private readonly int _codigoUsuario;

        public UsuarioRepository(ILogger<UsuarioRepository> logger, IUniversal repo, int codigoUsuario)
        {
            _logger = logger;
            _repo = repo;
            _codigoUsuario = codigoUsuario;
        }

        public async Task<UsuarioResponse> Get(UsuarioRequest request)
        {
            try
            {
                var result = await _repo.ExecuteDataTableAsync(
                    command: "proc_login",
                    type: CommandType.StoredProcedure,
                    new SqlParameter(parameterName: "@p_email", value: Utils.DBNullParse(request.Email)),
                    new SqlParameter(parameterName: "@p_senha", value: Utils.DBNullParse(request.Senha))
                );

                if (result.Rows.Count > 0)
                {
                    var retorno = Parse(result.Rows[0]);

                    return retorno;
                }

                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Get(request: {request})", request);
                throw ex;
            }
        }

        private UsuarioResponse Parse(DataRow row)
        {
            UsuarioResponse usuario = new UsuarioResponse();
            usuario.Id = Utils.IntParse(row["Id"]);
            usuario.ClientId = Utils.StringTryParse(row["ClientId"]);

            return usuario;
        }
    }

}
