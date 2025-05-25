using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SingleZone.Core.entities;

namespace SingleZone_.Api.Controllers
{
    public class CategoryController : Controller
    {

        [HttpGet("categories")]
        public IActionResult GetCategories()
        {
            var categories = Enum.GetValues(typeof(Categories))
                                 .Cast<Categories>()
                                 .Select(c => new { Id = (int)c, Name = c.ToString() })
                                 .ToList();
            return Ok(categories);
        }
    }
}
