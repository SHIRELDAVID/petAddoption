import React from 'react'
import "./Dashboard.css"
import { useParams, useState, useEffect, useRef } from 'react'
import axios from 'axios'
import ProfileDetails from "../components/ProfileDetails";
import AddPet from "../components/AddPet";

import Modal from "../components/Modal";

import ViewUserPets from "../components/ViewUserPets";
import NavBar from '../components/NavBar';
// import * as window.d3 from "window.d3"
// const window.d3 = require('window.d3');


import { socket } from "../socket"

let lastRecvOnline;

function UsersTable() {

    const [data, setData] = useState([]);

    const [editOpen, setEditOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);

    const [editUserDetails, setEditUserDetails] = useState({});
    const ref = useRef()

    let [onlineData, setOnlineData] = useState([]);
    const [onlineUsersCount, setOnlineUsersCount] = useState();
    const [subscribed, setSubscribed] = useState(false);


    useEffect(() => {

        document.getElementById("my_dataviz").innerHTML = ""

        let data1 = onlineData.map((z) => ({
            date: z.date.toISOString(),
            wage: z.value
        }))
        var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 40
        }

        var div = window.d3.select(ref.current).append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        //making graph responsive
        let default_width = 600 - margin.left - margin.right;
        let default_height = 300 - margin.top - margin.bottom;
        let default_ratio = default_width / default_height;



        // format the data
        data1.forEach(function (d) {
            let parseDate = window.d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");
            d.date = parseDate(d.date);
            d.wage = +d.wage;
        });
        //sort the data by date so the trend line makes sense
        data1.sort(function (a, b) {
            return a.date - b.date;
        });

        // set the ranges
        var x = window.d3.scaleTime().range([0, default_width]);
        var y = window.d3.scaleLinear().range([default_height, 0]);

        // Scale the range of the data
        x.domain(window.d3.extent(data1, function (d) {
            return d.date;
        }));
        y.domain([0, window.d3.max(data1, function (d) {
            return d.wage;
        })]);

        // define the line
        var valueline = window.d3.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.wage);
            });

        // append the svg object to the body of the page
        var svg = window.d3.select(ref.current).append("svg")
            .attr("width", default_width + margin.left + margin.right)
            .attr("height", default_height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // Add the trendline
        svg.append("path")
            .data([data1])
            .attr("class", "line")
            .attr("d", valueline)
            .attr("stroke", "#32CD32")
            .attr("stroke-width", 2)
            .attr("fill", "#FFFFFF");

        // Add the data points
        var path = svg.selectAll("dot")
            .data(data1)
            .enter().append("circle")
            .attr("r", 2)
            .attr("cx", function (d) {
                return x(d.date);
            })
            .attr("cy", function (d) {
                return y(d.wage);
            })
            .attr("stroke", "#32CD32")
            .attr("stroke-width", 1.5)
            .attr("fill", "#FFFFFF")
            .on('mouseover', function (d, i) {
                window.d3.select(this).transition()
                    .duration('100')
                    .attr("r", 7);
                div.transition()
                    .duration(100)
                    .style("opacity", 1);
                div.html("online users " + window.d3.format(".0f")(d.wage))
                    .style("left", (window.d3.event.pageX + 10) + "px")
                    .style("top", (window.d3.event.pageY - 15) + "px");
            })
            .on('mouseout', function (d, i) {
                window.d3.select(this).transition()
                    .duration('200')
                    .attr("r", 5);
                div.transition()
                    .duration('200')
                    .style("opacity", 0);
            });

        // Add the axis
        if (default_width < 500) {
            svg.append("g")
                .attr("transform", "translate(0," + default_height + ")")
                .call(window.d3.axisBottom(x).ticks(5).tickFormat(window.d3.timeFormat("%H:%M:%S")))
        } else {
            svg.append("g")
                .attr("transform", "translate(0," + default_height + ")")
                .call(window.d3.axisBottom(x).ticks(5).tickFormat(window.d3.timeFormat("%H:%M:%S")))
        }

        svg.append("g")
            .call(window.d3.axisLeft(y).tickFormat(function (d) {
                return " " + window.d3.format(".1f")(d)
            }));

    }, [onlineData])

    useEffect(() => {
        if (subscribed) return
        setSubscribed(true)
        setTimeout(() => {
            socket.emit("requestOnlineUsers")

        }, 1000);
        socket.on("onlineUserIds", (data_) => {
            if (!data_.length) return
            setOnlineUsersCount(data_.length)

            if (!lastRecvOnline || Date.now() - lastRecvOnline > 10_000) {
                lastRecvOnline = Date.now()

                setOnlineData((v) => [...v, { date: new Date(), value: data_.length }])

            }
        })

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
                    <td>{i.pets?.length}</td>
                    <td>{i.savedPets?.length}</td>
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

                            axios.delete("http://localhost:8080/user/delete/" + i._id, {
                                headers: {
                                    "auth-token": localStorage.getItem("token"),
                                },
                            }).then(_ => {
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
            <h3>Real Time Data</h3>
            <h4>Online Users Now: {onlineUsersCount}</h4>
            <div ref={ref} style={{ background: "white" }} id="my_dataviz"></div>
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

                            axios.delete("http://localhost:8080/pet/delete/" + i._id, {
                                headers: {
                                    "auth-token": localStorage.getItem("token"),
                                },
                            }).then(_ => {
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
                    options={{ pet: { ...editPetDetials, __v: undefined, _id: undefined }, updateId: editPetDetials._id }}
                />


                <Modal
                    isOpen={viewOpen}
                    setIsOpen={setViewOpen}
                    Comp={ViewUserPets}
                    options={{ userData: { ...editPetDetials } }}
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
