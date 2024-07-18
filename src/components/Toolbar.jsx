import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Toolbar = ({ isMinimized, setIsMinimized }) => {
    const handleDragStart = (e, type) => {
        e.dataTransfer.setData('type', type);
    };

    return (
        <div className="relative flex h-full">
            <div className={`flex-1 border border-black bg-gray-100 overflow-y-auto ${isMinimized ? 'w-10 p-0' : 'w-64 p-2'} transition-all duration-3000`}>
                {!isMinimized && (
                    <>
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
            <button
                className="absolute top-10 right-0 transform translate-x-full bg-gray-800 text-white p-2 w-10 h-10 flex items-center justify-center rounded-r shadow-md cursor-pointer"
                onClick={() => setIsMinimized(!isMinimized)}
            >
                <FontAwesomeIcon icon={isMinimized ? faChevronRight : faChevronLeft} />
            </button>
        </div>
    );
};

export default Toolbar;