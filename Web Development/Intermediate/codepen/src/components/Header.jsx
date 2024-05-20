import React from 'react'
import { AppBar, Toolbar, styled } from '@mui/material';
import { alignProperty } from '@mui/material/styles/cssUtils';



const Container = styled(AppBar)`
    background: #060606;
    position:static;
    height: 9vh; 
    border-bottom:1px solid #2f2f2f;
    
`

// const ArpcoderLink = styled()`
//     color: white;
// `
// const demo=styled(div)
// `
//   justifyContent: 'right',
//   textAlign:'right'
// `


const Header = () => {
  return (
    <Container>
      <Toolbar>

        <img src={'https://cdn.dribbble.com/users/299/screenshots/5648722/codepen-logo-gifc2.gif'}
          alt="logo" style={{ width: 80 }} />


        <img src={'https://res.cloudinary.com/css-tricks/images/f_auto,q_auto/v1642454945/codepen-wordmark-display-inside-white@10x_163987fcdd/codepen-wordmark-display-inside-white@10x_163987fcdd.png?_i=AA'}
          alt="logo" style={{ width: 80 }} />

        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <a className="nav-link" href="https://github.com/Arpcoder">Build by Arpcoder <span class="sr-only">(current)</span></a>
          </li>
        </ul>

        {/* <demo>Build by Arpcoder</demo> */}
      </Toolbar>
    </Container>
  )
}

export default Header;
