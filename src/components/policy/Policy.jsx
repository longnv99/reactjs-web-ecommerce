import React from 'react'
import './Policy.scss'

const Policy = (props) => {
    return (
        <div className="policy-card">
            <div className="policy-card__icon">
                <i className={props.icon}></i>
            </div>
            <div className="policy-card__info">
                <div className="policy-card__info__name">
                    {props.name}
                </div>
                <div className="policy-card__info__description">
                    {props.description}
                    <span>{props.highlight}</span>
                </div>
            </div>
        </div>
    )
}

export default Policy