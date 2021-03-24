import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

function App() {

  let [apiResponseName, setApiResponseName] = useState("");
  let [apiResponseImg, setApiResponseImg] = useState("");
  let [apiResponseSts, setApiResponseSts] = useState("");
  let [apiResponseNone, setApiResponseNone] = useState("");
  let [slotOne, setSlotOne] = useState("./img/g.png");
  let [slotTwo, setSlotTwo] = useState("./img/r.png");
  let [slotThree, setSlotThree] = useState("./img/r.png");
  let numSlot = ["./img/love.png", "./img/fire.png", "./img/boom.png"]
  let newCandidate;
  let [arrayCandidatesF, setarrayCandidatesF] = useState([]);
  let [printFire, setPrintFire] = useState("");
  let [printLove, setPrintLove] = useState("");
  let [notToPrint, setNotToPrint] = useState("");
  let arraySlot = [];
  let [arrayCandidatesL, setarrayCandidatesL] = useState([]); 
  let inputLove;
  let [post, setPost] = useState(0);
  let [nameChat, setNameChat] = useState(0);
  let [iconChat, setIconChat] = useState(0);

  function WelcomeWindow() {
    return (<div id="imgWindow"><div class="linkWindow"><Link id="linkaccess" to={`/play`}>I WANT TO PLAY</Link></div><img alt="window" src={"./img/1a.jpg"}></img></div>)
  }

  function CandidateCall() {
    return (<div><button class="searchButt" onClick={callApi}>{`BUSCAR`}</button></div>)
  }

  function ShowPulse() {
    return (<div id="showPulse"><div><div className="showPulse"><img width="70px" alt="candidate" src={"./img/pulse.png"}></img><p>{pulse}</p></div></div></div>)
  }

  function Candidate() {
    return (<div><div class="machineImg"><img height="240px" src={apiResponseImg}></img><p>{apiResponseName}</p><p>{apiResponseNone}</p></div></div>)
  }

  function MachineIcons() {
    return (<div><div id="machineIcons">
      <div class="icon"><img width="70px" alt="love" src={slotOne} /></div>
      <div class="icon"><img width="70px" alt="fire" src={slotTwo} /></div>
      <div class="icon"><img width="70px" alt="boom" src={slotThree} /></div></div></div>)
  }

  function Menu() {
    return (<header>
      <div id="headerName">
        <h1>MATCH IN</h1></div>
      <div id="headerName"><ul>
        <li class="ligth"><Link to={`/play`}>SPLOT</Link></li>
        <li><Link to={`/perfil`}>CHAT</Link></li>
      </ul>
      </div>
    </header>)
  }

  function SlotMachine() {
    return (<div><button class="playButt" onClick={printSlot}>{"JUGAR"}</button></div>);
  }

  function Chat() {
    return (
      <div id="chatAll" className="hid">
        <div className="chatHeaderCompo">
          <div class="chatPerson">
            <div><img width="45px" src={iconChat}></img></div>
            <p>{nameChat}</p>
          </div>
          <div><button onClick={xHiddeChat}>x</button></div>
        </div>
        <div className="chatBody">
          <div>

            <div className="conver"></div>
            <div class="chatInputs">
              <input class="inputChat" id="inputChat" type="text" value={inputLove} placeholder="Escribe algo si quieres"></input>
              <button onClick={sendMessLove}>ENVIAR</button>
            </div>
          </div>
        </div>
      </div>)
  }

  function Footer() {
    return (<footer><div></div></footer>)
  }  

  function popChat(e) {
    let chatClass = e.target.className;
    let chat = {
      nombre: chatClass
    }
    let fetchData = {
      method: "GET",
      query: JSON.stringify(chat),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }
    fetch("http://localhost:9000/getchat/", fetchData)
      .then(res => res.json())
      .then(data => {
        let i = 0;
        let exit = false
        while (exit == false) {
          if (chatClass == data[i].candidate.nombre) {
            exit = true
          }
          else { i++; }
        }
        setNameChat(data[i].candidate.nombre);
        setIconChat(data[i].icon);

      })
    document.querySelector('#chatAll').classList.remove("hid");
  }

  function xHiddeChat() {
    document.querySelector('#chatAll').classList.add('hid');
  }

  function sendMessLove() {
    let mess = document.querySelector("#inputChat").value;
    document.querySelector(".conver").innerHTML += `<div class="mess"><span>${mess}</span></div>`
    document.querySelector("#inputChat").value = " ";
    document.querySelector("#inputChat").placeholder = "Escribe algo si quieres";
  }

  function callApi() {
    fetch("http://localhost:9000/users/")
      .then(res => res.json())
      .then(data => {
        if (data.length !== 0) {
          newCandidate = data[randomizer(data)] //Me trae los datos del candidato.  
          setApiResponseNone("");
          setApiResponseName(newCandidate.nombre);
          setApiResponseImg(newCandidate.img);
          setApiResponseSts(newCandidate.status);
        }

        else {
          setApiResponseNone("Ya no hay candidatos")
        }
      })
  }

  function convertGrr() {
    setSlotOne("./img/g.png");
    setSlotTwo("./img/r.png");
    setSlotThree("./img/r.png");
  }

  function printSlot() {
    let bucleIcons = window.setInterval(function () {
      arraySlot = [];
      for (let i = 0; i < 3; i++) {
        arraySlot.push(numSlot[randomizer(numSlot)])
      }
      setSlotOne(arraySlot[0]);
      setSlotTwo(arraySlot[1]);
      setSlotThree(arraySlot[2]);

      if (arraySlot[0] === arraySlot[1] && arraySlot[0] === arraySlot[2] && arraySlot[1] === arraySlot[2]) {
        window.clearInterval(bucleIcons)

        if (arraySlot[0] === numSlot[0]) {
          setPulse(pulse + 10);
          setarrayCandidatesL(arrayCandidatesL.concat({ nombre: apiResponseName, img: apiResponseImg, status: apiResponseSts }))
          document.getElementById('loveConfirm').classList.remove('hidden');
        }

        else if (arraySlot[0] === numSlot[1]) {
          setPulse(pulse + 20);
          setarrayCandidatesF(arrayCandidatesF.concat({ nombre: apiResponseName, img: apiResponseImg, status: apiResponseSts }))
          document.getElementById('fireConfirm').classList.remove('hidden');
        }

        else if (arraySlot[2] === numSlot[2]) {
          setPulse(pulse - 300);
          document.getElementById('boomConfirm').classList.remove('hidden');
        }
      }
    }, 500);
  }
  pulseGoes();

  function pulseGoes() {
    if (pulse <= 0) {
      document.getElementById('boomExploit').classList.remove('hidden');
      counterTen()
    }
  }

  function counterTen() {
    let start = 0;
    let num = document.getElementById("number");
    let bucle = window.setInterval(function () {
      num.innerHTML = start;
      start = start + 1;
      if (start > 11) {
        window.clearInterval(bucle)
        hiddenCounterTen()
        setPulse(100)
      }
    }, 1000);
  }

  function hiddenCounterTen() {
    document.getElementById('boomExploit').classList.add('hidden');
  }

  function hiddenL() {
    document.getElementById('loveConfirm').classList.add('hidden');
    callApi();
    convertGrr();
  }

  function hiddenF() {
    document.getElementById('fireConfirm').classList.add('hidden');
    callApi();
    convertGrr();
  }

  function hiddenB() {
    document.getElementById('boomConfirm').classList.add('hidden');
    callApi();
    convertGrr();
  }

  function randomizer(array) {

    return Math.floor(Math.random() * (array.length))
  }

  useEffect(() => {
    if (arrayCandidatesL.length !== 0) {
      let nuevoLove = {
        candidate: arrayCandidatesL[arrayCandidatesL.length - 1],
        icon: "./img/love.png",
        hour: new Date().getHours(),
        min: new Date().getMinutes(),
        seg: new Date().getSeconds()
      }
      let fetchData = {
        method: "POST",
        body: JSON.stringify(nuevoLove),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }
      fetch("http://localhost:9000/postcandidates/", fetchData)
        .then(res => res.json())
        .then(data => { setPost(post + 1) })
    }
  }, [arrayCandidatesL])

  useEffect(() => {
    if (arrayCandidatesF.length !== 0) {
      let nuevoFire = {
        candidate: arrayCandidatesF[arrayCandidatesF.length - 1],
        icon: "./img/fire.png",
        hour: new Date().getHours(),
        min: new Date().getMinutes(),
        seg: new Date().getSeconds()
      }

      let fetchData = {
        method: "POST",
        body: JSON.stringify(nuevoFire),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }
      fetch("http://localhost:9000/postcandidates/", fetchData)
        .then(res => res.json())
        .then(data => { setPost(post + 1) })
    }
  }, [arrayCandidatesF])

  useEffect(() => {
    if (arrayCandidatesL.length !== 0) {
      let upDateLove = arrayCandidatesL[arrayCandidatesL.length - 1];
      let fetchData = {
        method: "PUT",
        body: JSON.stringify(upDateLove),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }
      fetch("http://localhost:9000/updatecandidate/", fetchData)
        .then(res => res.json())
    }
  }, [arrayCandidatesL]);

  useEffect(() => {
    if (arrayCandidatesF.length !== 0) {
      let upDateFire = arrayCandidatesF[arrayCandidatesF.length - 1];
      let fetchData = {
        method: "PUT",
        body: JSON.stringify(upDateFire),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }
      fetch("http://localhost:9000/updatecandidate/", fetchData)
        .then(res => res.json())
    }
  }, [arrayCandidatesF]);

  useEffect(() => {
    fetch("http://localhost:9000/printcandidates/")
      .then(res => res.json())
      .then(data => {
        let fireCandidates = data.filter(function (fire) {
          return fire.icon == "./img/fire.png"
        })
        let loveCandidates = data.filter(function (love) {
          return love.icon == "./img/love.png"
        })
        setPrintFire(fireCandidates.map((candi, key) => {
          return (
            <Candidato candi={candi} key={key} />
          )
        }))

        setPrintLove(loveCandidates.map((candi, key) => {
          return (
            <div class="matchFire" id={candi.candidate.nombre} key={key}>
              <div class="eachMatchFire">
                <img class="imgCandidate" width="80px" src={candi.candidate.img}></img>
                <div>
                  <div class="printIconNameTimeButt">
                    <div class="printIconNameTime">
                      <div><img width="50px" src={candi.icon}></img></div>
                      <div class="printNameTimeLove">
                        <p>{candi.candidate.nombre}</p>
                      </div>
                    </div>
                    <div class="forchatbutton">
                      <button className={candi.candidate.nombre} onClick={popChat}>CHAT</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }))
      });
  }, [post])

  function Candidato(props) {
    let [time, setTime] = useState({ hour: 0, min: 0, seg: 0 });

    function obtainHour(hour) {
      let hourNow = new Date().getHours();
      let bigHour = 0;

      if (hour > hourNow) {
        bigHour = hour - hourNow;
        return 24 - bigHour;

      }
      else if (hour < hourNow) {
        bigHour = hourNow - hour;
        return 24 - bigHour;
      }
      else if (hour == hourNow) {
        bigHour = 0;
        return 23;
      }
    }

    function obtainMin(min) {
      let minuteNow = new Date().getMinutes();
      let bigMin = 0;
      if (min > minuteNow) {
        bigMin = min - minuteNow;
        return 60 - bigMin;
      }
      else if (min < minuteNow) {
        bigMin = minuteNow - min;
        return 60 - bigMin;
      }
      else if (min == minuteNow) {
        bigMin = 0;
        return 59;
      }
    }

    function obtainSeg(seg) {
      let secondNow = new Date().getSeconds();
      let bigSeg = 0;
      if (seg > secondNow) {
        bigSeg = seg - secondNow;
        return 59 - bigSeg;
      }
      else if (seg < secondNow) {
        bigSeg = secondNow - seg;
        return 59 - bigSeg;
      }
      else if (seg == secondNow) {
        bigSeg = 0;
        return 59;
      }
    };

    function calcularTime(hour, min, seg) {
      setTime({
        hour: obtainHour(parseInt(hour)),
        min: obtainMin(parseInt(min)),
        seg: obtainSeg(parseInt(seg))
      });
    };

    useEffect(() => {
      calcularTime(props.candi.hour, props.candi.min, props.candi.seg);
    }, []);

    useEffect(() => {
      if (!(time.seg === 0 && time.min === 0 && time.hour === 0)) {

        window.setTimeout(function () {
          setTime({
            hour: time.hour,
            min: time.min,
            seg: time.seg - 1
          });
          if (time.seg == 0) {
            setTime({
              hour: time.hour,
              min: time.min - 1,
              seg: 59
            });
            if (time.min == 0) {
              setTime({
                hour: time.hour - 1,
                min: 59,
                seg: time.seg
              });
            }
          }
        }, 1000);
      }
      console.log(time);
    }, [time]);

    return (
      <div class="matchFire" id={props.candi.candidate.nombre}>
        <div class="eachMatchFire">

          <img class="imgCandidate" width="80px" src={props.candi.candidate.img}></img>
          <div>
            <div class="printIconNameTimeButt">
              <div class="printIconNameTime">
                <div><img width="50px" src={props.candi.icon}></img></div>
                <div class="printNameTime">
                  <p>{props.candi.candidate.nombre}</p>
                  <p>{time.hour + ":" + time.min + ":" + time.seg}</p>
                </div>
              </div>
              <div class="forchatbutton">
                <button className={props.candi.candidate.nombre} onClick={popChat}>CHAT</button></div>
            </div>
          </div>
        </div >
      </div >
    )
  }

  return (
    <BrowserRouter>
      <Route exact path="/">
        <WelcomeWindow />
      </Route>
      <Route exact path="/play">
        <div id="blackPlay">
          <div class="backPlay" >
            <Menu />
            <div id="allPlay">
              <div class="allPlay">
                <div id="pulseAndCandi">
                  <ShowPulse />
                  <Candidate />
                </div>
                <MachineIcons />
                <div id="buttMachine">
                  <CandidateCall />
                  <SlotMachine />
                </div>
                {<div>
                  {<div className="popBoom">
                    <div id="boomExploit" className="hidden">
                      <p>{"BOOOOM BOOOOM BOOOOM!"}</p><p>{"Respira, cuenta hasta 10 para recargar energías."}</p>
                      <div><h3 id="number"></h3></div>
                    </div>
                  </div>}
                  {<div className="pop">
                    {<div id="loveConfirm" className="hidden">
                      <p>{"¡ENHORABUENA!"}</p><p>{`Has desbloqueado el chat con ${apiResponseName}`}</p>
                      <div class="popButton"><button onClick={hiddenL} >CONTINUAR</button><Link to={`/perfil`}>CHATEAR</Link></div></div>}
                    {<div id="fireConfirm" className="hidden">
                      <p>{"¡FIUU FIUU! ¡Rápido!"}</p><p>{`Solo tienes 24 horas para conquistar a ${apiResponseName}`}</p>
                      <div class="popButton">
                        <button onClick={hiddenF} >CONTINUAR</button>{<Link to={`/perfil`}>CHATEAR</Link>}</div></div>}
                    {<div id="boomConfirm" className="hidden">
                      <p>{"BOOOOOM"}</p><p>{`Nos has conseguido match con ${apiResponseName}`}</p>
                      <div class="popButton">
                        <button onClick={hiddenB} >CONTINUAR</button></div></div>}
                  </div>}
                </div>}
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </Route>
      <Route exact path="/perfil">
        <div id="blackPlay">
          <div class="backPlay" >
            <Menu />
            <div id="allchat">
              <div class="allPlay">
                {<div id="matchFire">{printFire}</div>}
                {<div id="matchLove">{printLove}</div>}
                {<div>{notToPrint}</div>}
              </div>
              <Chat class="chat" />
            </div>
            <Footer />
          </div>
        </div>
      </Route>

    </BrowserRouter>
  )
}

export default App;