import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";

function Navbar() {

    const [navbarState, setNavbarState] = useState(false);

    return (
        <>
        <Nav>
            <div className="brand">
                <div className="container">
                    <img src={logo} alt="logo" />
                </div>
                <div className="toggle">
                    {
                        navbarState ? (<VscChromeClose onClick={() => setNavbarState(false)} />) 
                        : (<GiHamburgerMenu onClick={() => setNavbarState(true)} />)
                    }
                </div>
            </div>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#clan">Clans</a></li>
                <li><a href="#village">Villages</a></li>
                <li><a href="#shinobi">Shinobi</a></li>
            </ul>
            <button><a href="https://www.linkedin.com/in/bhushan-thombre-209910207/" target="_blank">Connect</a></button>
        </Nav>
        <ResponsiveNav state={navbarState}>
        <ul>
                <li><a href="#home" onClick={() => setNavbarState(false)}>Home</a></li>
                <li><a href="#clan" onClick={() => setNavbarState(false)}>Clans</a></li>
                <li><a href="#village" onClick={() => setNavbarState(false)}>Villages</a></li>
                <li><a href="#shinobi" onClick={() => setNavbarState(false)}>Shinobi</a></li>
            </ul>
        </ResponsiveNav>
        </>
    );
}

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    .brand {
        .container {
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .toggle {
            display: none;
        }
    }
    ul {
        display: flex;
        list-style-type: none;
        gap: 1rem;
        li {
            a {
                text-decoration: none;
                color: #f2a30b;
                font-size: 1.2rem;
                transition: 0.1s ease-in-out;
                &:hover {
                    color: #fbe407;
                }
            }
            &:first-of-type {
                a {
                    color: #ea9828;
                    font-weight: 900;
                }
            }
        }
    }
    button {
        padding: 0.5rem 1rem;
        cursor: pointer;
        border-radius: 1rem;
        border: none;
        background-color: #f2a30b;
        text-transform: uppercase;
        font-size: 1.1rem;
        letter-spacing: 0.1rem;
        transition: 0.3s ease-in-out;
        &:hover {
             background-color: #ea9828;
        }
        a {
            text-decoration: none;
            color: white;
        }
    }

    /* @media screen and (min-width: 426px) and (max-width: 1080px) { */
        @media (max-width: 550px) {
        .brand {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            .toggle {
                display: flex;
            }
        }
        ul, button {
            display: none;
        }
    }
`;

const ResponsiveNav = styled.div`
    display: flex;
    position: absolute;
    z-index: 5;
    background-color: white;
    width: 100%;
    height: 30vh;
    align-items: center;
    transition: 0.3s ease-in-out;
    top: ${({state}) => (state ? "80px" : "-400px")};
    ul {
        list-style-type: none;
        width: 100%;
        li {
            width: 100%;
            margin: 1rem 0;
            margin-left: 2rem;
            a {
                text-decoration: none;
                color: #f9ef11;
                font-size: 1.2rem;
                transition: 0.1s ease-in-out;
                &:hover {
                    color: #f2a30b;
                }
            }
            &:first-of-type {
                a {
                    color: #f2a30b;
                    font-weight: 900;
                }
            }
        }
    }
`;

export default Navbar;