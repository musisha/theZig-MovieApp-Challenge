using System;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Net.Http;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using serverside.Domain.Services;
using serverside.Models;

namespace serverside.Services
{
    public class MovieRepository : IMovieService
    {
        private readonly IHttpClientFactory _httpClientFactory;


        public MovieRepository(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        //get popular movies
        public async Task<RootObject> GetMovieResults(int page = 1)
        {
            // Get an instance of HttpClient from the factory
            var client = _httpClientFactory.CreateClient("API Client");

            // Call API and wait for response. 
            var result = await client.GetAsync(
                $"movie/popular?api_key={Constants.api_key}{Constants.language}&page={page}");
            if (result.IsSuccessStatusCode)
            {
                // Read all of the response and deserialize it into an instance
                var content = await result.Content.ReadAsStringAsync();

                return JsonConvert.DeserializeObject<RootObject>(content);

            }
            else
            {
                return null;
            }
        }


        //Get single movie
        public async Task<SingleMovie> GetSingleMovie(int id)
        {
            var client = _httpClientFactory.CreateClient("API Client");

            var result = await client.GetAsync($"movie/{id}?api_key={Constants.api_key}{Constants.language}");

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

            var result = await client.GetAsync(
                $"search/movie?api_key={Constants.api_key}{Constants.language}&query={movieName}");
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

            var result = await client.GetAsync(
                $"movie/{movieID}/credits?api_key={Constants.api_key}{Constants.language}S");
            if (result.IsSuccessStatusCode)
            {

                var content = await result.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<MovieCast>(content);

            }
            return null;
        }
    }
}