import React from "react";
import styled from "styled-components";
import banner from "../assets/banner4.jpg";

function Hero() {
    return (
        <Section id="home">
            <div className="background">
                <img src={banner} alt="banner" />
            </div>
            <div className="content">
                <div className="title">
                    <h1>Naruto</h1>
                    <p>
                        Naruto Uzumaki is a young ninja who seeks recognition 
                        from his peers and dreams of becoming the Hokage, the leader 
                        of his village. 
                        {/* Naruto is the fourth best-selling manga series in history having 
                        250 million copies in circulation worldwide in 47 countries and regions, 
                        with 153 million copies in Japan alone and remaining 97 million copies elsewhere. */}
                    </p>
                </div>
                <div className="info">
                    <div className="container">
                        <h3>Genre</h3>
                        <p>Adventure, Fantasy comedy, Martial Arts</p>
                    </div>
                    <div className="container">
                        <h3>Written by</h3>
                        <p>Masashi Kishimoto</p>
                    </div>
                    <div className="container">
                        <h3>Published by</h3>
                        <p>Shueisha</p>
                    </div>
                    <div className="container">
                        <h3>Original run</h3>
                        <p>Sept 21, 1999 - Nov 10, 2014</p>
                    </div>
                </div>
            </div>
        </Section>
    );
}

const Section = styled.section`
    position: relative;
    margin-top: 2rem;
    width: 100%;
    height: 100%;
    .background {
        height: 100%;
        img {
            width: 100%;
            filter: brightness(60%);
            border-radius: 20px
        }
    }
    .content {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        z-index: 3;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        .title {
            color: white;
            h1 {
                font-size: 3rem;
                letter-spacing: 0.2rem;
            }
            p {
                text-align: center;
                padding: 0 30vw;
                margin-top: 0.5rem;
                font-size: 1.2rem;
            }
        }
        .info {
            display: flex;
            background-color: #ffffffce;
            padding: 0.5rem;
            border-radius: 0.5rem;
            .container {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                padding: 0 1.5rem;
            }
        }
    }

    @media screen and (min-width: 280px) and (max-width: 980px) {
        height: 25rem;
        .background {
            img {
                height: 100%;
            }
        }
        .content {
            .title {
                h1 {
                    font-size: 1rem;
                }
                p {
                    font-size: 0.8rem;
                    padding: 1vw;
                }
            }
            .info {
                flex-direction: column;
                padding: 1rem;
                gap: 0.8rem;
                .container {
                    padding: 0 0.8rem;
                    input[type="data"] {
                        padding-left: 1rem;
                    }
                }
                button {
                    padding: 1rem;
                    font-size: 1rem;
                }
            }
        }
    }
`;

export default Hero;