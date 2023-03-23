import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PetsList.css";

function PetsList({ filters, owner, ownerSwitch }) {
  
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([])
  const user = JSON.parse(localStorage.getItem("user"))
  const fetchData = async () => {
    const response = await axios.get("http://localhost:8080/pet/getAll");

    setData(owner ? response.data.filter(pet => user?.pets.includes(pet._id) || user?.savedPets.includes(pet._id)) : response.data)
    setFilteredData(owner ? response.data.filter(pet => user?.pets.includes(pet._id)) : response.data)
  };

  const compareArrays = (array1, array2) => {
    return (
      array1.length === array2.length &&
      array1.every((el) => array2.includes(el))
    );
  };

  const filterFields = async (key) => {
    setFilteredData(
      data.filter(item => {
        if (compareArrays(Object.keys(filters), Object.keys(filters).filter(key => {
          if (filters[key] === NaN || filters[key] === "") return item
          else if (item[key]?.toString()?.toLowerCase()?.includes(filters[key])) return item
        }))) return item
      }))
  }


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (filters) {
      const keys = Object.keys(filters)
      if (keys === []) setFilteredData(data)
      else filterFields()
    }

    if (owner) {
      setFilteredData(!ownerSwitch ? data.filter(pet => user?.pets.includes(pet._id)) : data.filter(pet => user?.savedPets.includes(pet._id)))
    }
  }, [filters, ownerSwitch])


  return (
    <div className="results">
      {filteredData.map((pet) => (
        <div className="results__card">
          <img src={`http://localhost:8080/${pet.image}`} alt={pet.name} className="card__img" />
          <h3 className="card__name">{pet.name}</h3>
          <p className="card__type">{pet.status}</p>
          <Link to={`/petDetails/${pet._id}`} className="card__btn">
            Details
          </Link>
        </div>
      ))}
    </div>
  );
}

export default PetsList;
