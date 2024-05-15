using Microsoft.Extensions.Logging;
using Infinity.Entities.Models.Cliente;
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
    public interface IClienteRepository
    {
        public Task<IEnumerable<ClienteResponse>> Get(ClienteRequest request);
    }

    public class ClienteRepository : IClienteRepository
    {
        private readonly ILogger<ClienteRepository> _logger;
        private readonly IUniversal _repo;
        private readonly int _codigoUsuario;

        public ClienteRepository(ILogger<ClienteRepository> logger, IUniversal repo, int codigoUsuario)
        {
            _logger = logger;
            _repo = repo;
            _codigoUsuario = codigoUsuario;
        }

        public async Task<IEnumerable<ClienteResponse>> Get(ClienteRequest request)
        {
            try
            {
                var cliente = new List<ClienteResponse>();

                var result = await _repo.ExecuteDataTableAsync(
                    command: "proc_cliente_retornar",
                    type: CommandType.StoredProcedure,
                    new SqlParameter(parameterName: "p_cxa_id", value: Utils.DBNullParse(null)),
                    new SqlParameter(parameterName: "p_cxa_descricao", value: Utils.DBNullParse(null)),
                    new SqlParameter(parameterName: "p_emp_id", value: Utils.DBNullParse(null))
                );

                if (result.Rows.Count > 0)
                {
                    foreach (DataRow item in result.Rows)
                    {
                        cliente.Add(
                            Parse(item)
                        );
                    }

                    return cliente;
                }

                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Get(request: {request})", request);
                throw ex;               
            }
        }

        private ClienteResponse Parse(DataRow item)
        {
            ClienteResponse cliente = new ClienteResponse();

            return cliente;
        }
    }

}
