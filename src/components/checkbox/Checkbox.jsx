import React , { useRef } from 'react'
import './Checkbox.scss'

const Checkbox = (props) => {

    const inputRef = useRef(null)

    const onChange = () => {
        if(props.onChange) {
            props.onChange(inputRef.current)
        }
    }

    return (
        <label className="checkbox">
            <input 
                type="checkbox" 
                ref={inputRef} 
                onChange={onChange} 
                checked={props.checked} 
            />
            <span className='checkbox__checkmark'>
                <i className="fa-solid fa-check"></i>
            </span>
            {props.label}
        </label>
    )
}

export default Checkbox