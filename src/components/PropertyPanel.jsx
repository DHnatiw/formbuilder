import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const PropertyPanel = ({ isMinimized, setIsMinimized, selectedElement, handleInputChange }) => {
    return (
        <div className={`relative flex flex-col bg-gray-100 border-l border-gray-300 ${isMinimized ? 'w-10' : 'w-64'} transition-all duration-300`}>
            <button
                className="absolute top-10 left-full transform -translate-x-full bg-gray-800 text-white p-2 w-10 h-10 flex items-center justify-center rounded-l shadow-md cursor-pointer"
                onClick={() => setIsMinimized(!isMinimized)}
            >
                <FontAwesomeIcon icon={isMinimized ? faChevronLeft : faChevronRight} />
            </button>
            {!isMinimized && (
                <div className="p-2">
                    <h3 className="text-lg font-bold mb-2">Element Details</h3>
                    {selectedElement && (
                        <div className="space-y-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Top:</label>
                                <input
                                    type="number"
                                    name="y"
                                    value={selectedElement.y}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Left:</label>
                                <input
                                    type="number"
                                    name="x"
                                    value={selectedElement.x}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Width:</label>
                                <input
                                    type="number"
                                    name="width"
                                    value={selectedElement.width}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Height:</label>
                                <input
                                    type="number"
                                    name="height"
                                    value={selectedElement.height}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Font Size:</label>
                                <input
                                    type="number"
                                    name="fontSize"
                                    value={selectedElement.fontSize || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Font Weight:</label>
                                <input
                                    type="text"
                                    name="fontWeight"
                                    value={selectedElement.fontWeight || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Text:</label>
                                <input
                                    type="text"
                                    name="text"
                                    value={selectedElement.text || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PropertyPanel;