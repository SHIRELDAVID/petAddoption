import React from 'react'

function StatusFilter({ ownerSwitch, setOwnerSwitch }) {

    const handleStatusChange = (e) => setOwnerSwitch(e.target.checked)
    return (
        <div className='searchContainer'>
            <small>My pets</small>
            <label class="switch">
                <input value={ownerSwitch} type="checkbox" onChange={(e) => handleStatusChange(e)} />
                <span class="slider round"></span>
            </label>
            <small>Saved pets</small>
        </div>

    )
}

export default StatusFilter