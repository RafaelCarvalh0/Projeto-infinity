using Microsoft.AspNetCore.Mvc;

namespace Infinity.Api.Models
{
    public class ControladorBase : ControllerBase
    {
        protected long UserId { get; set; }
        protected string UserName { get; set; }
        protected string UserLogin { get; set; }

        private readonly IHttpContextAccessor _accessor;

        public ControladorBase(IHttpContextAccessor accessor)
        {
            _accessor = accessor;

            foreach (var claim in _accessor.HttpContext.User.Claims)
            {
                switch (claim.Type)
                {
                    case "userid":
                        UserId = Convert.ToInt32(claim.Value);
                        break;
                    case "username":
                        UserName = claim.Value;
                        break;
                    case "userlogin":
                        UserLogin = claim.Value;
                        break;
                }
            }
        }
    }
}
