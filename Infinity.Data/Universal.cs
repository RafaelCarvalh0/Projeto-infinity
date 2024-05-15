using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;

namespace Infinity.Data
{
    public interface IUniversal 
    {
        Task<int> ExecuteNonQueryAsync(string command, CommandType type = CommandType.Text, params SqlParameter[] parameters);
        Task<object> ExecuteScalarAsync(string command, CommandType type = CommandType.Text, params SqlParameter[] parameters);
        Task<DataTable> ExecuteDataTableAsync(string command, CommandType type = CommandType.Text, params SqlParameter[] parameters);
        Task<DataRow> ExecuteDataRowAsync(string command, CommandType type = CommandType.Text, params SqlParameter[] parameters);
    }

    public class Universal : IUniversal, IDisposable
    {
        private bool isDisposed = false;

        private readonly ILogger<Universal> _logger;

        private SqlConnection Connection { get; set; }
        private SqlTransaction Transaction { get; set; }

        public Universal(ILogger<Universal> logger, string connectionString) {

            _logger = logger;

            Connection = new SqlConnection(connectionString);
        }

        ~Universal()
        {
            Dispose(false);
        }

        private async Task AbrirConexaoAsync() {
            try {
                if (Connection.State == ConnectionState.Closed) {
                    await Connection.OpenAsync();
                }
            } catch (SqlException ex) {
                _logger.LogError(ex, "AbrirConexaoAsync()");

                throw ex;
            } catch (Exception ex) {
                _logger.LogError(ex, "AbrirConexaoAsync()");

                throw ex;
            }
        }

        private async Task FecharConexaoAsync() {
            try {
                if (Connection.State == ConnectionState.Open) {
                    await Connection.CloseAsync();
                }
            } catch (SqlException ex) {
                _logger.LogError(ex, "FecharConexaoAsync()");

                throw ex;
            } catch (Exception ex) {
                _logger.LogError(ex, "FecharConexaoAsync()");

                throw ex;
            }
        }

        private async Task<SqlTransaction> IniciarTransacaoAsync() {
            try {
                Transaction = Connection.BeginTransaction();

                await Task.CompletedTask;

                return Transaction;
            } catch (SqlException ex) {
                _logger.LogError(ex, "IniciarTransacaoAsync()");

                throw ex;
            } catch (Exception ex) {
                _logger.LogError(ex, "IniciarTransacaoAsync()");

                throw ex;
            }
        }

        private async Task CancelarTransacaoAsync() {
            try {
                await Transaction.RollbackAsync();
                Transaction = null;
            } catch (SqlException ex) {
                _logger.LogError(ex, "CancelarTransacaoAsync()");

                throw ex;
            } catch (Exception ex) {
                _logger.LogError(ex, "CancelarTransacaoAsync()");

                throw ex;
            }
        }

        private async Task ConfirmarTransacaoAsync() {
            try {
                await Transaction.CommitAsync();
                Transaction = null;
            } catch (SqlException ex) {
                _logger.LogError(ex, "ConfirmarTransacaoAsync()");

                throw ex;
            } catch (Exception ex) {
                _logger.LogError(ex, "ConfirmarTransacaoAsync()");

                throw ex;
            }
        }

        public async Task<int> ExecuteNonQueryAsync(string command, CommandType type = CommandType.Text, params SqlParameter[] parameters) {
            try {
                await AbrirConexaoAsync();

                await IniciarTransacaoAsync();

                using (var cmd = new SqlCommand(command, Connection, Transaction)) {
                    cmd.CommandType = type;

                    if (parameters != null) {
                        cmd.Parameters.AddRange(parameters);
                    }

                    var affectedRows = await cmd.ExecuteNonQueryAsync();

                    await ConfirmarTransacaoAsync();

                    return affectedRows;
                }
            } catch (SqlException ex) {
                var errorMessage = CreateErrorMessage("ExecuteNonQueryAsync", command, type, parameters);

                _logger.LogError(ex, errorMessage);

                await CancelarTransacaoAsync();

                throw ex;
            } catch (Exception ex) {
                var errorMessage = CreateErrorMessage("ExecuteNonQueryAsync", command, type, parameters);

                _logger.LogError(ex, errorMessage);

                await CancelarTransacaoAsync();

                throw ex;
            } finally {
                await FecharConexaoAsync();
            }
        }

