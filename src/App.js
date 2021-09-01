import './App.css';
import './styles/Initialize.scss'
import './styles/Global.scss'
import './styles/custom/Custom.scss'
import React, {useEffect, useState} from 'react'
import {Provider} from 'react-redux'
import store from '../src/redux/Store'
import Routes from './routes/Routes'
import ReactGa from 'react-ga'
import {Button, Container, lightColors} from 'react-floating-action-button'

function App() {
  
  const [offset, setOffset] = useState(0);

  useEffect(()=>{
    if(process.env.NODE_ENV === 'production'){
      ReactGa.initialize('UA-197612742-1')
      ReactGa.pageview(window.location.pathname + window.location.search)
    }
    window.onscroll = () =>{
      setOffset(window.pageYOffset)
    }

  }, []);

  const toTop = () =>{
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0
  };

  return (
    <Provider store={store}>

      <Routes />

      {offset === 0?
        <div/>
        :
        <Container>
          <Button
            onClick={()=>toTop()}
            icon="fas fa-arrow-up"
            styles={{backgroundColor: "#282250",
                    color: lightColors.white,
                    width:"3em", height:"3em",
                    marginRight: "-1.7em",
                    marginBottom: "0.3em"}}
          />
        </Container>
      }
    </Provider>
  )
}

export default App;