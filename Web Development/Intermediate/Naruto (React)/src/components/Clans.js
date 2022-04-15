import React from "react";
import styled from "styled-components";
import hyuga from "../assets/hyuga.png";
import uzumaki from "../assets/uzumaki.png";
import senju from "../assets/senju.png";
import uchiha from "../assets/uchiha.png";


function Clan() {
    const data = [
        {
            icon: hyuga,
            title: "The Hyuga Clan",
            subTitle: "The Hyūga Clan is one of the four noble clans of Konohagakure. All members born into this clan possess the Byakugan, a kekkei genkai."
        },
        {
            icon: uzumaki,
            title: "The Uzumaki Clan",
            subTitle: "The Uzumaki Clan was formerly a prominent clan in Uzushiogakure. Its members are renown for having bright, red hair and possessing incredibly strong life-forces and chakra."
        },
        {
            icon: senju,
            title: "The Senju Clan",
            subTitle: "The Senju Clan was a group of shinobi that were the strongest, feared and most respected clan above all other clans in the ninja world."
        },
        {
            icon: uchiha,
            title: "The Uchiha Clan",
            subTitle: "The Uchiha Clan is one of the four noble clans of Konohagakure, reputed to be the village's strongest because of their Sharingan and natural battle prowess."
        }
    ];
    return (
        <Section id="clan">
        {
            data.map((clan) => {
                return (
                    <div className="clan">
                        <div className="icon">
                            <img src={clan.icon} alt="icon" />
                        </div>
                        <h3>{clan.title}</h3>
                        <p>{clan.subTitle}</p>
                    </div>
                )
            })
        }
        </Section>
    );
}

const Section = styled.section`
    padding: 5rem 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    .clan {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 2rem;
        background-color: #fbe407;
        border-radius: 20px;
        box-shadow: rgb(255, 225, 130) 0px 7px 29px 0px;
        transition: 0.3s ease-in-out;
        &:hover {
            transform: translateX(0.4rem) translateY(-1rem);
            box-shadow: rgb(0, 0, 0, 0.35) 0px 5px 15px;
        }
        .icon {
            img {
                height: 2.4rem;
            }
        }
    }

    @media screen and (min-width: 280px) and (max-width: 720px) {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

export default Clan;