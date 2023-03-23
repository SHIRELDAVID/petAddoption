import React, { useState } from 'react'
import './SearchBar.css'

function SearchBar({ filters, setFilters }) {

    const [advancedMode, setAdvancedMode] = useState()

    const handleModeChange = ({ target }) => {
        setAdvancedMode(target.checked)
        if (!target.checked) setFilters(setFilters({}))
    }

    const handleFilter = (newFilter) => setFilters({ ...filters, ...newFilter })

    return (
        <div className="searchPage">
            <div className='searchContainer'>
                <div className="searchContainer__left">
                    <small>advanced search</small>
                    <label class="switch">
                        <input type="checkbox" onChange={(e) => handleModeChange(e)} />
                        <span class="slider round"></span>
                    </label>
                </div>

                <div className="searchContainer__right">
                    <select value={filters?.type} className='searchContainer__filter' onChange={(e) => handleFilter({ type: e.target.value })}>
                        <option disabled hidden selected value="">Animal type</option>
                        <option value="cat">cat</option>
                        <option value="dog">dog</option>
                    </select>
                    {advancedMode && <select value={filters?.status} className='searchContainer__filter' onChange={(e) => handleFilter({ status: e.target.value })}>
                        <option disabled hidden selected value="">Adoption status</option>
                        <option value="available">available</option>
                        <option value="adopted">adopted</option>
                        <option value="fostered">fostered</option>
                    </select>}
                    {advancedMode && <input value={filters?.height} type="number" placeholder="height (in cm)" className='searchContainer__filter' onChange={(e) => handleFilter({ height: e.target.value })}></input>}
                    {advancedMode && <input value={filters?.weight} type="number" placeholder="weight (in kg)" className='searchContainer__filter' onChange={(e) => handleFilter({ weight: e.target.value })}></input>}
                    {advancedMode && <input value={filters?.name} type="text" placeholder="name" className='searchContainer__filter' onChange={(e) => handleFilter({ name: e.target.value })}></input>}
                </div>
            </div>


        </div>
    )
}

export default SearchBar
