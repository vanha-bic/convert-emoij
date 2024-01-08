console.log('background is running')

chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
  if (request.cmd === 'get_packs') {
    chrome.storage.sync.get(['stickers'], (result) => {
      if (result && result.stickers) {
        sendResponse(result.stickers.split(`
`));
      } else {
        sendResponse(['hangseed9',
          'utyaduck',
          'animated1455030680_by_sparkypro_bot']);
      }
    })
  }
  return true
})
