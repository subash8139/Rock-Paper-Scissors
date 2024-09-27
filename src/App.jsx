import './App.css';
import { useEffect, useState } from 'react';
import rock from './Images/rock.jpg';
import scissor from './Images/scissor.jpg';
import paper from './Images/paper.jpg';

function App() {
  const [playersDetails, setPlayersDetails] = useState({
    playerOne: { name: "", scoreDetails: [] },
    playerTwo: { name: "", scoreDetails: [] }
  });
  const [isNameSaved, setIsNameSaved] = useState(false);
  const [playerOne, setPlayerOne] = useState();
  const [playerTwo, setPlayerTwo] = useState();
  const [leftPlayerRound, setLeftPlayerRound] = useState(1);
  const [rightPlayerRound, setRightPlayerRound] = useState(1);
  const [round, setRound] = useState(1);
  const [total, setTotal] = useState();


  const savePlayerScore = (round) => {
    let pOneScrorArr = playersDetails.playerOne.scoreDetails;
    let pTwoScrorArr = playersDetails.playerTwo.scoreDetails;

    let objOne = {
      round: round,
      score: leftPlayerWin()
    }

    let objTwo = {
      round: round,
      score: rightPlayerWin()
    }

    pOneScrorArr.push(objOne);
    pTwoScrorArr.push(objTwo);

    setPlayersDetails(prevState => ({
      ...prevState,
      playerOne: {
        ...prevState.playerOne,
        scoreDetails: pOneScrorArr
      },
      playerTwo: {
        ...prevState.playerTwo,
        scoreDetails: pTwoScrorArr
      }
    }))
  }

  useEffect(() => {
    if (playersDetails.playerTwo.scoreDetails.length === 6) {
      console.log("playersDetails.playerOne.scoreDetails", playersDetails.playerOne.scoreDetails);

      const pOneTotal = playersDetails.playerOne.scoreDetails.reduce((prev, current) => {
        console.log("prev", prev);
        console.log("current", current);


        return prev + current.score
      }, 0)
      console.log("pOneTotal", pOneTotal);
      const pTwoTotal = playersDetails.playerTwo.scoreDetails.reduce((prev, current) => prev + current.score, 0)
      setTotal({ playerOne: pOneTotal, playerTwo: pTwoTotal })
    }
  }, [playersDetails])

  useEffect(() => {
    if ((rightPlayerRound - 1) > 0) {
      savePlayerScore(rightPlayerRound - 1)
    }
  }, [rightPlayerRound])

  const leftPlayerWin = () => {
    if (playerOne === 1 && playerTwo === 3) {
      return 1;
    } else if (playerOne === 3 && playerTwo === 2) {
      return 1;
    } else if (playerOne === 2 && playerTwo === 1) {
      return 1;
    } else if (playerOne === playerTwo) {
      return 0;
    } else {
      return 0;
    }
  }

  const rightPlayerWin = () => {
    if (playerOne === 3 && playerTwo === 1) {
      return 1;
    } else if (playerOne === 2 && playerTwo === 3) {
      return 1;
    } else if (playerOne === 1 && playerTwo === 2) {
      return 1;
    } else if (playerOne === playerTwo) {
      return 0;
    } else {
      return 0;
    }
  }

  const generateRandom = () => {
    const random = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    return random;
  }

  const setImage = (player) => {
    if (player === 2) {
      return rock;
    } else if (player === 1) {
      return scissor
    } else {
      return paper;
    }
  }

  const leftPlayer = () => {
    if (allowClickLeft() && leftPlayerRound <= 6) {
      setLeftPlayerRound(leftPlayerRound + 1)
      setPlayerOne(generateRandom())
    }
  }

  const allowClickLeft = () => {
    if (rightPlayerRound === leftPlayerRound) {
      return true;
    } else {
      return false;
    }
  }

  const rightPlayer = () => {
    if (allowClickRight() && rightPlayerRound <= 6) {
      setRightPlayerRound(rightPlayerRound + 1);
      setPlayerTwo(generateRandom())
      if (round < 6) {
        setRound(round + 1);
      }
    }
  }

  const allowClickRight = () => {
    if (rightPlayerRound < leftPlayerRound) {
      return true;
    } else {
      return false;
    }
  }

  const reMatch = () => {
    setPlayersDetails(prevState => ({
      ...prevState,
      playerOne: {
        ...prevState.playerOne,
        scoreDetails: []
      },
      playerTwo: {
        ...prevState.playerTwo,
        scoreDetails: []
      }
    }))
    setPlayerOne(undefined)
    setPlayerTwo(undefined)
    setLeftPlayerRound(1)
    setRightPlayerRound(1);
    setRound(1);
    setTotal(undefined)
  }

  const exit = () => {
    setPlayersDetails({
      playerOne: { name: "", scoreDetails: [] },
      playerTwo: { name: "", scoreDetails: [] }
    })
    setPlayerOne(undefined)
    setPlayerTwo(undefined)
    setLeftPlayerRound(1)
    setRightPlayerRound(1);
    setRound(1);
    setTotal(undefined);
    setIsNameSaved(false);
  }

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div style={{ marginTop: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ fontSize: 25 }}>
            Stone Papper Scissors
          </div>
        </div>
        {isNameSaved === false ?
          <div>
            <div style={{ marginTop: "3rem", display: "flex", justifyContent: "center" }}>
              <div>
                <div> Player One </div>
                <input onChange={(e) =>
                  setPlayersDetails(prevState => ({
                    ...prevState,
                    playerOne: {
                      ...prevState.playerOne,
                      name: e.target.value,
                    }
                  }))} style={{ height: "26px", marginTop: 5 }} placeholder='Enter Player One Name' />
              </div>
            </div>
            <div style={{ marginTop: "0.8rem", display: "flex", justifyContent: "center" }}>
              <div>
                <div style={{ fontSize: "20" }}> Player Two </div>
                <input onChange={(e) =>
                  setPlayersDetails(prevState => ({
                    ...prevState,
                    playerTwo: {
                      ...prevState.playerTwo,
                      name: e.target.value,
                    }
                  }))} style={{ height: "26px", marginTop: 5 }} placeholder='Enter Player Two Name' />
              </div>
            </div>
            <div style={{ marginTop: "15px", display: "flex", justifyContent: "center" }}>
              <button onClick={() => { (playersDetails.playerOne.name && playersDetails.playerTwo.name) ? setIsNameSaved(true) : setIsNameSaved(false) }} style={{ height: "28px", padding: "0px 15px", cursor: "pointer" }}>
                Save
              </button>
            </div>
          </div>
          :
          <div style={{ background: "skyblue", padding: "10px 10rem 2rem 10rem", marginTop: "2.5rem" }}>
            <div style={{ display: "flex" }}>
              <div>
                {playersDetails.playerOne.name && <div style={{ fontSize: 20, display: "flex", justifyContent: "center" }}>
                  {`Player: ${playersDetails.playerOne.name}`}
                </div>}
                {playerOne ? <div style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
                  <img style={{ height: "12rem" }} src={setImage(playerOne)} />
                </div> :
                  <div style={{ height: "12rem", background: "white", width: "12rem", marginTop: "10px" }} ></div>
                }
                <div style={{ fontSize: 20, display: "flex", justifyContent: "center", marginTop: "15px" }}>
                  <button onClick={leftPlayer} style={{ height: 35, padding: "0px 20px", cursor: (allowClickLeft() && leftPlayerRound <= 6) ? "pointer" : "not-allowed", borderRadius: "7px" }}>
                    {`Play`}
                  </button>
                </div>
                <div style={{ display: "flex" }}>
                  {playersDetails.playerOne.scoreDetails.map((item) =>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", width: "3rem" }}>
                      <div>
                        <div>{`R ${item?.round}`}</div>
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "7px" }}>
                          {item?.score}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {total && <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", textDecoration: "underline" }}>
                  {`Total Score ${total.playerOne}`}
                </div>}
              </div>
              <div style={{ marginLeft: "10rem" }}>
                {playersDetails.playerTwo.name && <div style={{ fontSize: 20, display: "flex", justifyContent: "center" }}>
                  {`Player: ${playersDetails.playerTwo.name}`}
                </div>}
                {playerTwo ? <div style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
                  <img style={{ height: "12rem" }} src={setImage(playerTwo)} alt='no image' />
                </div>
                  :
                  <div style={{ height: "12rem", background: "white", width: "12rem", marginTop: "10px" }} ></div>
                }
                <div style={{ fontSize: 20, display: "flex", justifyContent: "center", marginTop: "15px" }}>
                  <button onClick={rightPlayer} style={{ height: 35, padding: "0px 20px", cursor: (allowClickRight() && rightPlayerRound <= 6) ? "pointer" : "not-allowed", borderRadius: "7px" }}>
                    {`Play`}
                  </button>
                </div>
                <div style={{ display: "flex" }}>
                  {playersDetails.playerTwo.scoreDetails.map((item) =>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", width: "3rem" }}>
                      <div>
                        <div>{`R ${item?.round}`}</div>
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "7px" }}>
                          {item?.score}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {total && <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", textDecoration: "underline" }}>
                  {`Total Score ${total.playerTwo}`}
                </div>}
                <div>
                </div>
              </div>
            </div>
            {total && <div>
              {total.playerOne > total.playerTwo ? < div style={{ display: "flex", justifyContent: "center", color: "green", fontSize: "20px", marginTop: "10px" }}  >
                {playersDetails.playerOne.name + " is a Winner"}
              </div> :
                total.playerOne < total.playerTwo ?
                  < div style={{ display: "flex", justifyContent: "center", color: "green", fontSize: "20px", marginTop: "10px" }} >
                    {playersDetails.playerTwo.name + " is a Winner"}
                  </div>
                  :
                  <div style={{ display: "flex", justifyContent: "center", color: "yellow", fontSize: "20px", marginTop: "10px" }}>Match Tie!</div>
              }

              <div style={{ display: "flex", justifyContent: "center", marginTop: "15px"}}>
                <button onClick={reMatch} style={{ height: 35, padding: "0px 20px", borderRadius: "7px",cursor: "pointer"  }}>
                  Re-Match
                </button>
                <button onClick={exit} style={{ height: 35, padding: "0px 20px", marginLeft: "20px", cursor: "pointer", borderRadius: "7px" }}>
                  Exit
                </button>
              </div>
            </div>}
          </div>
        }
      </div>
    </div >
  );
} export default App;