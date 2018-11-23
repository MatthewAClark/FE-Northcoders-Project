const api_url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : process.env.REACT_APP_API_URL  = 'http://localhost:3000'

const fetchUrl = { 'stations' : `${api_url}/api/db/stations/`, 
                   'allSchedules' : `${api_url}/api/db/schedules/all`,
                   'stationRoutes':`${api_url}/api/db/routes/`,
                   
                'routes':`${api_url}/api/db/schedules/time/routes`,
            'postStation': `${api_url}/api/db/stations/`,
            'route': `${api_url}/api/db/schedules/route/`,
        'postSchedule': `${api_url}/api/db/schedules/`,
        'delaySchedules' : `${api_url}/api/db/status/schedules`,
        
        'deleteSchedule': `${api_url}/api/db/schedules`,
        'stationStart':`${api_url}/api/db/routes/start`,
        'liveStation':`${api_url}/api/live/station`,
        'liveRoute': `${api_url}/api/live/station/route/`,
        'liveFetchDepBoard': `${api_url}/api/live/stationtimes` }

export default  fetchUrl