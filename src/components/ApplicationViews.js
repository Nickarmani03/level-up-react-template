import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList.js"
import { GameProvider } from "./game/GameProvider.js"
import { GameForm } from "./game/GameForm.js"
import { EditGameForm } from "./game/EditGameForm.js";
import { EventList } from "./events/EventList.js"
import { EventProvider } from "./events/EventProvider.js"
import { EventForm } from "./events/EventForm.js"
import { ProfileProvider } from "./auth/ProfileProvider.js"
import { Profile } from "./auth/Profile.js"




export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <GameProvider>
            <EventProvider>
                <Route exact path="/games">
                    <GameList />
                </Route>
            </EventProvider>

                <Route exact path="/games/new">
                    <GameForm />
                </Route>

                <Route exact path="/games/:gameId(\d+)/edit">
                    <EditGameForm />
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

            <ProfileProvider>
                <Route exact path="/profiles">
                    <Profile />
                </Route>
            </ProfileProvider>
        </main>
    </>
}
