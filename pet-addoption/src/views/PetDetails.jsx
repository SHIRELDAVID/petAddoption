import React from 'react'
import NavBar from '../components/NavBar'
import "./PetDetails.css"
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function PetDetails() {

    const [petData, setPetData] = useState({})
    const { petId } = useParams()
    const [feedback, setFeedback] = useState({
        color: "green",
        content: ""
    })
    useEffect(() => {
        getPet(petId)
    }, [])

    const getPet = async (id) => {
        try {
            const res = await axios.get(`http://localhost:8080/pet/getById/${id}`,);
            setPetData(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const petOperation = async (uri) => {
        try {
            const res = await axios.post(
                `http://localhost:8080/${uri}`, { petId, userId: JSON.parse(localStorage.getItem("user"))._id },
                {
                    headers: {
                        "auth-token": localStorage.getItem("token"),
                    },
                }
            );
            const updatedUser = await axios.get(`http://localhost:8080/user/getById/${JSON.parse(localStorage.getItem("user"))._id}`, {
                headers: {
                    "auth-token": localStorage.getItem("token"),
                }
            })
            localStorage.setItem("user", JSON.stringify(updatedUser.data))
            window.location.href = `/myPets`
            setFeedback({
                color: "green",
                content: "operation done successfuly",
            });

        } catch (err) {
            setFeedback({
                color: "red",
                content: err.response.data?.message,
            });
        }
    };

    const isMine = () => {
        if (JSON.parse(localStorage.getItem("user")).pets.includes(petId)) return true
        return false
    }

    const isSaved = () => {
        if (JSON.parse(localStorage.getItem("user")).savedPets.includes(petId)) return true
        return false
    }

    if (petData.name) return (
        <div>
            <NavBar />
            <div className="petcard__container">
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
                {localStorage.getItem("token") &&
                    <>
                        {!isMine() && (petData.status !== "adopted" || petData.status !== "fostered") &&
                            <>
                                <button onClick={() => petOperation(`pet/adopt`)} className="card__btn" >Adopt</button>
                                <button onClick={() => petOperation(`pet/foster`)} className="card__btn" >Foster</button>
                            </>
                        }

                        <br />
                        {!isMine() && !isSaved() && <button onClick={() => petOperation(`user/saveForLater`)} className="card__btn" >Save for later</button>}
                        {isSaved() && <button onClick={() => petOperation(`user/unsaveForLater`)} className="card__btn" >Unsave</button>}
                        {isMine() &&
                            <>
                                <button onClick={() => petOperation(`pet/return`)} className="card__btn" >Return</button>
                            </>}
                    </>
                }

            </div>
            <p style={{ color: feedback.color }}>{feedback.content}</p>
        </div >
    )
}

export default PetDetails