import {createRoot} from 'react-dom/client';
import EmojiPicker from "./picker";
import {debounce} from "./lib";


// ReactDOM.render(<Picker data={data} onEmojiSelect={console.log}/>, document.getElementById('open-pepe-create_post-0'))
function renderPicker(rootElement: Element) {
  let container = document.createElement('div')
  container.id = 'convert-emoij'

  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(<EmojiPicker control={rootElement} />);
  rootElement.querySelector('#advancedTextEditorCell .AutoHeight>div>div')?.append(container)
}

(function load() {
  const observer = new MutationObserver(debounce(function () {
    let rootElement = document.querySelector("#create_post")
    if (rootElement != null && rootElement.querySelector('#convert-emoij') == null) {
      renderPicker(rootElement)
    }
    let threadElement = document.querySelector(".ThreadViewer")
    if (threadElement != null && threadElement.querySelector('#convert-emoij') == null) {
      renderPicker(threadElement)
    }
  }, 300))
  observer.observe(document, {
    childList: true,
    subtree: true
  });
})()
