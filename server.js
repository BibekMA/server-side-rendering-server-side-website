// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')

// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({extended: true}))


// Stel het basis endpoint in
const apiUrl = 'https://fdnd-agency.directus.app/items'

const sdgData = await fetchJson(apiUrl + '/hf_sdgs')
const stakeholdersData = await fetchJson(apiUrl + '/hf_stakeholders')
const scoresData = await fetchJson(apiUrl + '/hf_scores')
const companiesData = await fetchJson(apiUrl + '/hf_companies/1')
console.log(companiesData.data.name)

// Home
app.get('/', function(request, response) {
        // console.log(sdgData.data)
        response.render('index', {
            sdgs: sdgData.data,
            stakeholders: stakeholdersData.data,
            scores: scoresData.data,
            companies: companiesData.data
        })
})

// Stakeholder pagina's
app.get('/dashboard', function(request, response) {
    fetchJson(apiUrl + '/hf_sdgs').then((sdgData) => {
        // console.log(sdgData.data)
        response.render('dashboard', {
            sdgs: sdgData.data,
            stakeholders: stakeholdersData.data,
            scores: scoresData.data,
            companies: companiesData.data
        })
    })
})

app.get('/medewerkers', function(request, response) {
	response.render ('stakeholder', {
        title: 'Medewerkers',
        current: '/medewerkers'
    })
})

app.get('/financiers', function(request, response) {
	response.render('stakeholder',
    {
        title: 'Financiërs',
        current: '/financiers'
    })
})

app.get('/leveranciers', function(request, response) {
	response.render('stakeholder', {
        title: 'Leveranciers',
        current: '/leveranciers'
    })
})

app.get('/klanten', function(request, response) {
	response.render('stakeholder', {
        title: 'Klanten',
        current: '/klanten'
    })
})

app.get('/omgeving', function(request, response) {
	response.render('stakeholder', {
        title: 'Omgeving',
        current: '/omgeving'
    })
})

app.get('/vragenlijst', function(request, response) {
	response.render('vragenlijst', {
        current: '/vragenlijst',
        sdgs: sdgData.data,
        stakeholders: stakeholdersData.data,
        scores: scoresData.data,
        companies: companiesData.data
    })
})


// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8009)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function() {
  // Toon een bericht in de console en geef het poortnummer door
    console.log(`Application started on http://localhost:${app.get('port')}`)
})