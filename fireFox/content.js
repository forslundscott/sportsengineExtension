chrome.runtime.onMessage.addListener(messageReceiver)
const BYE = 1
const PLAYEVERYWEEK = 2
var teamData = [
    ['CFC','',5],
    ['FCF','',4],
    ['FTK','',3],
    ['OVO','',2],
    ['TOG','',1]
]
class game {
    constructor(){
        this.datetime = Date.now()
        this.match

    }
}
class scheduleList{
    constructor(){
        this.keys = [
            'Start_Date',
            'Start_Time',
            'End_Date',
            'End_Time',
            'Title',
            'Location',
            'All_Day_Event',
            'Event_Type',
            'Team1_ID',
            'Team2_ID',
            'Custom_Opponent'
        ]
        this.scheduleItems = []
    }
}
class scheduleItem{
    constructor(){
        this.Start_Date = ''
        this.Start_Time = ''
        this.End_Date = ''
        this.End_Time = ''
        this.Title = ''
        this.Location = 'AC3 Gym'
        this.All_Day_Event = 0
        this.Event_Type = 'Game'
        this.Team1_ID = ''
        this.Team1_Is_Home = 1
        this.Team2_ID = ''
        this.Custom_Opponent = 0
    }
}
class round{
    constructor(){
        this.mathes = []
        this.teams = []
        this.ids = []
    }
}

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
function someIncludes(){
    conditions.some(el => str1.includes(el))
}

