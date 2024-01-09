import {createRoot} from 'react-dom/client';
import EmojiPickerHOC from "./picker";
import stickers from "./data/stickers.json";


function renderPicker(rootElement: Element) {
  let container = document.createElement('div')
  container.id = 'convert-emoij'

  const root = createRoot(container); // createRoot(container!) if you use TypeScript

  chrome.runtime.sendMessage({cmd: "get_packs"}, (rs: []) => {
    // @ts-ignore
    let packs = (stickers as [] || []).filter((pack: any) => rs.includes(pack.id))
    // @ts-ignore
    packs = packs.sort((a: any, b: any) => rs.indexOf(a.id) - rs.indexOf(b.id))
    let EmojiPicker = EmojiPickerHOC(rootElement, packs)
    root.render(<EmojiPicker />);
    rootElement.querySelector('#advancedTextEditorCell .AutoHeight>div>div')?.append(container)
  });


}

function loadRoot() {
  let rootElement = document.querySelector("#create_post")
  if (rootElement != null) {
    if (rootElement.querySelector('#convert-emoij') == null) {
      renderPicker(rootElement)
    } else {
      setTimeout(loadRoot, 2000)
      return
    }
  }
  setTimeout(loadRoot, 1000)
}

loadRoot()

function loadThread() {
  let threadElement = document.querySelector(".ThreadViewer")
  if (threadElement != null) {
    if (threadElement.querySelector('#convert-emoij') == null) {
      renderPicker(threadElement)
    } else {
      setTimeout(loadThread, 2000)
      return
    }
  }
  setTimeout(loadThread, 1000)
}

loadThread()

