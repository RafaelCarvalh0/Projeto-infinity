using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infinity.Entities.Models.Usuario
{
    public class UsuarioResponse
    {
        public int Id { get; set; }
        public string Token {  get; set; }
        public string ClientId { get; set; }
    }
}
