import React, { useState } from 'react'
import "./AddPet.css"
function AddPet({ setIsOpen }) {

    const [feedback, setFeedback] = useState({
        color: "green",
        content: ""
    })

    const [formData, setFormData] = useState({})

    const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
    const handleAddPet = () => { }

    return (
        <div className="login__card">
            <span onClick={() => setIsOpen(false)}>x</span>
            <div className="card__top">
                <h2>Edit pet</h2>

            </div>
            <div className="card__content">
                <select className='searchContainer__filter' onSelect={(e) => handleFormChange(e)}>
                    <option disabled hidden selected value="">status</option>
                    <option value="cat">adopted</option>
                    <option value="dog">fostered</option>
                    <option value="bunny">available</option>

                </select>
                <input className="card__input" name="name" onChange={(e) => handleFormChange(e)} type="text" placeholder='name' required />
                <input className="card__input" name="type" onChange={(e) => handleFormChange(e)} type="text" placeholder='type' required />

                <input className="card__input" name="breed" onChange={(e) => handleFormChange(e)} type="text" placeholder='breed' required />
                <input className="card__input" name="age" onChange={(e) => handleFormChange(e)} type="number" placeholder='age' required />
                <input className="card__input" name="height" onChange={(e) => handleFormChange(e)} type="number" placeholder='height' required />
                <input className="card__input" name="weight" onChange={(e) => handleFormChange(e)} type="number" placeholder='weight' required />
                <input className="card__input" name="color" onChange={(e) => handleFormChange(e)} type="text" placeholder='color' required />
                <input className="card__input" name="dietaryRestrictions" onChange={(e) => handleFormChange(e)} type="text" placeholder='Dietary restrictions' required />
                <input className="card__input" name="bio" onChange={(e) => handleFormChange(e)} type="text" placeholder='bio' required />
                <input className="card__input" name="image" onChange={(e) => handleFormChange(e)} type="file" placeholder='image' required />
                <div className='hypoallergenicContainer'>
                    <label class="switch">
                        <input type="checkbox" name="hypoallergenic" onChange={(e) => handleFormChange(e)} />
                        <span class="slider round"></span>
                    </label>
                    <small>Hypoallergenic? </small>
                </div>
                <button className="card__btn" onClick={() => handleAddPet()}>Save changes</button>
            </div>
            <p style={{ color: feedback.color }} className='card__feedback'>{feedback.content}</p>
        </div >
    )
}

export default AddPet