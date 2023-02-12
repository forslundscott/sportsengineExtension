// chrome.runtime.onMessage.addListener(messageReceiver)
const BYE = 1
const PLAYEVERYWEEK = 2
var teamData = [
    ['CFC','',5],
    ['FCF','',4],
    ['FTK','',3],
    ['OVO','',2],
    ['TOG','',1]
]


class team{
    constructor(){
        this.id = ''
        this.name = ''
        this.rating = 3
    }
}

class match{
    constructor(){
        this.teams = []
        this.ids = []
        this.matchDelta = 0
    }
}
async function moveToEnd(array,element){
    await array.push(array.splice(array.indexOf(element), 1)[0])
    console.log(array)
}
function simpleCsvSchedule(gamesPerTeam){
    var teams = getTeamsTesting(6)
    var matches = getMatches(teams)
    var weeks = []
    for(var i=0;i<gamesPerTeam;i++){
        var week = []
        // console.log(matches)
        matches.forEach(match=>{
            console.log(matches.indexOf(match))
            if(!week.includes(match.ids[0]) && !week.includes(match.ids[1])){
                week = week.concat(match.ids)
                moveToEnd(matches,match)
                // console.log(matches)
            }
        })
        weeks.push(week)
    }
    
    console.log(weeks)
}
function tomorrow(date){
    date.setDate(date.getDate()+1)
}

function beginningOfDay(date){
    return date.setHours(0,0,0,0)
}
function getTeamsTesting(numberOfTeams = 3){
    var teamList = []
    for(var i=0;i<numberOfTeams;i++){
        var currentTeam = new team
        currentTeam.name = 'Team' + (i+1)
        currentTeam.id = 'T' + (i+1)
        currentTeam.rating = Math.random()*5
        teamList.push(currentTeam)
    }
    return teamList
}
function makeSchedule(type = 1, numTeams,minGamesPerTeam,totalWeeks){
    var teams = getTeamsTesting(numTeams)
    var matches = getMatches(teams)
    var gamesPerRound = Math.floor(teams.length/2)
    // for(var week=0;week<6;week++){

    // }
    // for(var i=0;i<matches.length;i++){
        
    // }
    if(teams.length/2 !== gamesPerRound){
        // This checks for odd number of teams
    
        if(type === BYE){

        }
        if(type === PLAYEVERYWEEK){

        }
    }
    console.log('Total Match Combos: ' + matches.length)
    console.log('Games Per Round: ' + gamesPerRound)
    console.log('Rounds Needed for Equal Games: ' + (teams.length/2 !== gamesPerRound?'Multiple of ' + teams.length + ' or split into multiple leagues':1))
    console.log('Rounds Needed to play each opponent equally: Multiple of ' + (matches.length/gamesPerRound))
    console.log('Suggested Rounds for equal games: ' + roundSuggestion(teams,minGamesPerTeam,gamesPerRound))
    console.log('Rounds per week: ' + roundsPerWeek(roundSuggestion(teams,minGamesPerTeam,gamesPerRound),totalWeeks))
}
function roundsPerWeek(rounds,weeks){
    if(weeks>=rounds){return 'One round every ' + (weeks/rounds) + ' weeks'}
    var lesserRounds = Math.floor(rounds/weeks)
    var remainder = (rounds/weeks)-lesserRounds
    if(remainder === 0){return lesserRounds}
    var greaterWeeks = Math.round(remainder * weeks)
    var lesserWeeks = weeks - greaterWeeks
    return lesserRounds + ' round(s) per week for ' + lesserWeeks + ' week(s) and ' + (lesserRounds + 1) + ' round(s) per week for ' + greaterWeeks + ' week(s)'
}
function roundSuggestion(teams,minGamesPerTeam,gamesPerRound){
    if(teams.length/2 === gamesPerRound){return minGamesPerTeam}
    if(teams.length>=minGamesPerTeam){ return teams.length}
    return (Math.ceil(minGamesPerTeam/teams.length))*teams.length
}
function compare( a, b ) {
    if ( a.matchDelta < b.matchDelta ){
      return -1;
    }
    if ( a.matchDelta > b.matchDelta ){
      return 1;
    }
    return 0;
}

function getMatches(teams){
    var matchList = []
    
    for(var i=0;i<teams.length-1;i++){
        for(var j=i+1;j<teams.length;j++){
            var currentMatch = new match
            currentMatch.teams.push(teams[i])
            currentMatch.teams.push(teams[j])
            currentMatch.ids.push(teams[i].id)
            currentMatch.ids.push(teams[j].id)
            currentMatch.matchDelta = Math.abs(teams[i].rating-teams[j].rating)
            matchList.push(currentMatch)
        }
    }
    matchList.sort( compare )
    return matchList
    // console.log(matchList)
}

function getTeams(){
    var teamList = []
    var headers = document.getElementsByTagName('thead')[0].getElementsByTagName('th')
    var headerIndexes = {}
    for(var i=0;i<headers.length;i++){

        switch(headers[i].innerText){
            case 'Name':
                headerIndexes.name = i
                break
            case 'Abbrev':
                headerIndexes.id = i
                break
            case 'Club/League':
                headerIndexes.league = i
                break
            case 'Season':
                break
            case 'Subseason':
                break
        }
    }
    var teamRows = document.getElementsByClassName('teamRow')
    for(var i=0;i<teamRows.length;i++){
        if(teamRows[i].style.display !== 'none'){
            var currentTeam = new team
            currentTeam.name = teamRows[i].getElementsByTagName('td')[headerIndexes.name].innerText
            currentTeam.id = teamRows[i].getElementsByTagName('td')[headerIndexes.id].innerText
            currentTeam.rating = Math.random()*5
            teamList.push(currentTeam)
        }
    }
    console.log(teamList)
    return teamList
}
function getRegistrations(){
    if(document.getElementById('topNav')){
        if(document.getElementById('topNav').getAttribute('data-title') == 'Registrations'){
            if(document.getElementById('subNavMenu').getElementsByClassName('selected')[0].innerText == 'Registrations'){
                
                var leaguePage = document.getElementsByTagName('tbody')[0].getElementsByTagName('a')[0].getAttribute('href')
                messageSender({command: 'newtab', url: location.protocol + document.domain + leaguePage})
                // console.log(leaguePage)

                //fetch page

                //loop through headers until find first innertext containing Cp1
                // document.getElementsByTagName('thead')[0].getElementsByTagName('th')[0]


                // //if innertext of captain name is not empty
                // document.getElementsByTagName('tbody')[0].getElementsByTagName('td')[4].innerText

                // document.getElementsByTagName('tbody')[0].getElementsByClassName('attachedLink')[0].getAttribute('href')




            }
        }
    }
}

function logTeams(){
    var teams = []
    for(var i=0;i<teamData.length;i++){
        var currentTeam = new team(teamData[i])
        teams.push(currentTeam)
    }
    console.log(teams)
}
// messageSender({greeting: "hello"})
// chrome.runtime.sendMessage({greeting: "hello"},responseHandler)

function messageReceiver(request, sender, sendResponse){

    // getRegistrations()
}

function messageSender(message){
    chrome.runtime.sendMessage(message,function (response){
        console.log(response)
    })
}

