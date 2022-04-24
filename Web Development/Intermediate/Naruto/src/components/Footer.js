import React from "react";
import styled from "styled-components";
import { BsLinkedin, BsTwitter, BsGithub } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";

function Footer() {
    return (
        <FooterContainer>
            <span>Copyright &copy; 2022 Naruto. All rights reserved</span>
            <ul className="links">
                <li><a href="#home">Home</a></li>
                <li><a href="#clan">Clans</a></li>
                <li><a href="#village">Villages</a></li>
                <li><a href="#shinobi">Shinobi</a></li>
            </ul>
            <ul className="social_links">
                <li><a href="https://github.com/Bhushan-Thombre" target="_blank"><BsGithub /></a></li>
                <li><a href="https://twitter.com/bhushanat11" target="_blank"><BsTwitter /></a></li>
                <li><a href="https://www.linkedin.com/in/bhushan-thombre-209910207/" target="_blank"><BsLinkedin /></a></li>
                <li><a href="https://www.instagram.com/bhushanat11/" target="_blank"><AiFillInstagram /></a></li>
            </ul>
        </FooterContainer>
    );
}

const FooterContainer = styled.footer`
    display: flex;
    justify-content: space-evenly;
    background-color: #d0d8ff;
    padding: 2.5rem;
    border-radius: 0.5rem;
    ul {
        display: flex;
        list-style-type: none;
        gap: 2rem;
        li {
            a {
                text-decoration: none;
                color: black;
                transition: 0.3s ease-in-out;
                &:hover {
                    color: #302ce9;
                }
            }
            svg {
                font-size: 1.3rem;
                transition: 0.3s ease-in-out;
                &:hover {
                    color: #302ce9;
                }
            }
        }
    }

    @media screen and (min-width: 280px) and (max-width: 1024px) {
        flex-direction: column;
        gap: 2rem;
        ul {
            flex-direction: column;
        }
        .social_links {
            flex-direction: row;
        }
    }
`;

export default Footer;