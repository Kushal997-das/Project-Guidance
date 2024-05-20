import React from 'react';
import {Box,styled} from '@mui/material';
import {DataContext} from '../context/DataProvider';
import { useContext,useState,useEffect} from 'react';

const Container=styled(Box)`

      height:41vh;
`

const Result = () => {

  const [src,setSrc]=useState('');
  const{html,css,js}=useContext(DataContext);

  const srcCode=`
    <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
    </html>
  `
  useEffect(()=>{
      const timeout=setTimeout(()=>{
        setSrc(srcCode);
      },250)

      return ()=>clearTimeout(timeout);
  }, [html,css,js])

  return (
    <Container style={html || css || js ?null:{background:'url(https://st2.depositphotos.com/1033604/8268/i/950/depositphotos_82683750-stock-photo-autumn-scenery-with-a-magnificent.jpg)',backgroundSize:'cover'}}>
      <iframe
           srcDoc={src}
           title="Output"
           sandbox='allow-scripts'
           frameBorder={0}
           width="100%"
           height="100%"
      />
    </Container>
  )
}

export default Result;
