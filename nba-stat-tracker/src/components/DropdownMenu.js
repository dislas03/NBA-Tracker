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
        setSelectedOption(null);
    };

    const displayText = selectedOption ? selectedOption.label : 'Select a season';
    
    return (
        <div className="dropdown">
            <button onClick={handleToggle} className="dropdown-toggle">
                {displayText}
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