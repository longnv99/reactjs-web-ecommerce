import React, { useState } from 'react'
import './InputForm.scss'

const InputForm = (props) => {

    const [focused, setFocused] = useState(false)

    return (
        <div className="form__item">
            <div className="form__item__title">{props.title}</div>
            <input 
                id={props.id}
                className="form__item__input" 
                type={props.type} 
                name={props.name}
                placeholder={props.placeholder}
                pattern={props.pattern}
                required={props.required}
                autoComplete={props.autoComplete}
                onChange={props.onChange}
                onBlur={(e) => setFocused(true)}
                onFocus={() => {setFocused(true)}}
                focused={focused.toString()}
            />
            <span className='form__item__message'>{props.errorMessage}</span>
        </div>
    )
}

export default InputForm