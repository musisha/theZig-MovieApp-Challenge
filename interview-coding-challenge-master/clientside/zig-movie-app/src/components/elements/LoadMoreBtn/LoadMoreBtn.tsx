import * as React from 'react';
import './LoadMoreBtn.css';

interface ILoadmorebtn {
    onClick: React.ReactEventHandler,
    text: string
};

export const LoadMoreBtn: React.FC<ILoadmorebtn> = (props: ILoadmorebtn) => (
    <div className="rmdb-loadmorebtn" onClick={props.onClick}>
        <p>{props.text}</p>
    </div>
)