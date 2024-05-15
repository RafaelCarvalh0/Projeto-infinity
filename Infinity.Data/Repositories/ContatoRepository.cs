using Infinity.Entities.Models.Cliente;
using Infinity.Entities.Models.Contato;
using Microsoft.Extensions.Logging;
using Rabrune.Data;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infinity.Data.Repositories
{
    public interface IContatoRepository
    {
        public Task<DataTable> Buscar(ContatoRequest request);
        public Task<bool?> Salvar(ContatoRequest request);
        public Task<ContatoResponse> SalvarLista(ContatoRequest request);
        public Task<bool?> Editar(ContatoRequest request);
        public Task<bool?> Excluir(int UserId, int ContatoId);
        public Task<bool?> ExcluirTudo(int UserId, string Senha);
    }

    public class ContatoRepository : IContatoRepository
    {
        private readonly ILogger<ContatoRepository> _logger;
        private readonly IUniversal _repo;
        private readonly int _codigoUsuario;

        public ContatoRepository(ILogger<ContatoRepository> logger, IUniversal repo, int codigoUsuario)
        {
            _logger = logger;
            _repo = repo;
            _codigoUsuario = codigoUsuario;
        }

        public async Task<DataTable> Buscar(ContatoRequest request)
        {
            try
            {
                var contato = new List<ContatoResponse>();

                DataTable table = await _repo.ExecuteDataTableAsync(
                    command: "proc_contato_buscar",
                    type: CommandType.StoredProcedure,
                    new SqlParameter(parameterName: "p_usuario_id", value: Utils.DBNullParse(request.UsuarioId)),
                    new SqlParameter(parameterName: "p_nome", value: Utils.DBNullParse(request.Nome)),
                    new SqlParameter(parameterName: "p_celular", value: Utils.DBNullParse(request.Celular))
                );

                if(table.Rows.Count > 0)
                {
                    return table;
                    //foreach( DataRow row in result.Rows )
                    //{
                    //    contato.Add(Parse(row));
                    //}

                    //return contato;
                }

                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Buscar(request: {request})", request);
                throw ex;
            }
        }

        public async Task<bool?> Salvar(ContatoRequest request)
        {
            try
            {
                var result = await _repo.ExecuteNonQueryAsync(
                    command: "proc_contato_salvar",
                    type: CommandType.StoredProcedure,
                    new SqlParameter(parameterName: "p_usuario_id", value: Utils.DBNullParse(request.UsuarioId)),
                    new SqlParameter(parameterName: "p_nome", value: Utils.DBNullParse(request.Nome)),
                    new SqlParameter(parameterName: "p_celular", value: Utils.DBNullParse(request.Celular))
                );

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Salvar(request: {request})", request);
                throw ex;
            }
        }

        public async Task<ContatoResponse> SalvarLista(ContatoRequest request)
        {
            try
            {
                var result = await _repo.ExecuteDataTableAsync(
                    command: "proc_contato_salvar_lista",
                    type: CommandType.StoredProcedure,
                    new SqlParameter(parameterName: "p_usuario_id", value: Utils.DBNullParse(request.UsuarioId)),
                    new SqlParameter(parameterName: "p_contato_json", value: Utils.DBNullParse(request.ContatoJson))
                );

                var retorno = new ContatoResponse();

                if (result.Rows.Count > 0)
                {
                    retorno.ContatosInseridos = result.Rows[0].ItemArray[0].ToString();
                    retorno.ContatosExistentes = result.Rows[0].ItemArray[1].ToString();
                }
                
                return retorno;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Salvar(request: {request})", request);
                throw ex;
            }
        }

        public async Task<bool?> Editar(ContatoRequest request)
        {
            try
            {
                var result = await _repo.ExecuteNonQueryAsync(
                    command: "proc_contato_editar",
                    type: CommandType.StoredProcedure,
                    new SqlParameter(parameterName: "p_usuario_id", value: Utils.DBNullParse(request.UsuarioId)),
                    new SqlParameter(parameterName: "p_contato_id", value: Utils.DBNullParse(request.ContatoId)),
                    new SqlParameter(parameterName: "p_nome", value: Utils.DBNullParse(request.Nome)),
                    new SqlParameter(parameterName: "p_celular", value: Utils.DBNullParse(request.Celular))
                );

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Salvar(request: {request})", request);
                throw ex;
            }
        }

        public async Task<bool?> Excluir(int UserId, int ContatoId)
        {
            try
            {
                var result = await _repo.ExecuteNonQueryAsync(
                    command: "proc_contato_excluir",
                    type: CommandType.StoredProcedure,
                    new SqlParameter(parameterName: "p_usuario_id", value: Utils.DBNullParse(UserId)),
                    new SqlParameter(parameterName: "p_contato_id", value: Utils.DBNullParse(ContatoId))
                );

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Excluir(IdUser: {IdUser}, ContatoId: {ContatoId})", UserId, ContatoId);
                throw ex;
            }
        }

        public async Task<bool?> ExcluirTudo(int UserId, string Senha)
        {
            try
            {
                var result = await _repo.ExecuteNonQueryAsync(
                    command: "proc_contato_excluir_todos",
                    type: CommandType.StoredProcedure,
                    new SqlParameter(parameterName: "p_usuario_id", value: Utils.DBNullParse(UserId)),
                    new SqlParameter(parameterName: "p_senha", value: Utils.DBNullParse(Senha))
                );

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Excluir(IdUser: {IdUser}, ContatoId: {ContatoId})", UserId, Senha);
                throw ex;
            }
        }


        //private ContatoResponse Parse(DataRow row)
        //{
        //    ContatoResponse contato = new ContatoResponse()
        //    {
        //        Id = Utils.IntParse(row["Id"]),
        //        Nome = Utils.StringTryParse(row["Nome"]),
        //        Celular = Utils.StringTryParse(row["Celular"]),
        //        DataInclusao = Utils.DateTimeParse(row["DataInclusao"])
        //    };


        //    return contato;
        //}
    }
}
