import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider"
import { useHistory } from 'react-router'

export const GameForm = () => {
    // Use the required context providers for data

    const { createGame, getGameTypes, gameTypes } = useContext(GameContext)

    const history = useHistory()

    // Component state
    const [currentGame, setGame] = useState({

        name: "",
        gameTypeId: 0,
        description: "",
        numberOfPlayers: 0,
        gamer: localStorage.getItem("lu_token"),
        maker: ""

    })

    useEffect(() => {
        getGameTypes()
    }, [])

    const changeGameState = (event) => {
        const newGame = { ...currentGame }// Create copy
        newGame[event.target.name] = event.target.value// Modify copy
        setGame(newGame)// Set copy as new Game state
    }



    return (
        <form className="gameForm">
            <h2 className="gameForm__title"> New Game</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Title of the Game: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        placeholder="Name of the Game"
                        value={currentGame.name}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Type of Game: </label>
                    <select  type="select" name="gameTypeId" required autoFocus className="form-control" 
                    value={currentGame.gameTypeId} onChange={changeGameState}>
                        <option value="0">Select a Game Type</option>
                        {gameTypes.map((gameType => {
                                return <option key={gameType.id} value={gameType.id}>
                                    {gameType.label}
                                </option>
                            }))}
                        </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        placeholder="Describe the Game"
                        value={currentGame.description}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="text" name="numberOfPlayers" required autoFocus className="form-control"
                        placeholder="How Many Will Be Playing?"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Game Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        placeholder="Creator of the Game"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            
            <button type="submit"
                onClick={(evt) => {
                    // Prevents form from being submitted
                    evt.preventDefault()

                    createGame({//whats being passed to the back end
                        name: currentGame.name,
                        gameTypeId: parseInt(currentGame.gameTypeId),
                        description: currentGame.description,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        maker: currentGame.maker
                    })
                    // Send POST request to your API
                    
                    .then(() => history.push("/games"))
                }}
                className="btn btn-1"> Create Game </button>
        </form>
    )
}