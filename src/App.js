import logo from './logo.svg';
import './App.scss';
import Marquee from 'react-double-marquee';
import insta from './socials/instagram.svg';
import twitter from './socials/twitter.svg';

import instaWhite from './socials/instagram-white.svg';
import twitterWhite from './socials/twitter-white.svg';
import React, { useRef, useState, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useLoader, useThree, extend  } from 'react-three-fiber'
import * as THREE from "three";
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Controls, useControl } from "react-three-gui"
import {Box, Text} from 'drei';
import MB from './MB/model.gltf';
import RP from './RP/scene.glb';
import CD from './CD/model.gltf';
import WM from './WM/model.gltf';
import RI from './WM/model.gltf';
import PT from './PT/scene.glb';
import MARKET from './MARKET/scene.glb';
import Slice from './Slice/model.gltf'
import { PlayState, Tween } from 'react-gsap';
import {TweenMax, ScrollMagic, Linear, Power4, TimelineMax} from 'gsap';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import tix from "./ticket.png";
import Mabry from './Mabry/MabryProLight.otf';
import roalogo from './logo.png';
import roalogowhite from './whitelogo.png';
// or all tools are exported from the "all" file (excluding bonus plugins):
import { gsap} from "gsap/all";

 
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
// don't forget to register plugins
import {
 
  Switch,
  Route,
  Link
} from "react-router-dom";
import firebase from 'firebase/app';

import 'firebase/firestore';

import 'firebase/auth';

const config ={

   

        apiKey: "AIzaSyDO8Dpbk_u0g9xDBNS5awOkVnRIJo3cfNU",

        authDomain: "myappdb-84816.firebaseapp.com",

        databaseURL: "https://myappdb-84816.firebaseio.com",

        projectId: "myappdb-84816",

        storageBucket: "myappdb-84816.appspot.com",

        messagingSenderId: "1073086528194",

        appId: "1:1073086528194:web:acec10ed731237dada595b",

        measurementId: "G-KSEH07HR49"

     

};














function MyMesh(props) {
  
  const gltf = useLoader(GLTFLoader, props.src)
  const mesh = useRef()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [clicked, setClicked] = useState(false)



  
  useFrame(() => {
    if (props.hovered === props.name && props.active !== props.name) {mesh.current.rotation.y += 0.15}
    else {mesh.current.rotation.y += 0.01}

    if (props.active === props.name) {
     
    const animationScale = TweenMax.to(mesh.current.scale, 1, 
    { x: props.values.scaleUp[0],
      y: props.values.scaleUp[1],
      z: props.values.scaleUp[2],
      
    });

    const animationPos = TweenMax.to(mesh.current.position, 1, 
    { x: props.values.posUp[0],
      y: props.values.posUp[1],
      z: props.values.posUp[2],
      
    });
   
    
    }

    if (props.active === null) {
      
    const animationScale = TweenMax.to(mesh.current.scale, 1,

    { x: props.values.scaleDown[0],
      y: props.values.scaleDown[1],
      z: props.values.scaleDown[2],
       
    });

    const animationPos = TweenMax.to(mesh.current.position, 1, 
    { x: props.values.posDown[0],
      y: props.values.posDown[1],
      z: props.values.posDown[2],
      
    });
    
    }

    if (props.active !== props.name && props.active !== null) {
      
      const animationScale = TweenMax.to(mesh.current.scale, 1,
      { x: 0,
        y: 0,
        z: 0,
         
      });
  
      const animationPos = TweenMax.to(mesh.current.position, 1, 
      { x: props.values.posDown[0],
        y: props.values.posDown[1],
        z: props.values.posDown[2],
        
      });

    }
     
  })



  return (
    <primitive {...props}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      rotation={[0.7, 0, 0]}
      position={props.values.posDown}
      scale={props.values.scaleDown}
      ref={mesh} object={gltf.scene} />
)
}


