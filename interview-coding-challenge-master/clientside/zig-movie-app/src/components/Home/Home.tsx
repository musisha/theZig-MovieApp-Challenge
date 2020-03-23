import * as React from "react";
import "./Home.css";
import { HeroImage } from "../elements/HeroImage/HeroImage";
import { SearchBar } from "../elements/SearchBar/SearchBar";
import { FourColGrid } from "../elements/FourColGrid/FourColGrid";
import { MovieThumb } from "../elements/MovieThumb/MovieThumb";
import { LoadMoreBtn } from "../elements/LoadMoreBtn/LoadMoreBtn";
import { Spinner } from "../elements/Spinner/Spinner";
import {
  API_KEY,
  API_URL,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE
} from "../../config";
import { IHome } from "./IHome";

export class Home extends React.Component<{}, IHome> {
  state: IHome = {
    movies: [],
    heroimage: "",
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchterm: ""
  };

  //when the home component mounts check localstorage,if localstorage true update state with local storage else call fetchData() and pass set endpoint
  componentDidMount() {
    // if (localStorage.getItem("HomeState")) {
    //   const state: IHome = JSON.parse(localStorage.getItem("HomeState")!);
    //   this.setState({ ...state });
    // } else {
    const endpoint = `https://localhost:5001/api/popular`;
    this.setState({ loading: true });
    this.fetchData(endpoint);
    //}
  }

  //search items methods
  searchMovie: (search: string) => void = (search: string) => {
    let endpoint = "";
    this.setState({
      movies: [],
      loading: true,
      searchterm: search
    });

    if (search === "") {
      endpoint = `https://localhost:5001/api/popular`;
    } else {
      endpoint = endpoint = `https://localhost:5001/api/search/${search}`;
    }

    this.fetchData(endpoint);
  };

  //fetch next page when press loadmore button and load searched movies
  loadMore: () => void = () => {
    let endpoint: string = "";
    this.setState({ loading: true });
    if (this.state.searchterm === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this
        .state.currentPage + 1}`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.searchterm}`;
    }

    this.fetchData(endpoint);
  };

  /** function to fetch the data from the database and set the states. argument is the api url */
  fetchData: (endpoint: string) => void = endpoint => {
    fetch(endpoint)
      .then(chunk => chunk.json())
      .then(result => {
        return this.setState(
          {
            movies: [...this.state.movies, ...result.results],
            heroimage: this.state.heroimage || result.results[0],
            loading: false,
            currentPage: result.page,
            totalPages: result.total_pages
          },
          () => {
            console.log(this.state);
            // localStorage.setItem("HomeState", JSON.stringify(this.state));
          }
        );
      })
      .then(result => console.log(result))
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div className="rmdb-home">
        {this.state.heroimage ? (
          <div>
            <HeroImage
              heroimage={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.heroimage.backdrop_path}`}
              title={this.state.heroimage.original_title}
              description={this.state.heroimage.overview}
            />
            <SearchBar callback={this.searchMovie} />
          </div>
        ) : null}
        <div className="rmdb-home-grid">
          <FourColGrid
            header={this.state.searchterm ? "Search Result" : "Popular Movies"}
            loading={this.state.loading}
          >
            {this.state.movies.map((element: any, i: number) => {
              return (
                <MovieThumb
                  key={i}
                  clickable={true}
                  image={
                    element.poster_path
                      ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`
                      : "./images/no_image.jpg"
                  }
                  movieId={element.id}
                  movieName={element.original_title}
                />
              );
            })}
          </FourColGrid>
          {this.state.loading ? <Spinner /> : ""!}
          {this.state.currentPage <= this.state.totalPages &&
          !this.state.loading ? (
            <LoadMoreBtn text="Load More" onClick={this.loadMore} />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
