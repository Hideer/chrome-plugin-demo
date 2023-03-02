import windowChanger from "./utils/AutoPunch"

const inject = async (tabId) => {
  chrome.scripting.executeScript(
    {
      target: {
        tabId
      },
      world: "MAIN", // MAIN in order to access the window object
      func: windowChanger
    },
    () => {
      console.log("Background script got callback after injection")
    }
  )
}

// Simple example showing how to inject.
// You can inject however you'd like to, doesn't have
// to be with chrome.tabs.onActivated
chrome.tabs.onActivated.addListener((e) => {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
    const { url = '' } = tabs[0];
    if(url.includes('https://oa.sunmi.com/workflow/request/AddRequest.jsp')){
      inject(e.tabId)
    }
  });
})
