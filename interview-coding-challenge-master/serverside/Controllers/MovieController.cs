using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using serverside.Domain.Services;

namespace serverside.Controllers
{
    [Route("api/")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        IMovieService _movieService;



        public MovieController(IMovieService movieService)
        {
            _movieService = movieService;
        }




        // GET api/popular/:page   default page is 1
        [HttpGet("popular/{page=1}")]
        public async Task<IActionResult> GetPopular(int page)
        {
            var model = await _movieService.GetMovieResults(page);
            return Ok(model);
        }




        // GET api/movie/{id}
        [HttpGet("movie/{id}")]
        public async Task<IActionResult> GetSingleMovie(int id)
        {
            var model = await _movieService.GetSingleMovie(id);
            return Ok(model);
        }





        //Get Search api/{search}
        [HttpGet("search/{movieName}")]
        public async Task<IActionResult> GetMovieResults(string movieName)
        {
            var model = await _movieService.GetMovieResults(movieName);
            return Ok(model);
        }





        // Get movie details api/movie/details/:id
        [HttpGet("credits/{id}")]
        public async Task<IActionResult> GetMovieCast(int id)
        {
            var model = await _movieService.GetMovieCast(id);
            return Ok(model);
        }


    }
}