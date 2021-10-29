import React from 'react'
import ax1 from '../img/galaxy/ax1.png'
import ig3k from '../img/galaxy/ig3k.png'
import unodq12 from '../img/galaxy/1dq12.png'
import Carousel from 'react-bootstrap/Carousel'
import gem from '../img/gems.svg'
function Expeditions() {
    return (
        <>
            <div className="container-fluid">
                <Carousel className="carousel">
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={unodq12}
                            alt="First slide"
                        />
                        <Carousel.Caption className="txt-slide">
                            <h2>1DQ1</h2>
                            <button className="btn btn-success my-3">
                            Travel - 20 <img className="img-small" src={gem} /> 
                            </button>
                        </Carousel.Caption>
                    </Carousel.Item>

                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={ax1}
                            alt="Second slide"
                        />

                        <Carousel.Caption className="txt-slide">
                            <h2>AX1</h2>
                            <button className="btn btn-success my-3"> Travel </button>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={ig3k}
                            alt="Third slide"
                        />

                        <Carousel.Caption className="txt-slide">
                            <h2>IG3K</h2>
                            <button className="btn btn-success my-3 d-inline-block"> Travel </button>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>


            </div>
        </>
    )
}

export default Expeditions