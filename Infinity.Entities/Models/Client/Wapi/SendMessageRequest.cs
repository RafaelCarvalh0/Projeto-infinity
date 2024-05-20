using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infinity.Entities.Models.Client.Wapi
{
    public class SendMessageWithTextRequest
    {
        public string chatId { get; set; }
        public string contentType { get; set; }
        public string content { get; set; }
    }

    public class SendMessageWithMediaRequest
    {
        public string chatId {  get; set; }
        public string contentType { get; set; }
        public string content { get; set; }
        public Options? options { get; set; }
    }

    public class Options
    {
        public Media media { get; set; }
    }

    public class Media
    {
        public string mimetype { get; set; }
        public string data { get; set; }
        public string filename { get; set; }
    }
}
