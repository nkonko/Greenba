using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Source;

namespace GreenbaAPI.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    public class BugController : BaseApiController
    {
        private readonly StoreContext context;

        public BugController(StoreContext context)
        {
            this.context = context;
        }

        [HttpGet("testsauth")]
        [Authorize]
        public ActionResult<string> GetSecretText()
        {
            return "secret";
        }

        [HttpGet("notfound")]
        public ActionResult GetNotFoundRequest()
        {
            var thing = context.Products.Find(42);

            if (thing == null)
            {
                return NotFound();
            }

            return Ok();
        }

        [HttpGet("servererror")]
        public ActionResult GetServerErrorRequest()
        {
            var thing = context.Products.Find(42);

            var thingToReturn = thing.ToString();

            return Ok();
        }

        [HttpGet("badrequest")]
        public ActionResult GetBadRequest()
        {
            return BadRequest();
        }

       
    }
}
