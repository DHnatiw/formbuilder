import { useState } from 'react';
import Modal from 'react-modal';
import { Rnd } from 'react-rnd';
import FormElement from './FormElement';
import PropertyPanel from './PropertyPanel';
import Toolbar from './Toolbar';

Modal.setAppElement('#root'); // Set the app root element for accessibility


const FormBuilder = () => {
    const [elements, setElements] = useState([]);
    const [selectedElement, setSelectedElement] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formJSON, setFormJSON] = useState('');
    const [isToolbarMinimized, setIsToolbarMinimized] = useState(false);

    const [isPropertyPanelMinimized, setIsPropertyPanelMinimized] = useState(false);

    const addElement = (type, x, y) => {
        const element = document.getElementById(`toolbar-${type}`);
        const width = element ? element.offsetWidth : 200;
        const height = element ? element.offsetHeight : 30; // Standard control height
        setElements((prev) => [
            ...prev,
            {
                id: Date.now(),
                type,
                x: Math.round(x / 10) * 10,
                y: Math.round(y / 10) * 10,
                width,
                height,
            },
        ]);
    };

    const updatePositionAndSize = (id, x, y, width, height) => {
        setElements((prev) =>
            prev.map((el) =>
                el.id === id
                    ? { ...el, x: Math.round(x / 10) * 10, y: Math.round(y / 10) * 10, width, height }
                    : el
            )
        );
    };

    const handleDrop = (e) => {
        const type = e.dataTransfer.getData('type');
        const container = document.getElementById('form-builder');
        const containerRect = container.getBoundingClientRect();
        const x = e.clientX - containerRect.left;
        const y = e.clientY - containerRect.top;
        addElement(type, x, y);
    };

    const handleElementClick = (element) => {
        setSelectedElement(element);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedElement((prev) => ({
            ...prev,
            [name]: value,
        }));
        setElements((prev) =>
            prev.map((el) => (el.id === selectedElement.id ? { ...el, [name]: value } : el))
        );
    };

    const handleSaveClick = () => {
        const json = elements.map(el => ({
            id: el.id,
            type: el.type,
            x: el.x,
            y: el.y,
            width: el.width,
            height: el.height,
            // ... other properties
        }));
        setFormJSON(JSON.stringify(json, null, 2));
        setShowModal(true);
    };

    return (
        <div className="flex h-full w-full">
            <div className='w-60' >
                      <Toolbar 
        onGenerateJSON={handleSaveClick} 
        isMinimized={isToolbarMinimized} 
        setIsMinimized={setIsToolbarMinimized} 
      />
      

                <Modal
                    isOpen={showModal}
                    onRequestClose={() => setShowModal(false)}
                    contentLabel="JSON Output"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg"
                >
                    <h2 className="text-xl font-bold mb-4">Form JSON</h2>
                    <pre>{formJSON}</pre>
                    <button onClick={() => setShowModal(false)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Close</button>
                </Modal>

            </div>
            <div className='w-full h-screen'>
            <div
                id="form-builder"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="border border-black bg-gray-100 w-full h-full"
            >
                {elements.map((el) => (
                    <Rnd
                        key={el.id}
                        default={{ x: el.x, y: el.y, width: el.width, height: el.height }}
                        position={{ x: el.x, y: el.y }}
                        size={{ width: el.width, height: el.height }}
                        onDragStop={(e, d) => updatePositionAndSize(el.id, d.x, d.y, el.width, el.height)}
                        onResizeStop={(e, direction, ref, delta, position) =>
                            updatePositionAndSize(el.id, position.x, position.y, ref.offsetWidth, ref.offsetHeight)
                        }
                        bounds="#form-builder"
                        className="absolute border-2 border-transparent hover:border-blue-500 hover:shadow-lg cursor-move p-2 rounded transition duration-300 ease-in-out"
                        style={{ transitionProperty: 'border, box-shadow' }}
                        enableResizing={{
                            top: true,
                            right: true,
                            bottom: true,
                            left: true,
                            topRight: true,
                            bottomRight: true,
                            bottomLeft: true,
                            topLeft: true,
                        }}
                        minWidth={50} // Minimum width of standard control
                        minHeight={30} // Minimum height of standard control
                        dragGrid={[10, 10]} // Snap to 10px grid for dragging
                        resizeGrid={[10, 10]} // Snap to 10px grid for resizing
                        onClick={() => handleElementClick(el)}
                    >
                        <div className="w-full h-full p-0 m-0 box-border">
                            <FormElement type={el.type} width={el.width} height={el.height} />
                        </div>
                    </Rnd>
                ))}
            </div>
            </div>
            <div className='w-60'>
                <PropertyPanel
                    isMinimized={isPropertyPanelMinimized}
                    setIsMinimized={setIsPropertyPanelMinimized}
                    selectedElement={selectedElement}
                    handleInputChange={handleInputChange}
                    />
            </div>
        </div>
    );
};

export default FormBuilder;