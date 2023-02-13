chrome.action.onClicked.addListener(buttonClicked)
chrome.runtime.onMessage.addListener(messageReceiver)

function buttonClicked(tab) {
    console.log('testbgd')
    let msg = {
        txt: 'message from background'
    }
    messageSender(tab.id,msg)
    // chrome.tabs.sendMessage(tab.id, msg,responseHandler)
}

function messageReceiver(request, sender, sendResponse){
    sendResponse('response from Background')
    console.log(request.url)
    if(request.command = 'newtab'){
        chrome.tabs.create({
            url: request.url
          })
    }
}

function messageSender(tab, message){
    chrome.tabs.sendMessage(tab, message,function (response){
        console.log(response)
    })
}

function getTabs(specifications = {}){
    var tabList
    chrome.tabs.query({}, function(tabs) {
        tabList = tabs
      });
      return tabList
}

function changeTabProperties(tab,properties){
    // chrome.tabs.update(tab.id, {highlighted: true})
    chrome.tabs.update(tab.id, properties)
}

function changeTabByIndex(tab){
    chrome.tabs.highlight({tabs: tab.index, windowId: tab.windowId}, function() {})
}