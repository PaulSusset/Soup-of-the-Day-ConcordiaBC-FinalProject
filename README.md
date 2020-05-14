# Soup of the Day

Soup of the Day is my final project for Concordia Bootcamps.
The idea behind the app is to provide a hub for local restaurants to advertise rotating menu items or daily specials.

## Demo

[![Soup of the day demo](https://i.imgur.com/FVPJELQ.png)](https://www.youtube.com/watch?v=dWs-6VTryA0)

Designed as mobile-first on the user end and tablet-first for the post-login pages (restaurant admin), my vision for use would be people working downtown or other high-business density areas wanting to know what's the daily item for their nearby restaurants.

## Technology Used

### Front-end

This app's front-end was built using React.js. Important modules are styled-components, redux, react-google-maps

### Back-end

The back-end was built using Node.js, express, MongoDB, Google Maps Javascript API

## Challenges and what's next

Developping this app went pretty smoothly, but here are some of the key challenges I faced:

- Integrating the map and Google's services. Google doesn't have an official React library so finding the right library was a bit of a challenge. I initally used google-map-react, but the documentation was very incomplete and hadn't been updated in over a year. Running into many problems I decided to swap it out halfway through the project for react-google-maps, which has more recent and complete support at the only downside of being more difficult to make custom markers for.
- Building data! This was my first foray into making an app with no supplied data. Going through the iterations and wanting to know how to format data points for ease of use and reference was a struggle. The app is built to have user-provided data, so having a strong template was necessary.

If I have a chance to keep working on this, I'd like to add the following features:

- Sort products (distance, price)
- Search function. I have already allowed restaurants to submit search tags for their dishes. A challenge I can foresee is that MongoDB allows for setting an index to search through, but only returns full-word matches. Beyond pulling everything and parsing the results for a match in Node I haven't yet thought of a solution
- Rework the dishes display component. With my mobile-first design, I couldn't find a way to include the days of the week the item was available for without over-encumbering the design.
- Complete editing options for previously submitted dishes
- Setting a more robust schedule for restaurants
