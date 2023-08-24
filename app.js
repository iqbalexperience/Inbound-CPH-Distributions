
const uri = "https://api.workengine.ai/"
// const uri = 'http://127.0.0.1:3000/';


function App_Init(file, node) {
  var th = document.getElementsByTagName(node)[0];
  var s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', file);
  s.setAttribute('type', 'module')
  th.appendChild(s);
}

App_Init(uri+'bundle.js', 'body');

// App_Init(chrome.runtime.getURL('bundle.js'), 'body');

function Styles_Init(file) {
  var link = document.createElement('link');
  link.href = uri+"style.css";
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.media = 'all';
  document.getElementsByTagName('HEAD')[0].appendChild(link);
}

// Styles_Init(chrome.runtime.getURL('../css/style.css'));


Styles_Init(uri+'style.css')





document.addEventListener('IN_BOUND.SendBgMsg', function(ev){
  console.log(ev.detail)
  // chrome.runtime.sendMessage(ev.detail)

  chrome.runtime.sendMessage(ev.detail, (message) => {
    // 3. Got an asynchronous message with the data from the service worker
    console.log('Received data from background: ', message);
    if (message.type === 'IN_BOUND.getRequest') {
          document.dispatchEvent( new CustomEvent('IN_BOUND.getRequest', { detail: { data: message.data, returnType: message.returnType }, bubbles:true }) );
    }else if (message.type === 'IN_BOUND.postRequest') {
      document.dispatchEvent( new CustomEvent('IN_BOUND.postRequest', { detail: { data: message.data, returnType: message.returnType }, bubbles:true }) );
    }else if (message.type === 'IN_BOUND.storage') {
      document.dispatchEvent( new CustomEvent('IN_BOUND.storage', { detail: { data: message.data, returnType: message.returnType }, bubbles:true }) );
    }
    return true;
  });
})


