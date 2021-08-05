
import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from 'react-router'

export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)

    const history = useHistory()

    useEffect(() => {
        getGames()
    }, [])

    return (
        <>
            <div className="game__new">
                <h1>Level-U-Up Games</h1>
                <button className="btn btn-2"
                    onClick={() => {
                        history.push("/games/new")
                    }}>Add New Game</button>
            </div>

            <article className="games">
                {
                    games.map(game => {

                        return <section key={`game--${game.id}`} className="game">
                            <div className="game__name">{game.name} by {game.maker}</div>

                            {/* <div className="game__game_type">{game.game_type} </div> */}

                            <div className="game__description">{game.description} </div>
                            
                            <div className="game__players">{game.number_of_players} players needed</div>

                            <div className="game__gamer">{game.gamer} Whose playing?</div>

                            <div className="game__maker">{game.maker}Who crated this game?</div>
                            
                        </section>
                    })
                }
            </article>
        </>
    )
}