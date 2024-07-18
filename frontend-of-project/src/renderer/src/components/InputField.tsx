import React from 'react';

interface InputFieldProps {
    label: string,
    value: number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string,
    type: 'hours' | 'minutes' | 'seconds'
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    value,
    onChange,
    placeholder,
    type
}: InputFieldProps) => {

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let inputValue = e.target.value;
        if (inputValue === '' || isNaN(parseInt(inputValue))) {
            inputValue = '0';
        } else {
            const numericValue = parseInt(inputValue);
            if ((type === 'minutes' || type === 'seconds') && numericValue > 59) {
            inputValue = '59';
            }
        }
    
        onChange({ ...e, target: { ...e.target, value: inputValue } });
    }

    return (
        <div>
            <label 
                htmlFor={label}
                className='text-stone-300'
            >
                {label}
            </label>
            <input 
                type="number" 
                value={value} 
                onChange={handleValueChange} 
                placeholder={placeholder}
                max={type === 'hours' ? 24 : 59}
                min={0}
                className='w-20 m-5 bg-transparent text-blue-400'
                id={label}
            />
        </div>
    );
}

export default InputField;
