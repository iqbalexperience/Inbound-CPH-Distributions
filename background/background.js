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
    console.log(request)

    if(request.type === "IN_BOUND.getRequest"){
        console.log('Get results',request)
        fetch(request.url)
            .then(resp => resp.text())
            .then( res =>  sendResponse({ data: res, type:"IN_BOUND.getRequest", returnType: request.returnType }) )
    }else if(request.type === "IN_BOUND.postRequest"){
        console.log('Get results',request)
        fetch(request.url, request.options)
            .then(resp => resp.text())
            .then( res =>  sendResponse({ data: res, type:"IN_BOUND.postRequest", returnType: request.returnType }) )
    }else if(request.type === "IN_BOUND.logoBadge"){
        console.log('Logo Badge',request)
        chrome.action.setBadgeText( {text: request.text } )
        chrome.action.setBadgeBackgroundColor( {color: request.color } )
        

        // request sytax
        // document.dispatchEvent( new CustomEvent('IN_BOUND.SendBgMsg', {detail: { text:"loading", type:"IN_BOUND.logoBadge", color:"red" }, bubbles:true} ))
    }else if(request.type === "IN_BOUND.storage"){
        // console.log(' storage request ',request)
        if(request.action === "set"){
            chrome.storage.local.set( {...request.storage} )
        }else if(request.action === "get"){
            // console.log(request.data.storage.key)
            chrome.storage.local.get([request.storage.key]).then((result) => {
                console.log("Value currently is " + result.key);
                sendResponse({ data: result, type:"IN_BOUND.storage", returnType: "IN_BOUND.storage" })
              });
        }

        // request sytax
        // document.dispatchEvent( new CustomEvent('IN_BOUND.SendBgMsg', {detail: { storage: { key:"hello",   }, action:"get", type:"IN_BOUND.storage", }, bubbles:true} ))

        // document.dispatchEvent( new CustomEvent('IN_BOUND.SendBgMsg', {detail: { storage: { hello:"value stored for hello",   }, action:"set", type:"IN_BOUND.storage", }, bubbles:true} ))

    }else if(request.type === "IN_BOUND.openTAB"){
        chrome.tabs.create({ url: request.url })
    }

  
    return true
  });

  