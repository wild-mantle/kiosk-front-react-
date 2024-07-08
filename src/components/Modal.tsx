import React, { useState } from 'react';
import '../../../../../../../../Downloads/kiosk-front-react--ver3/src/components/Modal.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (options: CustomOptions) => void;
    menu: Menu | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, menu }) => {
    const [temperature, setTemperature] = useState<string>('ice');
    const [size, setSize] = useState<string>('small');
    const [shot, setShot] = useState<boolean>(false);
    const [whippedCream, setWhippedCream] = useState<boolean>(false);

    const handleSave = () => {
        const options: CustomOptions = {
            temperature,
            size,
            shot,
            whippedCream,
            packaging: 'takeaway',  // 포장 옵션은 라디오 버튼을 생략
        };
        onSave(options);
        onClose();
    };

    const handleSelectAll = () => {
        setTemperature('hot');
        setSize('large');
        setShot(true);
        setWhippedCream(true);
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
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        value="ice"
                                        checked={temperature === 'ice'}
                                        onChange={(e) => setTemperature(e.target.value)}
                                    />
                                    Ice
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="hot"
                                        checked={temperature === 'hot'}
                                        onChange={(e) => setTemperature(e.target.value)}
                                    />
                                    Hot
                                </label>
                            </div>
                        </div>

                        <div>
                            <label>Size:</label>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        value="small"
                                        checked={size === 'small'}
                                        onChange={(e) => setSize(e.target.value)}
                                    />
                                    Small
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="medium"
                                        checked={size === 'medium'}
                                        onChange={(e) => setSize(e.target.value)}
                                    />
                                    Medium
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="large"
                                        checked={size === 'large'}
                                        onChange={(e) => setSize(e.target.value)}
                                    />
                                    Large
                                </label>
                            </div>
                        </div>

                        <div>
                            <label>Extra Shot:</label>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        value="true"
                                        checked={shot === true}
                                        onChange={() => setShot(true)}
                                    />
                                    Yes
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="false"
                                        checked={shot === false}
                                        onChange={() => setShot(false)}
                                    />
                                    No
                                </label>
                            </div>
                        </div>

                        <div>
                            <label>Whipped Cream:</label>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        value="true"
                                        checked={whippedCream === true}
                                        onChange={() => setWhippedCream(true)}
                                    />
                                    Yes
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="false"
                                        checked={whippedCream === false}
                                        onChange={() => setWhippedCream(false)}
                                    />
                                    No
                                </label>
                            </div>
                        </div>

                        <button onClick={handleSave}>Add to Order</button>
                        <button onClick={handleSelectAll}>Select All Options</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Modal;
