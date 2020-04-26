using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using serverside.Controllers;
using serverside.Domain.Services;

namespace serverside.Tests
{
    public class MovieControllerTests
    {
        private Mock<IMovieService> _movieService;
        private MovieController _movieController;


        [SetUp]
        public void Setup()
        {
            _movieService = new Mock<IMovieService>();
            _movieController = new MovieController(_movieService.Object);
        }


        [Test]
        public void GetPopularMovies_WhenCalled_TaskIActionResult()
        {
            
            _movieService.Setup(fs => fs.GetMovieResults(1));

            var result = _movieController.GetPopular();

            Assert.That(result, Is.InstanceOf<Task<IActionResult>>());
        }

        [Test]
        public void GetSingleMovie_WhenCalled_TaskIActionResult()
        {

            _movieService.Setup(fs => fs.GetSingleMovie(1));

            var result = _movieController.GetSingleMovie(1);

            Assert.That(result, Is.InstanceOf<Task<IActionResult>>());
        }

        [Test]
        public void GetSearchedMovie_WhenCalled_TaskIActionResult()
        {

            _movieService.Setup(fs => fs.GetMovieResults(""));

            var result = _movieController.GetSearchedMovie("");

            Assert.That(result, Is.InstanceOf<Task<IActionResult>>());
        }

        [Test]
        public void GetMovieCast_WhenCalled_TaskIActionResult()
        {

            _movieService.Setup(fs => fs.GetMovieCast(1));

            var result = _movieController.GetMovieCast(1);

            Assert.That(result, Is.InstanceOf<Task<IActionResult>>());
        }

    }
}