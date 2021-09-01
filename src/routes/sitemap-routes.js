import React from "react";
import { Route } from "react-router";
 
export default (
    <Route>
        <Route path="/login"/>
        <Route path="/register"/>
        <Route path="/event-organizer"/>
        <Route path="/event-organizer/:event_organizer_route"/>
        <Route path="/event-organizer/:event_organizer_name/:name/:id"/>
        <Route path="/venue"/>
        <Route path="/venue/:venue_route"/>
        <Route path="/vendor"/>
        <Route path="/vendor/:vendor_route"/>
        <Route path="/vendor/:vendor_name/:name/:id"/>
        <Route path="/request-meeting"/>
        <Route path="/forgot-password"/>
        <Route path="/promo/:url"/>  
        <Route path="/forgot"/>
        <Route path="/login-first"/>
    </Route>
);