import React from 'react';

const FormElement = ({ type, width, height }) => {
    const baseStyle = "w-full h-full box-border";

    switch (type) {
        case 'Input Field':
            return <input type="text" placeholder="Input Field" className={`${baseStyle} p-2 border rounded`} />;
        case 'Textarea':
            return <textarea placeholder="Textarea" className={`${baseStyle} p-2 border rounded`} />;
        case 'Button':
            return <button className={`${baseStyle} p-2 border rounded bg-primary text-white`}>Button</button>;
        default:
            return null;
    }
};

export default FormElement;