import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider"
import { useHistory, useParams } from 'react-router'

export const EditGameForm = () => {
    // Use the required context providers for data

    const {  getGameTypes, gameTypes, editGame, getGameById } = useContext(GameContext)

    const history = useHistory()

    const { gameId } = useParams();

    // Component state
    const [currentGame, setCurrentGame] = useState({

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

    useEffect(() => {
		if (gameId) {
			getGameById(gameId).then((game) => {
				setCurrentGame({
					id: parseInt(gameId),
					name: game.name,
					gameTypeId: game.game_type.id,
                    description: game.description,
                    numberOfPlayers: game.number_of_players,				
					maker: game.maker,
					
				})
			})
		}
	}, [gameId])


    const changeGameState = (event) => {
        const newGameState = { ...currentGame }// Create copy
        newGameState[event.target.name] = event.target.value// Modify copy
        setCurrentGame(newGameState)// Set copy as new Game state
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
                    <select type="select" name="gameTypeId" required autoFocus className="form-control"
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
            <button
					type="submit"
					onClick={(evt) => {
						// Prevent form from being submitted
						evt.preventDefault()
                        
						editGame({

                            id: currentGame.id,
							name: currentGame.name,
							gameTypeId: parseInt(currentGame.gameTypeId),
                            description: currentGame.description,
                            numberOfPlayers: parseInt(currentGame.numberOfPlayers),
							maker: currentGame.maker,
							
						}).then(() => history.push("/games"));
					}}
					className="btn btn-1"> Edit </button>
        </form>
    )
}

