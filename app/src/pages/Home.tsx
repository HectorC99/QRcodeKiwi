import React, { useRef, useState } from 'react'
import Logo from '../components/Logo';
import Modal from '../components/Modal';
import QRCode from 'qrcode.react';
import { nanoid } from 'nanoid';
import axios from 'axios';
import { Button, DialogPanel, DialogTitle } from '@headlessui/react';

type Props = {}

function Home({ }: Props) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [showFinalForm, setShowFinalForm] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [qrCodeValue, setQRCodeValue] = useState('')
  const qrRef = useRef<HTMLDivElement | null>(null);

  const handleDownload = () => {
    if (qrRef.current) {
      // Convert canvas to data URL
      const canvas = qrRef.current.querySelector('canvas');
      if (canvas) {
        const imageUrl = canvas.toDataURL('image/png');
        // Create an <a> element to trigger the download
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'QRCode.png'; // Suggest a filename for the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const handleGenerateQRCode = async (e: React.FormEvent) => {
    e.preventDefault()
    const id = nanoid(7)
    try {
      const data = await axios.post('https://api.qrcode.kiwi/api/messages', { id, name, message })
      setQRCodeValue(`https://qrcode.kiwi/id/${id}`)
      setTimeout(() => {
        setShowFinalForm(true)
      }, 800);
    } catch (error) {
      console.error('Error generating QR Code:', error)
    }
  }

  const handleInfoClick = () => {
    setShowInfoModal(true);
  };

  return (
    <div className="flex flex-col items-center min-h-dvh bg-gray-100 pt-10 lg:pt-20">
      <Logo {...(qrCodeValue ? { qrcode: qrCodeValue } : {})} />
      <div className={`flex flex-col items-center mt-10 w-96 opacity-0 ${showFinalForm ? 'animate-fadein' : 'hidden'}`}>
        <h1>Scan me! ^</h1>
        <div className="flex flex-wrap mt-6 gap-2">
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-green-500 text-white rounded-full"
          >
            Download
          </button>
          <button type="button" onClick={handleInfoClick} className="grow px-4 py-2 bg-slate-500 text-white rounded-full">
            Generate again
          </button>
          <button type="button" onClick={handleInfoClick} className="grow px-4 py-2 bg-yellow-500 text-white rounded-full">
            Share
          </button>
        </div>
      </div>
      <form onSubmit={handleGenerateQRCode} className={`flex flex-col mt-10 w-96 ${qrCodeValue && 'animate-fadeout'}`}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mr-2 px-4 py-2 border rounded-full"
          required
        />
        <textarea
          placeholder="Write your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-32 mt-4 px-4 py-2 border rounded-2xl resize-none"
          required
        />
        <div className="flex mt-6 flex-wrap">
          <button className="grow px-4 py-2 bg-[#508d0d] text-white rounded-full mr-4">
            Generate QR Code
          </button>
          <button type="button" onClick={handleInfoClick} className="grow px-4 py-2 bg-gray-500 text-white rounded-full">
            How does it work?
          </button>
        </div>
      </form>
      <Modal isOpen={showInfoModal} setIsOpen={setShowInfoModal}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/80 border p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-black">
                Display a message with a QR Code
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-black/50">
                Put in your name and a message, and we'll generate a QR Code for you to share with others. When someone scans the QR Code, they'll see your message displayed on this web page.
              </p>
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={() => setShowInfoModal(false)}
                >
                  Got it, thanks!
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Modal>
      <p className="fixed mb-6 bottom-0 w-full text-center text-slate-500">
        Developed for fun by{' '}
        <a className="underline text-green-600" href="https://www.linkedin.com/in/hector-campbell-9b671b145" target="_blank">Hector Campbell</a>
      </p>
    </div>
  );
}

export default Home