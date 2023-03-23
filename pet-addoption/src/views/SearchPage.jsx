import React, { useState } from 'react'
import Modal from '../components/Modal'
import NavBar from '../components/NavBar'
import PetsList from '../components/PetsList'
import SearchBar from '../components/SearchBar'

function SearchPage() {

    const [filters, setFilters] = useState({})

    return (
        <>
            <NavBar />
            <SearchBar filters={filters} setFilters={setFilters} />
            <PetsList filters={filters} />
        </>
    )
}

export default SearchPage