        public async Task<object> ExecuteScalarAsync(string command, CommandType type = CommandType.Text, params SqlParameter[] parameters) {
            try {
                await AbrirConexaoAsync();

                await IniciarTransacaoAsync();

                using (var cmd = new SqlCommand(command, Connection, Transaction)) {
                    cmd.CommandType = type;

                    if (parameters != null) {
                        cmd.Parameters.AddRange(parameters);
                    }

                    var result = await cmd.ExecuteScalarAsync();

                    await ConfirmarTransacaoAsync();

                    return result;
                }
            } catch (SqlException ex) {
                var errorMessage = CreateErrorMessage("ExecuteScalarAsync", command, type, parameters);

                _logger.LogError(ex, errorMessage);

                await CancelarTransacaoAsync();

                throw ex;
            } catch (Exception ex) {
                var errorMessage = CreateErrorMessage("ExecuteScalarAsync", command, type, parameters);

                _logger.LogError(ex, errorMessage);

                await CancelarTransacaoAsync();

                throw ex;
            } finally {
                await FecharConexaoAsync();
            }
        }

        public async Task<DataTable> ExecuteDataTableAsync(string command, CommandType type = CommandType.Text, params SqlParameter[] parameters) {
            try {
                await AbrirConexaoAsync();

                using (var cmd = new SqlCommand(command, Connection)) {
                    cmd.CommandType = type;

                    if (parameters != null) {
                        cmd.Parameters.AddRange(parameters);
                    }

                    using (var adapter = new SqlDataAdapter(cmd)) {
                        var ds = new DataSet();
                        adapter.Fill(ds);

                        return ds.Tables[0];
                    }
                }
            } catch (SqlException ex) {
                var errorMessage = CreateErrorMessage("ExecuteDataTableAsync", command, type, parameters);

                _logger.LogError(ex, errorMessage);

                throw ex;
            } catch (Exception ex) {
                var errorMessage = CreateErrorMessage("ExecuteDataTableAsync", command, type, parameters);

                _logger.LogError(ex, errorMessage);

                throw ex;
            } finally {
                await FecharConexaoAsync();
            }
        }

        public async Task<DataRow> ExecuteDataRowAsync(string command, CommandType type = CommandType.Text, params SqlParameter[] parameters) {
            try {
                await AbrirConexaoAsync();

                using (var cmd = new SqlCommand(command, Connection)) {
                    cmd.CommandType = type;

                    if (parameters != null) {
                        cmd.Parameters.AddRange(parameters);
                    }

                    using (var adapter = new SqlDataAdapter(cmd)) {
                        var ds = new DataSet();
                        adapter.Fill(ds);

                        return ds.Tables[0].Rows[0];
                    }
                }
            } catch (SqlException ex) {
                var errorMessage = CreateErrorMessage("ExecuteDataRowAsync", command, type, parameters);

                _logger.LogError(ex, errorMessage);

                throw ex;
            } catch (Exception ex) {
                var errorMessage = CreateErrorMessage("ExecuteDataRowAsync", command, type, parameters);

                _logger.LogError(ex, errorMessage);

                throw ex;
            } finally {
                await FecharConexaoAsync();
            }
        }

        private string CreateErrorMessage(string name, string command, CommandType type, params SqlParameter[] parameters) {
            try {
                var message = $"{name}(";
                message += "command: {command}, type: {type},";

                foreach (SqlParameter p in parameters) {
                    message += $" {p.ParameterName}: {p.Value},";
                }

                message = message.Remove(startIndex: message.Length - 1, count: 1);
                message = message.Insert(startIndex: message.Length, value: ")");

                return message;
            } catch (Exception ex) {
                _logger.LogError(ex, "Ocorreu um erro ao montar a mensagem de erro. Método: {name}", name);

                return null;
            };
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (isDisposed) return;

            if (disposing)
            {
                // Limpa recursos gerenciados

                Connection?.Dispose();
                Connection = null;

                Transaction?.Dispose();
                Transaction = null;
            }

            // Limpa recursos não gerenciados (se houver)

            isDisposed = true;
        }
    }
}