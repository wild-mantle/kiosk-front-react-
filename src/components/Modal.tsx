import React, { useState } from 'react';
import './Modal.css';

export interface Menu {
    id: number;
    name: string;
    basePrice: number;
    description: string;
    image: string;
    category: string;
}

export interface CustomOptions {
    temperature: string;
    size: string;
    shot: boolean;
    whippedCream: boolean;
    packaging: string;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (options: CustomOptions) => void;
    menu: Menu | null; // menu 프로퍼티를 추가합니다.
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, menu }) => {
    const [temperature, setTemperature] = useState<string>('ice');
    const [size, setSize] = useState<string>('small');
    const [shot, setShot] = useState<boolean>(false);
    const [whippedCream, setWhippedCream] = useState<boolean>(false);
    const [packaging, setPackaging] = useState<string>('takeaway');

    const handleSave = () => {
        const options: CustomOptions = {
            temperature,
            size,
            shot,
            whippedCream,
            packaging
        };
        onSave(options);
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>Close</button>
                {menu && (
                    <div>
                        <h2>{menu.name}</h2>
                        <p>{menu.description}</p>
                        <p>{menu.basePrice}</p>

                        <div>
                            <label>Temperature:</label>
                            <select value={temperature} onChange={(e) => setTemperature(e.target.value)}>
                                <option value="ice">Ice</option>
                                <option value="hot">Hot</option>
                            </select>
                        </div>

                        <div>
                            <label>Size:</label>
                            <select value={size} onChange={(e) => setSize(e.target.value)}>
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>

                        <div>
                            <label>
                                <input type="checkbox" checked={shot} onChange={(e) => setShot(e.target.checked)} />
                                Extra Shot
                            </label>
                        </div>

                        <div>
                            <label>
                                <input type="checkbox" checked={whippedCream} onChange={(e) => setWhippedCream(e.target.checked)} />
                                Whipped Cream
                            </label>
                        </div>

                        <div>
                            <label>Packaging:</label>
                            <select value={packaging} onChange={(e) => setPackaging(e.target.value)}>
                                <option value="takeaway">Takeaway</option>
                                <option value="dinein">Dine-in</option>
                            </select>
                        </div>

                        <button onClick={handleSave}>Add to Order</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Modal;
