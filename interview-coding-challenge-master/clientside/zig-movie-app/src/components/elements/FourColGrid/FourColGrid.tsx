import * as React from 'react';
import './FourColGrid.css';
import { IFourcolgrid } from './IFourColGrid';


export const FourColGrid: React.FC<IFourcolgrid> = (props: IFourcolgrid) => {

    const renderElements: () => React.ReactNode = () => {
        const gridElements = props.children.map((element: any, id: number) => {
            return ( 
                <div key={id} className="rmdb-grid-element">
                    {element}
                </div>
            )
        })
        return gridElements;
    }

    return (
    <div className="rmdb-grid">
        { props.header && !props.loading ? <h1>{ props.header }</h1> : null}
        <div className="rmdb-grid-content">
            {renderElements()}
        </div>
    </div>
)
}