using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using serverside.Domain.Services;
using serverside.Models;

namespace serverside.Services
{
    public class MovieService : IMovieService
    {
        private readonly IHttpClientFactory _httpClientFactory;


        public MovieService(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }


        public async Task<RootObject> GetMovieResults(int page = 1)
        {
            // Get an instance of HttpClient from the factpry that we registered
            // in Startup.cs
            var client = _httpClientFactory.CreateClient("API Client");

            // Call the API & wait for response. 
            // If the API call fails, call it again according to the re-try policy
            // specified in Startup.cs
            var result = await client.GetAsync(string.Format("movie/popular?api_key=efe61e21b11fc4b6ff49e29d28597602&language=en-US&page={0}", page));
            if (result.IsSuccessStatusCode)
            {
                // Read all of the response and deserialise it into an instance of
                // WeatherForecast class
                var content = await result.Content.ReadAsStringAsync();
                //var json = Newtonsoft.Json.JsonConvert.SerializeObject(content);

                return JsonConvert.DeserializeObject<RootObject>(content);

            }
            return null;
        }




        //Get single movie
        public async Task<SingleMovie> GetSingleMovie(int id)
        {
            var client = _httpClientFactory.CreateClient("API Client");

            var result = await client.GetAsync(string.Format("movie/{0}?api_key=efe61e21b11fc4b6ff49e29d28597602&language=en-US", id));

            if (result.IsSuccessStatusCode)
            {
                var content = await result.Content.ReadAsStringAsync();

                return JsonConvert.DeserializeObject<SingleMovie>(content);

            }
            return null;
        }




        //Get Searched Movies
        public async Task<RootObject> GetMovieResults(string movieName)
        {

            var client = _httpClientFactory.CreateClient("API Client");

            var result = await client.GetAsync(string.Format("search/movie?api_key=efe61e21b11fc4b6ff49e29d28597602&language=en-US&query={0}", movieName));
            if (result.IsSuccessStatusCode)
            {

                var content = await result.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<RootObject>(content);

            }
            return null;
        }







        //Get movie cast
        public async Task<MovieCast> GetMovieCast(int movieID)
        {

            var client = _httpClientFactory.CreateClient("API Client");

            var result = await client.GetAsync(string.Format("movie/{0}/credits?api_key=efe61e21b11fc4b6ff49e29d28597602&language=en-US", movieID));
            if (result.IsSuccessStatusCode)
            {

                var content = await result.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<MovieCast>(content);

            }
            return null;
        }
    }
}