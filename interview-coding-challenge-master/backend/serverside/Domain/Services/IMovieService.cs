using System.Net.Http;
using System.Threading.Tasks;
using serverside.Models;
using Microsoft.AspNetCore.Mvc;


namespace serverside.Domain.Services
{
    public interface IMovieService
    {

        public Task<RootObject> GetMovieResults(int page);

        public Task<SingleMovie> GetSingleMovie(int id);

        public Task<RootObject> GetMovieResults(string movieName);

        public Task<MovieCast> GetMovieCast(int movieID);
    }
}