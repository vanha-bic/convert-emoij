import './picker.css'
import {useState} from "react";
import Picker from '@emoji-mart/react'

// @ts-ignore

function triggerInputChange(node: any, value = '', cb: any) {
  if ([window.HTMLTextAreaElement].indexOf(node.__proto__.constructor) > -1) {
    // @ts-ignore
    const setValue = Object.getOwnPropertyDescriptor(node.__proto__, 'value').set;
    const event = new Event('input', {bubbles: true});
    // @ts-ignore
    setValue.call(node, value);
    node.dispatchEvent(event);
    if (cb) {
      cb(value);
    }
  }
}


const data = {
  aliases: {},
  categories: [],
  emojis: {},
  sheet: {cols: 10, rows: 10}
}

// higher order function to create a new function that will only execute once
export default function HOCEmojiPicker(control: Element, packs: any[]) {
  return function EmojiPicker() {
    console.log('EmojiPicker');
    const [show, setShow] = useState(false)

    const onEmojiSelect = (emoji: any) => {
      let input = control.querySelector('textarea')
      if (input) {
        input.focus()
        input.textContent += `![${emoji.id}](${emoji.src})`;
        triggerInputChange(input, input.textContent?.toString(), () => {
          setShow(false)
        })
      }
    }

    return <>
      <img src={"https://emoij-lake.vercel.app/tgs/premiumstuff_2x/2289283.tgs.gif"} width={32} height={32}
           id="convert-emoij-icon" onClick={() => setShow(!show)}></img>
      {show &&
        <Picker previewPosition='none' searchPosition='none' perLine={4} onEmojiSelect={onEmojiSelect} data={data}
                custom={packs} emojiSize={100} emojiButtonSize={100} onClickOutside={(e: any) => {
          if (!show || e.target.id === 'convert-emoij-icon') return
          setShow(false)
        }}/>}
    </>
  }
}
