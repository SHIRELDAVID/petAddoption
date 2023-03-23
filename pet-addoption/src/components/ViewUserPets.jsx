import React from 'react'
import "./ViewUser.css"
import { useParams, useState, useEffect } from 'react'
import axios from 'axios'
import "./ViewUserPets.css";

function ViewUserPets({ options }) {

    const { userData } = options
    const [pets, setPets] = useState([])

    useEffect(() => {
        const promisses = []
        userData.pets.forEach(z =>
            promisses.push(axios.get(`http://localhost:8080/pet/getById/${z}`))
        );
        (async () => {
            const res = await Promise.all(promisses)
            setPets(res.map(r => r.data))
        })()
    }, [])



    return <div className='viewpets'>
        <h1>Users's Pets</h1>

        {pets.map(petData => <div className="petcard__container">
            <h2>{petData.name}</h2>
            <div className="petcard__content">
                <img src={`http://localhost:8080/${petData.image}`} alt="" />
                <p>{petData.bio}</p>
                <p><b>type:</b> {petData.type}</p>
                <p><b>breed:</b> {petData.breed}</p>
                <p><b>age:</b> {petData.age}</p>
                <p><b>status:</b> {petData.status}</p>
                <p><b>height:</b> {petData.height}</p>
                <p><b>weight:</b> {petData.weight}</p>
                <p><b>color:</b> {petData.color}</p>
                <p><b>hypoallergenic: </b>{petData.hypoallergenic ? "Yes" : "No"}</p>
                <p><b>dietaryRestrictions: </b>{petData.dietaryRestrictions}</p>
            </div>
        </div>
        )}
    </div >;
}

export default ViewUserPets;