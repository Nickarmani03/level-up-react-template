import React, { useState, createContext } from 'react'

export const EventContext = createContext()

export const EventProvider = (props) => {
    const [events, setEvents] = useState([])

    const getEvents = () => {
        return fetch("http://localhost:8000/events", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(res => res.json())
            .then(setEvents)
    }
    const addEvent = event => {
        return fetch("http://localhost:8000/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event)
        })
            .then(getEvents)
    }

    return (
        <EventContext.Provider value={
            {
                events, getEvents, addEvent
            }
        }>
            {props.children}
        </EventContext.Provider>
    )
}
