import React, {useState} from "react";


function InputComponents(props) {
    const [value, setValue] = useState("");
    const [name] = useState(props.name ?? '');
    const [type] = useState(props.type ?? 'text');
    const [placeholder] = useState(props.placeholder ?? '');
    const [label] = useState(props.label ?? '');
    const [containerClass] = useState(props.containerClass ?? '');
    const [inputClass] = useState(props.inputClass ?? '');
    const [required] = useState(props.required ?? false);

    return (
        <div className={'form-group ' + containerClass}>
            <label>{label}</label>
            <input
                type={type}
                className={'form-control ' + inputClass}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={e => setValue(e.target.value)}
                required={required}
            />
           <small id={name+'-error'} className="form-text error-message">
               {required && !props.errorMessage && props.submitted ? name.charAt(0).toLocaleUpperCase() + name.slice(1).replace('_', ' ')  + ' is required' : props.errorMessage}
           </small>
        </div>
    )
}

export default InputComponents