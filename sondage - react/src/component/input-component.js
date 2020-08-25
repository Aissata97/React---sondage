import React from 'react'

const InputComponent = ({ typeInput, label, idInput, onChange }) => (
    <div>
        <label htmlFor={idInput}>{label}</label><br />
        <input type={typeInput} name={idInput} id={idInput} onChange={onChange} /><br />
    </div>
)

export default InputComponent
