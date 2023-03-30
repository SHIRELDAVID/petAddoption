import React, { useEffect, useState } from "react";
import "./Login.css";
import axios from "axios";

import "./StuffCarousel.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

function StuffCarousel() {
    const [data, setData] = useState([])

    useEffect(() => {

        axios.get("http://localhost:8080/stuff").then(r => {
            setData(r.data)
        })

    }, [])

    return <Carousel
        // swipeable={true}
        // draggable={true}
        showDots={false}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}

    >
        {data.map(d => {
            return <div className="carousel__card">
                <img src={d.image}></img>
                <h3>{d.name}</h3>
                <h5>{d.role}</h5>

            </div>
        })}
    </Carousel>;
}

export default StuffCarousel;