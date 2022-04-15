import React from "react";
import styled from "styled-components";
import leaf from "../assets/konohagakure.jpg";
import earth from "../assets/iwagakure.png";
import water from "../assets/kirigakure.png";
import wind from "../assets/sunagakure.png";
import lightning from "../assets/kumogakure.jpg";
import sound from "../assets/otogakure.png";

function Village() {
    const data = [
        {
            image: leaf,
            title: "Land of Fire",
            subTitle: "As the village of one of the Five Great Shinobi Countries, Konohagakure has a Kage as its leader known as the Hokage, of which there have been seven in its history.",
            head: "Current Hokage",
            name: "Naruto Uzumaki"
        },
        {
            image: earth,
            title: "Land of Earth",
            subTitle: "As the village of one of the Five Great Shinobi Countries, Iwagakure has a Kage as its leader known as the Tsuchikage, of which there have been four in its history.",
            head: "Current Tsuchikage",
            name: "Kurotsuchi"
        },
        {
            image: water,
            title: "Land of Water",
            subTitle: "As the village of one of the Five Great Shinobi Countries, Kiri has a Kage as its leader known as the Mizukage, of which there have been six in its history.",
            head: "Current Mizukage",
            name: "Chojuro"
        },
        {
            image: wind,
            title: "Land of Wind",
            subTitle: " As the village of one of the Five Great Shinobi Countries, Sunagakure has a Kage as its leader known as the Kazekage, of which there have been five in its history.",
            head: "Current Kazekage",
            name: "Gaara"
        },
        {
            image: lightning,
            title: "Land of Lightning",
            subTitle: "As the village of one of the Five Great Shinobi Countries, Kumogakure has a Kage as its leader known as the Raikage, of which there have been five in its history.",
            head: "Current Raikage",
            name: "Darui"
        },
        {
            image: sound,
            title: "Land of Sound",
            subTitle: "Village Hidden by Sound) is the personal hidden village of Orochimaru, which was founded for the express purpose of collecting ninja for his experiments and his quest to learn all techniques.",
            head: "Founder",
            name: "Orochimaru"
        }
    ];


    return (
        <Section id="village">
            <div className="title">
                <h2>The Great Nations</h2>
            </div>
            <div className="destinations">
                {data.map((destination) => {
                    return (
                        <div className="destination">
                            <img src={destination.image} alt="Villages" />
                            <h3>
                                {destination.title}
                            </h3>
                            <p>
                                {destination.subTitle}
                            </p>
                            <div className="info">
                                <h5>{destination.head}</h5>
                                <div>{destination.name}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Section>
    );
}



const Section = styled.section`
    padding: 2rem 0;
    .title {
        text-align: center;
        margin: 2rem 0;
    }
    .destinations {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 3rem;
        padding: 0 3rem;
        .destination {
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem; 
            background-color: #ffa500;
            border-radius: 1rem;
            transition: 0.3s ease-in-out;
            &:hover {
                transform: translateX(0.4rem) translateY(-1rem);
                box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            }
            img {
                width: 100%;
                filter: brightness(50%)
            }
            .info {
                /* display: flex;
                align-items: center; */
                .services {
                    display: flex;
                    gap: 0.3rem;
                    img {
                        width: 2rem;
                        border-radius: 1rem;
                        padding: 0.2rem 0.4rem;
                    }
                }
                /* display: flex;
                justify-content: space-between; */
            }
            
        }
    }

    @media screen and (min-width: 280px) and (max-width: 768px) {
        .destinations {
            grid-template-columns: 1fr;
            padding: 0;
        }
    }
`;

export default Village;