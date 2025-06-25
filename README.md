# ELT Full Stack Technical Test

## Overview


### Structure
You are given an NX monorepo project which consists of the following apps/libs:


- **calendar-backend** - NestJS backend project
- **calendar-frontend** - React frontend project
- **calendar-domain** - Domain layer for the calendar-backend
- **calendar-backend-e2e** - API (Axios) e2e tests for calendar-backend
- **calendar-frontend-e2e** - Cypress e2e tests for calendar-frontend

### App description
When run, React web app will render a calendar and fetch calendar events from the backend to display. 

There is an option on the page to add a random event, which will create a random event, submit it to the backend which in turn will persist it in the database.

There is also an option to show/hide ids for each event.

#
## Tasks to complete

Below is a list of tasks which need to be completed. You are allowed to use any libraries you want.

#### 1. Implement drag-and-drop
  
  There is already a drag-and-drop functionality in the calendar but nothing happens on drop. You would need to create a necessary API endpoint on the backend and make a request to it from the frontend so that the changes requested by the drag-and-drop are persisted.
#### 2. Implement event resize

  There is already an event resize functionality in the calendar but same as DnD it's not implemented on the backend. You will need to fix it so the changes are persisted.
#### 3. Add event modal with a form which takes name, start and end times for an event to be created
  
  Currently, the Add button just creates a random event. Instead, it needs to prompt the user to input the details of the event they want to create.

#### 4. Edit event modal

  Currently, there is an Edit button on the screen but it does nothing. Edit button should allow the user to edit the name, start and/or end time of an existing event.

#### 5. Add backend validation to event create/edit APIs

  If user tries to create/edit an event so that it would conflict with another event in the system, the API should return a 400 response with an error. This should also be displayed in the web UI.

#### 6. (Optional) Refactor showIds and selectedEvent params

  Currently, these params are passed through multiple components. Refactor those so they are stored in a context/state.

#### 7. (Optional) Restyle the event

  Change the style of the event so it matches this design: https://t.ly/YZhyY. The font is Georgia and the colour palette is available here: https://colorhunt.co/palette/001f3f3a6d8c6a9ab0ead8b1



#
## Running the project

Ensure you are running **Node v20+** (this has been tested specifically on v20 so in case you hit problems with a higher version, try downgrading to v20).

Install dependencies
```sh
npm install
```

Create a MySQL database in Docker using docker-compose
```shell
docker compose up -d
```

Serve backend and frontend (+ database schema setup)
```shell
npm run serve
```
You should be presented with an interactive NX shell where you can switch between backend and frontend tasks to see outputs.

You can navigate to the webapp by going to http://localhost:4004 in your browser.