const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls class.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls

  const {
    camera,
    gl: { domElement }
  } = useThree();

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame(state => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableZoom={false}
      maxAzimuthAngle={Math.PI / 4}
      maxPolarAngle={Math.PI}
      minAzimuthAngle={-Math.PI / 4}
      minPolarAngle={0}
    />
  );
};



function Ticker() {
	//const spacing = {' '}.repeat(10);
  const roa = `ROGUE ON ARRIVAL COMING 2021      `.repeat(10);

  return ( 
		 <div className="bg-split-pea"
      style={{
        width: '100%',
        whiteSpace: 'nowrap',
        fontFamily: "Syne",
        fontWeight: 800,
        borderTop: "1px solid black",

        
      }}
    >
      <Marquee direction={"left"} delay={0}>{roa}</Marquee>
    </div>)
}



function Section(props) {
  const duration = 2;
  const from = { opacity: 0, ease: Linear.ease };
  const to = { opacity: 1 };
  //var splitone = new SplitText($split[i], {type: 'chars, words'});
  //var tl = new TimelineMax();
  //tl.staggerFrom(splitone.chars, 0.5, {y: 80, opacity: 0, ease: Power4.easeOut}, 0.01);
  let active = props.active === props.name;
  return (
    <div id={props.name} className={"bg-white pt10 w5 df aic jcs br bc-black bw1 fc z1 " + (active ? "open" : "closed")}>
        <div className="x df jce mb25 ">
        <div className={"mr20 pb5 syne f56 wrap w25 df jcc aic ba bw1 bc-black bg-split-pea  " + (active ? "open-text-x" : "closed-text-x")} onClick={props.close}><span className="open-text-x-inner">X</span></div>
        </div>
        <div className={"pl20 pr20 pb30 syne f56 wrap " + (active ? "open-text-title" : "closed-text-title")}>{props.title}</div>
        <div className={"pl20 pr20 mabry f16 tl " + (active ? "open-text-desc" : "closed-text-desc")}>{props.desc}</div>
        <div className="bt bc-black bw1 h25"></div>
     </div>
    )
}

function MenuButton(props) {
  let titleState = ""
  if (props.active === props.id) titleState = "menu-title-active";
  if (props.active !== props.id && props.active !== null) titleState = "menu-title-inactive";
  if (props.active === null) titleState = "menu-title-neutral";
  return(
    <div id={props.id} className={"click-area tl " + (props.left ? "pl20" : "pr20")}
      onMouseEnter={(event) => props.onEnter(props.id)}
      onMouseLeave={(event) => props.onLeave()}
      onClick={(event) => props.onClick(props.id)}
      ><span className={"ba bc-black bw1 br10 p5 " + titleState}>{props.name}</span></div>

    )
}

function MenuButtonMobile(props) {
  let titleState = ""
  if (props.active === props.id) titleState = "menu-title-active";
  if (props.active !== props.id && props.active !== null) titleState = "menu-title-inactive";
  if (props.active === null) titleState = "menu-title-neutral";
  return(

    <Link to={"/" + props.name.toLowerCase()} id={props.id} className={"click-area tl " + (props.left ? "pl20" : "pr20")}>
    <span className={"ba bc-black bw1 br10 p5 " + titleState}>{props.name}</span>
    </Link>


    )
}


