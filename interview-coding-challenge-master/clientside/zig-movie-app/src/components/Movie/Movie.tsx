import * as React from "react";
import "./Movie.css";
import { Navigation } from "../elements/Navigation/Navigation";
import { MovieInfo } from "../elements/MovieInfo/MovieInfo";
import { MovieInfoBar } from "../elements/MovieInfoBar/MovieInfoBar";
import { FourColGrid } from "../elements/FourColGrid/FourColGrid";
import { Spinner } from "../elements/Spinner/Spinner";
import { Actor } from "../elements/Actor/Actor";
import { Props, IState } from "./IMovie";
import {port, uri} from '../../config';

export class Movie extends React.Component<Props, IState> {
  state: IState = {
    movie: [],
    actors: null,
    directors: [],
    loading: false
  };

  //fetch api data and update the states when the component mounts
  componentDidMount() {
    this.setState({ loading: true });
    //fetch movie
    const endpoint = `${uri}${port}/api/movie/${this.props.match.params.movieId}`;
    this.fetchData(endpoint);
  }
  fetchData(endpoint: string) {
    fetch(endpoint)
      .then(chunk => chunk.json())
      .then(result => {
        if (result.status_code) {
          this.setState({ loading: false });
        } else {
          this.setState(
            {
              movie: result
            },
            () => {
              //get actors
              const endpoint = `${uri}${port}/api/credits/${this.props.match.params.movieId}`;
              fetch(endpoint)
                .then(chunk => chunk.json())
                .then(result => {
                  const directors = result.crew.filter(
                    (member: any) => member.job === "Director"
                  );

                  this.setState({
                    actors: result.cast,
                    directors,
                    loading: false
                  });
                });
            }
          );
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="rmdb-movie">
        {this.state.movie ? (
          <div>
            <Navigation movie={this.props.location.movieName} />
            <MovieInfo
              movie={this.state.movie}
              directors={this.state.directors}
            />
            <MovieInfoBar
              time={this.state.movie.runtime}
              budget={this.state.movie.budget}
              revenue={this.state.movie.revenue}
            />
          </div>
        ) : null}
        {this.state.actors ? (
          <div className="rmdb-movie-grid">
            <FourColGrid header={"Actors"}>
              {this.state.actors.map(
                (element: any, i: string | number | undefined) => {
                  return <Actor key={i} actor={element} />;
                }
              )}
            </FourColGrid>
          </div>
        ) : null}

        {!this.state.movie && !this.state.actors && !this.state.loading ? (
          <h1>No Movie Found</h1>
        ) : null}
        {this.state.loading ? <Spinner /> : null}
      </div>
    );
  }
}
