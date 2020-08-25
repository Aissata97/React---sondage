import React from 'react'

const SelectComponent = ({ options, labelSelect, idSelect, onChange }) => (
    <div>
        <label htmlFor={idSelect}>{labelSelect}</label>

        <select name={idSelect} id={idSelect} onChange={onChange}>
            {options.map((option, i) =>
                <option key={i} value={option.value}>{option.label}</option>
            )}
        </select>
    </div>
)

export default SelectComponent
