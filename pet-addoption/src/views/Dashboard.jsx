import React from 'react'
import "./Dashboard.css"
import { useParams, useState, useEffect } from 'react'
import axios from 'axios'
import ProfileDetails from "../components/ProfileDetails";
import AddPet from "../components/AddPet";

import Modal from "../components/Modal";

import ViewUserPets from "../components/ViewUserPets";
import NavBar from '../components/NavBar';

function UsersTable() {

    const [data, setData] = useState([]);

    const [editOpen, setEditOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);

    const [editUserDetails, setEditUserDetails] = useState({});


    useEffect(() => {
        axios.get("http://localhost:8080/user/getAll", {
            headers: {
                "auth-token": localStorage.getItem("token"),
            },
        }).then(res => setData(res.data)
        )
    }, [])

    return (
        <>
            <div><table key="2">
                <tr>
                    <th>Name</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Pets</th>
                    <th>Saved Pets</th>
                    <th>ACTIONS</th>
                </tr>

                {data.map(i => <tr key={i._id}>
                    <td>{i.name}</td>
                    <td>{i.lastname}</td>
                    <td>{i.email}</td>
                    <td>{i.role}</td>
                    <td>{i.pets.length}</td>
                    <td>{i.savedPets.length}</td>
                    <td>
                        <button onClick={() => {
                            setViewOpen(z => !z)
                            setEditUserDetails(i)
                        }
                        }>
                            <i class="fa-solid fa-eye"></i>

                        </button>
                        {"  "}

                        <button onClick={() => {
                            setEditOpen(z => !z)
                            setEditUserDetails(i)
                        }
                        }>
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        {"  "}

                        <button onClick={() => {
                            
                            axios.delete("http://localhost:8080/user/delete/"+i._id, {
                                headers: {
                                    "auth-token": localStorage.getItem("token"),
                                },
                            }).then( _ => {
                                setData(data => data.filter(z => z._id != i._id))
                            })

                        }}  >
                            <i class="fa-solid fa-trash"></i>
                        </button>


                    </td>
                </tr>)}

                <Modal
                    isOpen={editOpen}
                    setIsOpen={setEditOpen}
                    Comp={ProfileDetails}
                    options={{ userData: editUserDetails }}
                />


                <Modal
                    isOpen={viewOpen}
                    setIsOpen={setViewOpen}
                    Comp={ViewUserPets}
                    options={{ userData: editUserDetails }}
                />
            </table></div >
        </>)
}



function PetsTable() {

    const [data, setData] = useState([]);

    const [editOpen, setEditOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);

    const [editPetDetials, setEditPetDetails] = useState({});


    useEffect(() => {
        axios.get("http://localhost:8080/pet/getAll", {
            headers: {
                "auth-token": localStorage.getItem("token"),
            },
        }).then(res => setData(res.data)
        )
    }, [])

    return (
        <>
            <div><table key="1">
                <tr>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Bio</th>
                    <th>Type</th>
                    <th>Breed</th>
                    <th>Age</th>
                    <th>Status</th>
                    <th>Height</th>
                    <th>Weight</th>
                    <th>Color</th>
                    <th>hypoallergenic</th>
                    <th>dietaryRestrictions</th>
                    <th>ACTIONS</th>

                </tr>

                {data.map(i => <tr key={i._id}>
                    <td>{i.name}</td>
                    <td><img src={"http://localhost:8080/" + i.image} alt="" /> </td>
                    <td>{i.bio}</td>
                    <td>{i.type}</td>

                    <td>{i.breed}</td>
                    <td>{i.age}</td>
                    <td>{i.status}</td>
                    <td>{i.height}</td>
                    <td>{i.weight}</td>
                    <td>{i.color}</td>
                    <td>{i.hypoallergenic ? "Yes" : "No"}</td>
                    <td>{i.dietaryRestrictions}</td>

                    <td>


                        <button onClick={() => {
                            setEditOpen(z => !z)
                            setEditPetDetails(i)
                        }
                        }>
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        {"  "}

                        <button onClick={() => {
                            
                            axios.delete("http://localhost:8080/pet/delete/"+i._id, {
                                headers: {
                                    "auth-token": localStorage.getItem("token"),
                                },
                            }).then( _ => {
                                setData(data => data.filter(z => z._id != i._id))
                            })

                        }}  >
                            <i class="fa-solid fa-trash"></i>
                        </button>


                    </td>
                </tr>)}

                <Modal
                    isOpen={editOpen}
                    setIsOpen={setEditOpen}
                    Comp={AddPet}
                    options={{ pet: {...editPetDetials,  __v: undefined, _id: undefined}, updateId: editPetDetials._id }}
                />


                <Modal
                    isOpen={viewOpen}
                    setIsOpen={setViewOpen}
                    Comp={ViewUserPets}
                    options={{ userData: {...editPetDetials} }}
                />
            </table></div >
        </>)
}


function Dashboard() {

    const [mode, setMode] = useState(0)

    return (
        <div className="">
            <NavBar />

            <div className='dashboard__container'>
                <div className="dasboard__sidebar">


                    <div className={"dashboard__sidebar__item " + (mode === 0 ? "selected" : "")} onClick={() => setMode(0)}>
                        <i className="fa-solid fa-users"></i>
                    </div>
                    <div className={"dashboard__sidebar__item " + (mode === 1 ? "selected" : "")} onClick={() => setMode(1)}>
                        <i class="fa-solid fa-hippo"></i>
                    </div>



                </div>

                <div className="dasboard__content">
                    <div className="dasboard__content__container">
                        <div className="">
                            {mode === 0 && <h3>Users</h3>}
                            {mode === 0 && <UsersTable></UsersTable>}


                            {mode === 1 && <h3>Pets</h3>}
                            {mode === 1 && <PetsTable></PetsTable>}
                        </div>


                    </div>
                </div>

            </div>
        </div>

    )
}

export default Dashboard;
