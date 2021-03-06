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
    const createEvent = event => {
        return fetch("http://localhost:8000/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(event)
        })
            .then(getEvents)
    }

    const leaveEvent = eventId => {
        return fetch(`http://localhost:8000/events/${ eventId }/signup`, {
            method: "DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            }
        })
            // .then(response => response.json())
            .then(getEvents)
    }
    
    const joinEvent = eventId => {
        return fetch(`http://localhost:8000/events/${ eventId }/signup`, {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(getEvents)
    }

    return (
        <EventContext.Provider value={
            {
                events, getEvents, createEvent , joinEvent, leaveEvent
            }
        }>
            {props.children}
        </EventContext.Provider>
    )
}
