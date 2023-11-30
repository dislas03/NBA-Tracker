import { useState } from "react";

const DropdownMenu = ({ options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option);
    };

    return (
        <div className="dropdown">
            <button onClick={handleToggle} className="dropdown-toggle">
                {selectedOption ? selectedOption.label : 'Select an option'}
            </button>

            {isOpen && options && options.length > 0 && (
                <ul className="dropdown-menu">
                    {options.map((option) => (
                <li key={option.id} onClick={() => handleOptionClick(option)}>
                        <button>{option}</button>
                        </li>
                ))}
                </ul>
            )}
        </div>
    );
};

export default DropdownMenu;