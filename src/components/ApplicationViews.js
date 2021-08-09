import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList.js"
import { GameProvider } from "./game/GameProvider.js"
import { GameForm } from "./game/GameForm.js"
import { EventList } from "./events/EventList.js"
import { EventProvider } from "./events/EventProvider.js"
import { EventForm } from "./events/EventForm.js"


export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <GameProvider>
                <Route exact path="/games">
                    <GameList />
                </Route>

                <Route exact path="/games/new">
                    <GameForm />
                </Route>
            </GameProvider>

            <EventProvider>
                <Route exact path="/events">
                    <EventList />
                </Route>
                <GameProvider>
                <Route exact path="/events/new">
                    <EventForm />
                </Route>
                </GameProvider>
            </EventProvider>
        </main>
    </>
}