function moveToEnd(array,element){
    var tempArray = [...array]
    var splicedElement = tempArray.splice(tempArray.indexOf(element), 1)
    tempArray.push(splicedElement[0])
    return tempArray
}
function scheduleForUpload(gamesPerTeam){
    var scheduleList1 = new scheduleList
    var teams = getTeams()
    var matches = getMatches(teams)
    var weeks = []
    for(var i=0;i<gamesPerTeam;i++){
        var week = new round
        matches.forEach(match=>{
            if(!week.ids.includes(match.ids[0]) && !week.ids.includes(match.ids[1])){
                week.ids = week.ids.concat(match.ids)
                week.mathes.push(match)
                var scheduleItem1 = new scheduleItem
                scheduleItem1.Start_Date = 'Date ' + (i+1)
                scheduleItem1.End_Date = 'Date ' + (i+1)
                scheduleItem1.Title = match.teams[0].name+' vs '+match.teams[1].name
                scheduleItem1.Team1_ID = match.teams[0].id
                scheduleItem1.Team2_ID = match.teams[1].id
                scheduleList1.scheduleItems.push(scheduleItem1)
                matches = moveToEnd(matches,match)
            }
        })
        weeks.push(week)
    }
    // console.log(weeks)
    var csvStr = ''
    for(var i=0;i<scheduleList1.keys.length;i++){
        if(!csvStr==''){csvStr+=','}
        csvStr+='"'+scheduleList1.keys[i]+'"'
    }
    for(var i=0;i<scheduleList1.scheduleItems.length;i++){
        if(!csvStr==''){csvStr+='\n'}
        for(var j=0;j<scheduleList1.keys.length;j++){
            if(!j==0){csvStr+=','}
            csvStr+='"'+scheduleList1.scheduleItems[i][scheduleList1.keys[j]]+'"'
        }
    }
    
    window.open("data:text/csv,"+encodeURI(csvStr))
    console.log('test')

    // this is the simple schedule
    
    var csvStr = ''
    for(var wk=0;wk<weeks.length;wk++){
        if(!csvStr==''){csvStr+='\n\n\n'}
        for(var mt=0;mt<weeks[wk].mathes.length;mt++){
            if(!csvStr==''){csvStr+='\n'}
            csvStr+='"'+weeks[wk].mathes[mt].ids[0]+'"'+','+'"'+weeks[wk].mathes[mt].ids[1]+'"'
        }
    }
    window.open("data:text/csv,"+encodeURI(csvStr))
    // return csvStr
}
function createSchedule(gamesPerTeam){
    var teams = getTeams()

}
function simpleCsvSchedule(gamesPerTeam){
    var teams = getTeams()
    // var teams = getTeamsTesting(6)
    var matches = getMatches(teams)
    var weeks = []
    for(var i=0;i<gamesPerTeam;i++){
        var week = new round
        matches.forEach(match=>{
            if(!week.ids.includes(match.ids[0]) && !week.ids.includes(match.ids[1])){
                week.ids = week.ids.concat(match.ids)
                week.mathes.push(match)
                matches = moveToEnd(matches,match)
            }
        })
        weeks.push(week)
    }
    // console.log(weeks)
    var csvStr = ''
    for(var wk=0;wk<weeks.length;wk++){
        if(!csvStr==''){csvStr+='\n\n\n'}
        for(var mt=0;mt<weeks[wk].mathes.length;mt++){
            if(!csvStr==''){csvStr+='\n'}
            csvStr+=weeks[wk].mathes[mt].ids[0]+','+weeks[wk].mathes[mt].ids[1]
        }
    }
    // console.log(csvStr)
    window.open("data:text/csv,"+encodeURI(csvStr))
    // return [weeks,csvStr]
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
    return teamList
}
function getRegistrations(){
    if(document.getElementById('topNav')){
        if(document.getElementById('topNav').getAttribute('data-title') == 'Registrations'){
            if(document.getElementById('subNavMenu').getElementsByClassName('selected')[0].innerText == 'Registrations'){
                
                var leaguePage = document.getElementsByTagName('tbody')[0].getElementsByTagName('a')[0].getAttribute('href')
                messageSender({command: 'newtab', url: location.protocol + document.domain + leaguePage})

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
    if(document.location.href.match(/https:.*glosoccer.sportngin.com.sport_management.teams/)){
        if(document.location.href.match(/https:.*glosoccer.sportngin.com.sport_management.teams/)[0]==document.location.href){
            console.log('SETeams')
            scheduleForUpload(6)
        }
    }
        if(document.location.href=='/home/scott/Documents/Projects/ChromeExtensions/sportsengineExtension/schedule.html'){
            console.log('schedule.html')
            scheduleLobsterExport()
            // scheduleForUpload(6)
        }

    if(document.location.href.match(/https:.*leaguelobster.com.*/)){
        if(document.location.href.match(/https:.*leaguelobster.com.*/)[0]==document.location.href){
            console.log('LeagueLobster')
            scheduleLobsterExport()
            // scheduleForUpload(6)
        }
    }
    // getRegistrations()
}
function scheduleLobsterExport(){
    var weeks = document.getElementsByClassName("schedule-week-container")
    var schedule = []
    for(var i=0;i<weeks.length;i++){
        var currentWeek = []
        var week = weeks[i]
        var matches = week.getElementsByClassName("match-droppable")
        for(var j=0;j<matches.length;j++){
            var currentMatch = []
            var team1 = matches[j].getElementsByClassName("match-team")[0]
            var team2 =matches[j].getElementsByClassName("match-team")[1]
            currentMatch.push(team1.innerText)
            currentMatch.push(team2.innerText)
            currentWeek.push(currentMatch)
        }
        schedule.push(currentWeek)
    }
    var csvStr = ''
    for(var i=0;i<schedule.length;i++){
        var week = schedule[i]
        if(!csvStr==''){csvStr+='\n\n\n'}
        for(var j=0;j<week.length;j++){
            if(!csvStr==''){csvStr+='\n'}
            var match = week[j]
            csvStr+=match[0]+','+match[1]
        }
    }
    window.open("data:text/csv,"+encodeURI(csvStr))
    // console.log(csvStr)
}
function messageSender(message){
    chrome.runtime.sendMessage(message,function (response){
        console.log(response)
    })
}


