import React from 'react'
import './Button.scss'

const Button = (props) => {

    const bg = props.backgroundColor ? 'bg-' + props.backgroundColor : 'bg-main'

    const size = props.size ? 'btn-' + props.size : ''

    const animate = props.animate ? 'btn-animate' : ''

    const active = props.active ? 'btn-active' : ''

    return (
        <button
            className={`btn ${bg} ${size} ${animate} ${active}`}
            onClick={props.onClick ? () => props.onClick() : null}
        >
            <span className="btn__txt">{props.children}</span>
            {
                props.icon ? (
                    <span className="btn__icon">
                        <i className={`${props.icon}`}></i>
                    </span>
                ) : null
            }
        </button>
    )
}

export default Button