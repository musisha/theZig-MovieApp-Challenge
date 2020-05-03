using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using Moq.Protected;
using NUnit.Framework;
using serverside.Controllers;
using serverside.Models;
using serverside.Services;

namespace serverside.Tests.MovieServiceTests
{
    [TestFixture]
    class MovieServiceTests
    {
        private MovieRepository _service;
        private Mock<IHttpClientFactory> _mockFactory;
        private Mock<HttpMessageHandler> _fakehttpmessagehandler;

        [SetUp]
        public void Setup()
        {
            _fakehttpmessagehandler = new Mock<HttpMessageHandler>();
            _mockFactory = new Mock<IHttpClientFactory>();
            _service = new MovieRepository(_mockFactory.Object);


        }


        [Test]
        public void GetMovieResult_ShouldReturn_CorrectType()
        {
            var mockHttpMessageHandler = new Mock<HttpMessageHandler>();
            mockHttpMessageHandler.Protected()
                .Setup<Task<HttpResponseMessage>>("SendAsync", ItExpr.IsAny<HttpRequestMessage>(), ItExpr.IsAny<CancellationToken>())
                .ReturnsAsync(new HttpResponseMessage
                {
                    StatusCode = HttpStatusCode.OK,
                    Content = new StringContent("{'name':thecodebuzz,'city':'USA'}"),
                });

            var client = new HttpClient(mockHttpMessageHandler.Object);
            _mockFactory.Setup(_ => _.CreateClient("API CLIENT")).Returns(client);

            
            //act
            var results = _service.GetMovieResults();

            Assert.That(results, Is.InstanceOf<Task<RootObject>>());


        }

        [Test]
        public void GetSingleMovie_ShouldReturn_CorrectType()
        {
            var mockHttpMessageHandler = new Mock<HttpMessageHandler>();
            mockHttpMessageHandler.Protected()
                .Setup<Task<HttpResponseMessage>>("SendAsync", ItExpr.IsAny<HttpRequestMessage>(), ItExpr.IsAny<CancellationToken>())
                .ReturnsAsync(new HttpResponseMessage
                {
                    StatusCode = HttpStatusCode.OK,
                    Content = new StringContent("{'name':thecodebuzz,'city':'USA'}"),
                });

            var client = new HttpClient(mockHttpMessageHandler.Object);
            _mockFactory.Setup(_ => _.CreateClient("API CLIENT")).Returns(client);


            //act
            var results = _service.GetSingleMovie(1);

            Assert.That(results, Is.InstanceOf<Task<RootObject>>());


        }

        [Test]
        public void GetMovieCast_ShouldReturn_CorrectType()
        {
            var mockHttpMessageHandler = new Mock<HttpMessageHandler>();
            mockHttpMessageHandler.Protected()
                .Setup<Task<HttpResponseMessage>>("SendAsync", ItExpr.IsAny<HttpRequestMessage>(), ItExpr.IsAny<CancellationToken>())
                .ReturnsAsync(new HttpResponseMessage
                {
                    StatusCode = HttpStatusCode.OK,
                    Content = new StringContent("{'name': 'bumble bee,'country':'USA'}"),
                });

            var client = new HttpClient(mockHttpMessageHandler.Object);
            _mockFactory.Setup(_ => _.CreateClient("API CLIENT")).Returns(client);


            //act
            var results = _service.GetMovieCast(3);

            Assert.That(results, Is.InstanceOf<Task<RootObject>>());


        }

    }
}
