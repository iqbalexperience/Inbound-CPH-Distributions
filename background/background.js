"use strict";

chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === "install") {
        chrome.tabs.create({ url: "https://chat.openai.com/chat" })
    }
})

chrome.action.onClicked.addListener(() => {
    chrome.tabs.query({url: "https://chat.openai.com/chat"}, function([ tab ]) {
        if (tab) {
        chrome.tabs.update(tab.id, {active: true})
        } else {
        chrome.tabs.create({url: "https://chat.openai.com/chat"})
        }
    })
})



// listen for messages
chrome.runtime.onMessage.addListener( function ( request, sender, sendResponse ) {

    if(request.type === "IN_BOUND.getRequest"){
        console.log('Get results',request)
        fetch(request.url)
            .then(resp => resp.text())
            .then( res =>  sendResponse({ data: res, type:"IN_BOUND.getRequest" }) )
    }else if(request.type === "IN_BOUND.postRequest"){
        console.log('Get results',request)
        fetch(request.url, request.options)
            .then(resp => resp.text())
            .then( res =>  sendResponse({ data: res, type:"IN_BOUND.postRequest" }) )
    }
  
    return true
  });