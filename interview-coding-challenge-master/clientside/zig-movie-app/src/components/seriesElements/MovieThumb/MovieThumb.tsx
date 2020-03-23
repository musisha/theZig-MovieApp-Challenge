import * as React from 'react';
import { Link } from 'react-router-dom';

import './MovieThumb.css';

interface IMoviethumb {
    image: string,
    key?: any,
    clickable: boolean,
    movieId?: number,
    movieName?: string

}

export const MovieThumb: React.FC<IMoviethumb> = (props: IMoviethumb) => (
    <div className="rmdb-moviethumb">
    {props.clickable ?
        <Link to={{ pathname: `movie/${props.movieId}`, movieName: `${props.movieName}` }}>
            <img src={props.image} alt="moviethumb" />
       </Link>
       :
       <img src={props.image} alt="moviethumb" />
    }
    </div>
)