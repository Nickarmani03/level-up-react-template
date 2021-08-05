import React, { useContext, useState, useEffect } from "react"
import { EventContext } from "../events/EventProvider.js"



export const EventForm = (props) => {
    // Use the required context providers for data
    
    const {  events, addEvent, updateEvent, getEvents } = useContext(EventContext)

    // Component state
    const [event, setEvent] = useState({})

    // Is there a a URL parameter??
    const editMode = props.match.params.hasOwnProperty("event_id")  // true or false

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newEvent = Object.assign({}, event)          // Create copy
        newEvent[event.target.name] = event.target.value    // Modify copy
        setEvent(newEvent)                                 // Set copy as new state
    }

    /*
        If there is a URL parameter, then the user has chosen to
        edit an event.
            1. Get the value of the URL parameter.
            2. Use that `id` to find the event.
            3. Update component state variable.
    */
    const getEventInEditMode = () => {
        if (editMode) {
            const event_id = parseInt(props.match.params.event_id)
            const selectedEvent = events.find(a => a.id === event_id) || {}
            setEvent(selectedEvent)
        }
    }

    // Get events from API when component initializes
    useEffect(() => {
        getEvents()
        }, [])

    // Once provider state is updated, determine the event (if edit)
    useEffect(() => {
        getEventInEditMode()
    }, [events])


    const constructNewEvent = () => {
        const location_id = parseInt(event.location_id)

        if (location_id === 0) {
            window.alert("Please select a location")
        } else {
            if (editMode) {
                // PUT
                updateEvent({
                    id: event.id,
                    name: event.name,
                    breed: event.breed,
                    location_id: location_id,
                    status: event.status,
                    customer_id: parseInt(localStorage.getItem("kennel_customer"))
                })
                    .then(() => props.history.push("/events"))
            } else {
                // POST
                addEvent({
                    name: event.name,
                    breed: event.breed,
                    location_id: location_id,
                    status: event.status,
                    customer_id: parseInt(localStorage.getItem("kennel_customer"))
                })
                    .then(() => props.history.push("/events"))
            }
        }
    }

    return (
        <form className="EventForm">
            <h2 className="EventForm__title">{editMode ? "Update event" : "Admit event"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">event name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        placeholder="event name"
                        defaultValue={event.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="breed">event breed: </label>
                    <input type="text" name="breed" required className="form-control"
                        placeholder="event breed"
                        defaultValue={event.breed}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location_id">Location: </label>
                    <select name="location_id" className="form-control"
                        value={event.location_id}
                        onChange={handleControlledInputChange}>

                        <option value="0">Select a location</option>
                        {locations.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="status">Treatments: </label>
                    <textarea type="text" name="status" className="form-control"
                        value={event.status}
                        onChange={handleControlledInputChange}>
                    </textarea>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewEvent()
                }}
                className="btn btn-primary">
                {editMode ? "Save Updates" : "Make Reservation"}
            </button>
        </form>
    )
}