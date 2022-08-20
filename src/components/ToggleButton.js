import React from 'react'

function ToggleButton({onChange}) {
    return (
        <div>
            <input type="checkbox" className="toggle-button" onChange={onChange} />
        </div>
    )
}

export default ToggleButton;
