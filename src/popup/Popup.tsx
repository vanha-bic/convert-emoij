import { useState, useEffect } from 'react'

import './Popup.css'

export const Popup = () => {
  const [stickers, setStickers] = useState('')


  useEffect(() => {
    chrome.storage.sync.get(['stickers'], (result) => {
      setStickers(result.stickers)
    })
  }, [])

  return (
    <main>
      {/*@ts-ignore*/}
      <textarea value={stickers} name="" id="" cols="30" rows="20" onChange={(e) => {
        setStickers(e.target.value)
      }} ></textarea>
      <button onClick={() => {
        chrome.storage.sync.set({ stickers })
      }}>Save</button>
    </main>
  )
}

export default Popup
