import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faSave } from '@fortawesome/free-solid-svg-icons';

const Toolbar = ({ isMinimized, setIsMinimized, onGenerateJSON }) => {
    const [dragElement, setDragElement] = useState(null);

    const handleDragStart = (e, type) => {
        e.dataTransfer.setData('type', type);

        // Create a draggable element to represent the form control
        const dragPreview = document.createElement('div');
        dragPreview.className = 'absolute border border-gray-300 p-2 bg-white rounded shadow-md'; // Style the drag preview
        dragPreview.innerHTML = type; // You can customize the content of the drag preview
        document.body.appendChild(dragPreview);

        e.dataTransfer.setDragImage(dragPreview, dragPreview.offsetWidth / 2, dragPreview.offsetHeight / 2);

        // Store the drag element to clean up later
        setDragElement(dragPreview);
    };

    const handleDragEnd = () => {
        if (dragElement) {
            document.body.removeChild(dragElement);
            setDragElement(null);
        }
    };

    useEffect(() => {
        // Add the drag end event listener when the component mounts
        window.addEventListener('dragend', handleDragEnd);

        // Remove the drag end event listener when the component unmounts
        return () => {
            window.removeEventListener('dragend', handleDragEnd);
        };
    }, []); 
    
    return (
        <div className={`relative bg-gray-800 text-white h-full w-full ${isMinimized ? 'w-10' : 'w-64'} transition-all duration-300 ease-in-out`}>
            <div className={`overflow-y-auto h-full pb-4 ${isMinimized ? 'h-0' : 'h-[calc(100%-52px)]'} transition-all duration-300 ease-in-out`}>
                {!isMinimized && (
                    <>
                        <h3 className="text-lg font-semibold p-2">Elements</h3>
                        <div
                            id="toolbar-Input Field"
                            draggable
                            onDragStart={(e) => handleDragStart(e, 'Input Field')}
                            className="cursor-move p-2 border border-gray-300 mb-2 bg-gray-200"
                        >
                            <div className="p-2 bg-gray-300 rounded">Input Field</div>
                        </div>
                        <div
                            id="toolbar-Textarea"
                            draggable
                            onDragStart={(e) => handleDragStart(e, 'Textarea')}
                            className="cursor-move p-2 border border-gray-300 mb-2 bg-gray-200"
                        >
                            <div className="p-2 bg-gray-300 rounded">Textarea</div>
                        </div>
                        <div
                            id="toolbar-Button"
                            draggable
                            onDragStart={(e) => handleDragStart(e, 'Button')}
                            className="cursor-move p-2 border border-gray-300 mb-2 bg-gray-200"
                        >
                            <div className="p-2 bg-gray-300 rounded">Button</div>
                        </div>
                    </>
                )}
            </div>
            {/* Save button */}
            {!isMinimized && (
                <button
                    onClick={onGenerateJSON}
                    className="absolute bottom-0 left-0 w-full p-2 bg-blue-500 hover:bg-blue-700 text-white rounded-none transition duration-200 ease-in-out"
                >
                    <FontAwesomeIcon icon={faSave} className="mr-2" /> Save
                </button>
            )}

            {/* Toggle button */}
            <button
                className="absolute top-10 right-0 transform translate-x-full bg-gray-700 hover:bg-gray-600 text-white p-2 w-10 h-10 flex items-center justify-center rounded-r shadow-md cursor-pointer transition duration-200 ease-in-out"
                onClick={() => setIsMinimized(!isMinimized)}
            >
                <FontAwesomeIcon icon={isMinimized ? faChevronRight : faChevronLeft} />
            </button>
        </div>
    );
};

export default Toolbar;