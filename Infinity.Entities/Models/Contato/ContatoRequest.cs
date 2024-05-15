using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infinity.Entities.Models.Contato
{
    public class ContatoRequest
    {
        public int UsuarioId { get; set; }
        public int ContatoId { get; set; }
        public string Nome { get; set; }
        public string Celular { get; set; }

        public string ContatoJson { get; set; }
    }
}
