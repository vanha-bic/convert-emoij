console.log('background is running')

chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
  if (request.cmd === 'get_packs') {
    chrome.storage.sync.get(['stickers'], (result) => {
      if (result && result.stickers) {
        sendResponse(result.stickers.split(`
`));
      } else {
        sendResponse([
          'completepackpusnyangami',
          'spv_0ec451a506a702544ba9799e1b639487_by_stckrrobot',
          'yourcapoo'
        ]);

      }
    })
  }
  return true
})

// premiums1ick3r
// premiumstuff_2x
// hangseed_cutie_cat
// video1140485586_by_joker_zero_two_bot
