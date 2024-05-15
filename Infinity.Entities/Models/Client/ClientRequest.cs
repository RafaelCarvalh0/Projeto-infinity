using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infinity.Entities.Models.Client
{
    public class ClientRequest
    {
        public string ClientId { get; set; }
        public List<string> Contatos { get; set; }
        public string Imagem {  get; set; }
        public string Mensagem { get; set; }
    }
}