function Ticket(props) {
  const ticket = useRef()
  const text = useRef()
  let up = true;

  const { viewport } = useThree()
  const color = "#231F20" 
  const fontSize = 0.25

  const maxWidth =  90
  const lineHeight = 1
  const letterSpacing = 0
  const textAlign = "justify"

  


  useFrame(() => {
    if (ticket.current.rotation.y >= 0.2) up = false;
    if (ticket.current.rotation.y <= -0.2) up = true;
    ticket.current.rotation.y = (up ? ticket.current.rotation.y + 0.001 : ticket.current.rotation.y - 0.001);

    if (text.current.rotation.y >= 0.2) up = false;
    if (text.current.rotation.y <= -0.2) up = true;
    text.current.rotation.y = (up ? text.current.rotation.y + 0.001 : text.current.rotation.y - 0.001);
  
    if (props.submitted) {
    setTimeout(() => {
      
    
    const textScale = TweenMax.to(text.current.scale, 1, 
    { x: props.values.active[0],
      y: props.values.active[1],
      z: props.values.active[2],
      
    });

    const ticketScale = TweenMax.to(ticket.current.scale, 1, 
    { x: props.values.active[0],
      y: props.values.active[1],
      z: props.values.active[2],
      
    });
     }, 500)
    
    }
  })
  const ticketTexture = useMemo(() => new THREE.TextureLoader().load(tix), []);

  
  
  return (
    <React.Fragment>
    <Text
      ref={text}
      color={color}
      fontSize={fontSize}

      maxWidth={(viewport.width / 100) * maxWidth}
      lineHeight={lineHeight}
      letterSpacing={letterSpacing}
      textAlign={textAlign}
      font={Mabry}
      anchorX="center"
      anchorY="middle"
      position={[0.55,0,2.2]}
      scale={props.values.inactive}>
      {`1x Admission for ROA waitlist\n\n`}
      {`First name: ${props.firstName} \n`}
      {`Last name: ${props.lastName}\n`}
      {`Email: ${props.email}`}
    </Text>
    <ambientLight intensity={100}/>
    <pointLight intensity={100} position={[10, 10, 10]} />
    <mesh
      {...props}
      ref={ticket}
      position={[0,0,2]}
      scale={props.values.inactive}>
      <boxBufferGeometry args={[6, 3, 0.1]} />
      <meshBasicMaterial attach="material" transparent side={THREE.DoubleSide}>
        <primitive attach="map" object={ticketTexture} />
      </meshBasicMaterial>
    </mesh>

    
    
    </React.Fragment>
  )
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      submitted: false,
      yourein: false,
      alreadyregistered: false,
    };
    this.db = firebase.firestore();

     this.ticketValues = {active: [1.1,1.1,1.1], inactive: [1,1,1]}
    
  }
  handleFirstNameChange = (event) => {
    this.setState({firstName: event.target.value});
  }
  handleLastNameChange = (event) => {
    this.setState({lastName: event.target.value});
  }
  handleEmailChange = (event) => {
    this.setState({email: event.target.value});
  }

  writeData = () => {
        console.log('called')
        this.db.collection("waitlist").add({
            createdAt: new Date(),
            first: this.state.firstName,
            last: this.state.lastName,
            email: this.state.email
          })
          .then((docRef) => {
            console.log('right here')
            this.setState({submitted: true, alreadyregistered:false}, () => {setTimeout(() => {
              this.setState({yourein:true})
            }, 500)
            console.log('here')
          });
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
  }

  handleSubmit = (event) => {
    
    this.db.collection("waitlist").where("email", "==", this.state.email)
    .get()
    .then((querySnapshot) => {
        console.log(querySnapshot.empty)
        if (!querySnapshot.empty) {
          console.log('error thrown')
          throw "Email already exists"
        }
        else {
          console.log('new email')
          this.writeData()
        }
    })
    .catch((error) => {
      if (error = "Email already exists") this.setState({alreadyregistered:true})
    });

    
    mailchimp.post('/lists/id/members', {
  email_address : '...',
  status : 'subscribed'
  ...
})

    

    

    event.preventDefault();
    
    
    
  }
  render() {
  return(
    <React.Fragment>
    <Canvas className={(isMobile ? "ticket-canvas-mobile" : "ticket-canvas")}>
        

        <CameraControls />
          <Ticket firstName={this.state.firstName} 
          lastName={this.state.lastName} 
          email={this.state.email}
          values={this.ticketValues}
          submitted={this.state.submitted}/>
        </Canvas>
       

       <div className={"abs x df fc aic jcc " + (this.state.submitted ? "yourein-active " : "yourein-inactive ") + (isMobile ? "mt130 mb100" : "mt230 ")}>
       <div className="syne f32">You're in!</div>
       <div className={"mabry f16 " + (isMobile ? "ph20 pt20" : "ph50 ")}>Check your email for more information</div></div>
        

        <form className={"x f8 df fc jcc aic pb30 " + (this.state.submitted ? "form-inactive" : "form-active")} onSubmit={this.handleSubmit}>
        
        

        <label className={"df fc ais syne f16 " + (isMobile ? "w85":"w50")}>
          First Name{' '}
          <input className={"x " + (isMobile ? "form-element form-element-mobile": "form-element")} type="text" name="firstName" autoComplete="off" value={this.state.firstName} onChange={this.handleFirstNameChange}/>
        </label>
        <label className={"mt5 df fc ais syne f16 " + (isMobile ? "w85":"w50")}>
          Last Name{' '}
          <input className={"x " + (isMobile ? "form-element form-element-mobile": "form-element")} type="text" name="lastName" autoComplete="off" value={this.state.lastName} onChange={this.handleLastNameChange}/>
        </label>
       
        <label className={"mt5 df fc ais syne f16 " + (isMobile ? "w85 ":"w50 ") + (this.state.alreadyregistered ? "email-registered-label" : "")}>
          <div className="df aie">Email{' '} {this.state.alreadyregistered && <span className="f8 mabry pl5 pb5">(Email already regisered)</span>}</div>
          <input className={"x " + (isMobile ? "form-element form-element-mobile ": "form-element ") + (this.state.alreadyregistered ? "email-registered-input" : "")} type="email" name="email" autoComplete="off" value={this.state.email} onChange={this.handleEmailChange}/>
        </label>
        <input className={"mt15 submit-button"} type="submit" value="Sign up" />
      </form>

      
      </React.Fragment>

  )
}
}

class Modal extends React.Component  {
  
  constructor(props) {
    super(props);
    this.state = {
     open: false
    }
  };
  openModal = () => this.setState({open: true})
  closeModal = () => this.setState({open: false})
  render() {

  return(
    <React.Fragment>
    <div className={"fix top right mt10 mr10 bc-black bw1 ba br10 ph10 pv3 syne fw800 z10 about-button " + (isMobile ? "f16 pv5 ": "f32")}
    onClick={this.props.openModal}>?</div>
    <div className={(this.props.open ? "about-modal" : "about-modal-closed")}>
    <div className={(isMobile ? "about-modal-inner about-modal-inner-mobile" : "about-modal-inner")}>
    <span className={(isMobile ? "about-modal-x about-modal-x-mobile" : "about-modal-x")} onClick={this.props.closeModal}>X</span>
    <span className="tl mabry about-modal-content">{this.props.text}</span>
    </div>
    </div>
    </React.Fragment>
    );
}
}






class App extends React.Component {
  
  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    this.state = {
      active: null,
      hovered: null,
      copied: false,
      about: false,
      music: false,
      slices: false,
      market: true,
      interact: false
    }

   

    this.market = {scaleUp:[0.22, 0.22, 0.22],scaleDown:[0.15,0.15,0.15], posDown:[-2, -2, 0], posUp:[0,0.2,0]}
    
    this.pt = {scaleUp:[0.27,0.27,0.27],scaleDown:[0.17,0.17,0.17], posDown:[1.8, 0.4, 0], posUp:[0,-1.5,0]}
    
    this.cd = {scaleUp:[0.8,0.8,0.8],scaleDown:[0.4,0.4,0.4], posDown:[-2,2,0], posUp:[-0.5,0.5,0]}
    
    this.mb = {scaleUp:[1.6,1.6,1.6],scaleDown:[0.7,0.7,0.7], posDown:[2,-2,0], posUp:[0,2,0]}
    
  }

  handleChildClick = (current) => {
     this.setState({active:current})
  }
  clickManager = (current) => {
    if (this.state.active === current) this.setState({active:null})
    if (this.state.active !== null) this.setState({active:null})
    else this.setState({active:current})
  }

  openModalAbout = () => this.setState({about: true})
  closeModalAbout = () => this.setState({about: false}) 


  resetActive = () => this.setState({active:null});
  hoverSet = (current) => this.setState({hovered:current});
  hoverClear = () => this.setState({hovered:null});
  copyClicked = () => this.setState({copied: true});
  resetCopy = () => this.setState({copied: false});
  render() {
  return (
    <div className={"df fs bg-white c-black oh " + (isMobile ? "fc" : "vh100")}>

    

    
      <Modal open={this.state.about} openModal={this.openModalAbout} closeModal={this.closeModalAbout} text={"Rogue On Arrival is a platform that offers both artists and fans the ability to foster a unique and mutually beneficial relationship while also funding the initial growth stages of an artists career. Signup for the waitlist now to get updates and first access."}/>
      
      
      <div className={"pt20 df aic br bc-black bw1 fc " + (isMobile ? "x vh60" : "w40 jcb vh100")}>
      <div className="df fc f64 motter"><img src={roalogo}/>
      <div className="mabry f16 tc">(Click to learn more)</div>
      </div>

      
      
      <div className="df jcc h50 w95 mt40 ">
      
      {isBrowser && 
        <React.Fragment>
      {/* Canvas overlay for pointer interactions */}
      <div className={"df jca aic h25 abs z100 " + (isMobile ? "x" : "w35  ")}>
      <MenuButton id={"CD"} name={"Music"} left={true} active={this.state.active} onClick={this.clickManager} onEnter={this.hoverSet} onLeave={this.hoverClear}/>
      <MenuButton id={"PT"} name={"Slices"} left={false} active={this.state.active} onClick={this.clickManager} onEnter={this.hoverSet} onLeave={this.hoverClear}/>
      </div>
      
      <div className={"df jca aic h25 abs pt120 z100 " + (isMobile ? "x" : "w35  ")}>
      <MenuButton id={"MARKET"} name={"Market"} left={true} active={this.state.active} onClick={this.clickManager} onEnter={this.hoverSet} onLeave={this.hoverClear}/>
      <MenuButton id={"MB"} name={"Interact"} left={false} active={this.state.active} onClick={this.clickManager} onEnter={this.hoverSet} onLeave={this.hoverClear}/>
      </div>
      </React.Fragment>
      }


      {isMobile && 
      <React.Fragment>
      <div className={"df jca aic h25 abs z100 " + (isMobile ? "x" : "w35  ")}>

      <MenuButtonMobile id={"CD"} name={"Music"} left={true} active={this.state.active} onClick={this.clickManager} />
   
      
      <MenuButtonMobile id={"PT"} name={"Slices"} left={false} active={this.state.active} onClick={this.clickManager} />
      
      </div>
      
      <div className={"df jca aic h25 abs pt120 z100 " + (isMobile ? "x" : "w35  ")}>
 
      <MenuButtonMobile id={"MARKET"} name={"Market"} left={true} active={this.state.active} onClick={this.clickManager} />

      <MenuButtonMobile id={"MB"} name={"Interact"} left={false} active={this.state.active} onClick={this.clickManager} />

      </div>
      </React.Fragment>
      }



      {/* Three js canvas we pass result from our manager function */}
      <Canvas className={(isMobile ? "canvas-mobile" : "")}>
      <ambientLight intensity={1}/>
      <Suspense fallback={null}>{<MyMesh active={this.state.active} hovered={this.state.hovered} name={"MARKET"} src={MARKET} values={this.market} />}</Suspense>
      <Suspense fallback={null}>{<MyMesh active={this.state.active} hovered={this.state.hovered} name={"CD"} src={CD}  values={this.cd}/>}</Suspense>
      <Suspense fallback={null}>{<MyMesh active={this.state.active} hovered={this.state.hovered} name={"MB"} src={MB} values={this.mb}/>}</Suspense>
      <Suspense fallback={null}>{<MyMesh active={this.state.active} hovered={this.state.hovered} name={"PT"} src={PT}  values={this.pt}/>}</Suspense>
      </Canvas>
      <div className="f16 mabry abs pr110 pt45 pen"></div>
      <div className="f16 mabry abs pl110 pt45 pen"></div>
      </div>

     
      {isBrowser && 
      <div className="socials df jcc w95 pt40 pb40">
      <a className="social-link" href="https://www.instagram.com/rogueonarrival/"><img className="social w50" src={insta}/></a>
      <a className="social-link" href="https://www.twitter.com/rogueonarrival/"><img className="social w50" src={twitter}/></a>
      </div>
      }

      </div>

      {isBrowser && 
      <React.Fragment>
      <Section name={"CD"} active={this.state.active} hovered={this.state.hovered} close={this.resetActive} title={"Music"} desc={"ROA only invites talented musicians who truly enjoy engaging with their fans.  Artists on our platform understand that building a meaningful connection is both rewarding and essential to growing a career.  For new fans, this is a great way to discover your next favorite artist.  For current fans, there is an opportunity to have a deeper relationship with the artists you already like."}/>
      <Section name={"PT"} active={this.state.active} hovered={this.state.hovered} close={this.resetActive} title={"Slices"} desc={"Artists are assigned a fixed number of what we call “slices” that each hold a USD value. Fans can purchase these slices from the artist for their initial value. Once a fan purchases and owns an artist’s slice, it opens the door to exclusive and unique interactions with that artist.  ROA is also a bid/ask marketplace for these slices, if you buy into an artist early in their career and they become the next big thing, you can sell your slice in the marketplace for a higher price."}/>
      <Section name={"MARKET"} active={this.state.active} hovered={this.state.hovered} close={this.resetActive} title={"Market"} desc={"Slices can be bought or sold in a bid-ask marketplace setting. Fans who want to own a specific slice are able to place a bid order. Existing slice holders will be notified immediately if there is a bid order and can either sell or hold on to their respective slice. Fans who own a slice can place it for sale with an asking price. Once a holder lists their slice for their asking price, fans who want the slice are able to buy.  Buying into an artist early can present an opportunity to turn a profit."}/>
      <Section name={"MB"} active={this.state.active} hovered={this.state.hovered} close={this.resetActive} title={"Interact"} desc={"Slices grant fans access to participate in exclusive interactions with that specific artist.  Once a fan is a “sliceholder” they are able to engage in private Q&As and intimate videos, attain exclusive merch, submit a beat or graphic design to that artist and much more."}/>
      </React.Fragment>
      }

      
      

      <div className={"df aie jcb fc right fill-y "  + (isMobile ? "section-right-mobile" : "section-right ")}>
      

      <Form />


      

      <div className={"h25 x mabry f16 fw800 df fc jce bg-center c-white " + (isMobile ? "cloud-mobile": "cloud")}>
        <div className="bt bc-black bw1 h25 fg1 df jcc fc y pv10 ">
          <div className={"tc fw100 mabry f16 lh120 "  + (isMobile ? "pt30 ": "pt10 ")}>Contact</div>
          
          <div className={"lh120 email tc " + (isMobile ? "f16": "f16")}>
          <CopyToClipboard text={"contact@rogueonarrival.com"}
          onCopy={() => this.copyClicked()}>
          <span onMouseLeave={() => this.resetCopy()}
          className={this.state.copied ? "email-inner email-inner-clicked" : "email-inner"}>contact@rogueonarrival.com</span>
          </CopyToClipboard>
          
          
          </div>

          <div className="lh120 tc">©2020 – 2020 Rogue On Arrival</div>

      {isMobile && 
      <div className="socials df jcc w95 pt40 pb40">
      <a className="social-link" href="https://www.instagram.com/rogueonarrival/"><img className="social w50" src={instaWhite}/></a>
      <a className="social-link" href="https://twitter.com/rogueonarrival"><img className="social w50" src={twitterWhite}/></a>
      </div>
      }
        </div>
        <Ticker/>
      </div>

      
      </div>
     

    </div>
  );
}
}

export default App;
