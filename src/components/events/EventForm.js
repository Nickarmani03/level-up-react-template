import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "../game/GameProvider.js"
import { EventContext } from "./EventProvider.js"
import { useHistory } from "react-router-dom"
import "../events/Event.css"


export const EventForm = () => {
    // Use the required context providers for data

    const { getEvents, createEvent } = useContext(EventContext)

    const { games, getGames } = useContext(GameContext)

    const history = useHistory()

    // Component stat
    const [currentEvent, setEvent] = useState({

        host: localStorage.getItem("lu_token"),
        game: "",
        date: "",
        time: "",
        description: "",
        title: "",
        attendees: []
    })

    // Get all existing games from API
    useEffect(() => {
        getGames()
    }, [])

    // Get all existing events from API
    useEffect(() => {
        getEvents()
    }, [])

    const changeEventState = (domEvent) => {
        const newEventState = { ...currentEvent }
        newEventState[domEvent.target.name] = domEvent.target.value
        setEvent(newEventState)
    }

    return (
        <form className="EventForm">
            <h2 className="EventForm__title">Schedule New Event</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentEvent.title}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="game" className="form-control"
                        value={currentEvent.game}
                        onChange={changeEventState}>
                        <option value="0">Select a game...</option>
                        {games.map((e => {
                            return <option key={e.id} value={e.id}>{e.name}</option>
                        }))}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={eve => {
                    // Prevent form from being submitted
                    eve.preventDefault()

                    const event = {
                        game: currentEvent.game,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        description: currentEvent.description,
                        title: currentEvent.title,
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-1"> Create Event </button>
        </form>
    )
}