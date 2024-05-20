using Infinity.Entities.Models.Client.Wapi;
using Infinity.Entities.Models.Client;

namespace Infinity.Api.Helper
{
    public static class SendMessageHelper
    {
        public static HttpClient client = new HttpClient();

        public static async Task<SendMessageWithTextRequest> SendMessageWithTextRequest(ClientRequest request)
        {

            var model = new SendMessageWithTextRequest();
            model.contentType = "string";
            model.content = request.Mensagem;   

            return model;

        }

        public static async Task<SendMessageWithMediaRequest> SendMessageWithMediaRequest(ClientRequest request)
        {
            var model = new SendMessageWithMediaRequest();

            model.contentType = "string";
            model.content = request.Mensagem;

            if (request.Imagem is not null)
            {
                byte[] imageBytes = await client.GetByteArrayAsync(request.Imagem);
                string base64String = Convert.ToBase64String(imageBytes);

                var options = new Options();
                var media = new Media();

                media.mimetype = "image/jpeg/png/jpg";
                media.data = base64String;
                media.filename = request.Imagem;

                options.media = media;

                model.options = options;
            }

            return model;

        }
    }
}
