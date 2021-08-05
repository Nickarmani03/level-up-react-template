import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider"
import { useHistory } from 'react-router'



export const GameForm = (props) => {
    // Use the required context providers for data

    const { addGame, getGameTypes, gameTypes } = useContext(GameContext)

    const history = useHistory()

    // Component state
    const [game, setGame] = useState({

        name: "",
        gameTypeId: 0,
        description: "",
        numberOfPlayers: 0,
        maker: ""

    })

    useEffect(() => {
        getGameTypes()
    }, [])

    const handleControlledInputChange = (event) => {
        const newGame = { ...game }// Create copy
        newGame[event.target.name] = event.target.value// Modify copy
        setGame(newGame)// Set copy as new state
    }

    const constructNewGame = (event) => {
        // Prevent form from being submitted
        event.preventDefault()

        const game = {
            name: game.name,
            gameTypeId: parseInt(game.gameTypeId),
            description: game.description,
            numberOfPlayers: parseInt(game.numberOfPlayers),
            gamer: parseInt(localStorage.getItem("lu_token")),
            maker: game.maker
        }
        // Send POST request to your API
        addGame(game)
            .then(() => history.push("/games"))
    }


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Title of the Game: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={game.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Type of Game: </label>
                    <select name="gameTypeId" required autoFocus className="form-control" value={game.gameTypeId} onChange={handleControlledInputChange}>
                        <option value="0">Select a Game Type</option>
                        {gameTypes.map((gameType) => (
                            <option key={gameType.id} value={gameType.id}>
                                {gameType.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required className="form-control"
                        placeholder="game description"
                        defaultValue={game.description}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="text" name="numberOfPlayers" required autoFocus className="form-control"
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Gamer: </label>
                    <select name="gamer" required autoFocus className="form-control" value={game.gamer} onChange={handleControlledInputChange}>
                        <option value="0">How will be playing?</option>
                        {game.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset> */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Game Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={game.maker}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={constructNewGame}
                className="btn btn-primary">Create</button>
        </form>
    )
}