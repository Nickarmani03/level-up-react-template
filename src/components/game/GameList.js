import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from 'react-router'

export const GameList = () => {

    const { games, getGames } = useContext(GameContext)
    const history = useHistory()


    useEffect(() => {
        getGames()
    }, [])

    return (
        <>
            <header className="game__new">
                <h1>Level-U-Up Games</h1>

            </header>

            <article className="games">
                {
                    games.map(game => {

                        return <section key={`game--${game.id}`} className="game">

                            <div className="game__name">Game:  {game.name} by {game.maker}</div>

                            <div className="game__game_type">{game.game_type_id} </div>

                            <div className="game__description">{game.description} </div>

                            <div className="game__players">Number of players needed:   {game.number_of_players} </div>

                            <div className="game__gamer">Whose playing? {game.gamer} </div>

                            <div className="game__maker">Who crated this game?:   {game.maker}</div>

                            <div className="game__edit">
                                <button className="btn btn-3"
                                    onClick={() => {
                                        history.push(`/games/${game.id}/edit`)
                                    }}>Edit</button>
                            </div>

                        </section>
                    })
                }
                <button className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                        history.push({ pathname: "/games/new" })
                    }}>Add New Game</button>
            </article>
        </>
    )
}