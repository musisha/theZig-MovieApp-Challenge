import * as React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

interface IProps {
    movie: any
}

export const Navigation: React.FC<IProps> = (props: IProps) => (
    <div className="rmdb-navigation">
        <div className="rmdb-navigation-content">
            <Link to="/">
                <p>Home</p>
            </Link>
            <p>/</p>
            <p>{props.movie}</p>
        </div>
    </div>
)