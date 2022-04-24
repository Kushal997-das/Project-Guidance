import React from "react";
import styled from "styled-components";
import madara from "../assets/madara2.png";
import itachi from "../assets/itachi2.png";
import hashirama from "../assets/hashirama2.png";

function Shinobi() {
    return (
        <Section id="shinobi">
            <div className="title">
                <h2>Famous Quotes</h2>
            </div>
            <div className="quotes">
                <div className="quote">
                    <p>
                    Wake up to reality! Nothing ever goes as planned in this world. 
                    The longer you live, the more you realize that in this reality, only pain, suffering, and futility exist
                    </p>
                    <div className="info">
                        <img src={madara} alt="madara" />
                        <div className="details">
                            <h4>Madara Uchiha</h4>
                            <span>The Ghost Uchiha</span>
                        </div>
                    </div>
                </div>
                <div className="quote">
                    <p>
                    But one day… In the future… I dream of a time when all shinobi will cooperate with each other… A time when everyone's hearts will be together regardless of their countries. That's my… dream of the future..
                    </p>
                    <div className="info">
                        <img src={hashirama} alt="madara" />
                        <div className="details">
                            <h4>Hashirama Senju</h4>
                            <span>The God of Shinobi</span>
                        </div>
                    </div>
                </div>
                <div className="quote">
                    <p>
                    Knowledge and awareness are vague, and perhaps better called illusions. Everyone lives within their own subjective interpretation.
                    </p>
                    <div className="info">
                        <img src={itachi} alt="madara" />
                        <div className="details">
                            <h4>Itachi Uchiha</h4>
                            <span>Itachi of the Sharingan</span>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}

const Section = styled.section`
    margin: 5rem 0;
    .title {
        text-align: center;
        margin-bottom: 2rem;
    }
    .quotes {
        display: flex;
        justify-content: center;
        margin: 0 2rem;
        gap: 2rem;
        .quote {
            background-color: #ffe182;
            padding: 2rem;
            border-radius: 0.5rem;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            transition: 0.3s ease-in-out;
            &:hover {
                transform: translateX(0.4rem) translateY(-1rem);
                box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            }
            .info {
                display: flex;
                justify-content: center;
                gap: 1rem;
                align-items: center;
                margin-top: 1rem;
                .img {
                    height: 3rem;
                }
                .details {
                    span {
                        font-size: 0.9rem;
                    }
                }
            }
        }
    }

    @media screen and (min-width: 280px) and (max-width: 768px) {
        .quotes {
            flex-direction: column;
            margin: 0;
            .quote {
                justify-content: center;
                .info {
                    flex-direction: column;
                    justify-content: center;
                }
            }
        }
    }
`;

export default Shinobi;