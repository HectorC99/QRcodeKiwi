import React, { useRef, useState } from 'react'
import Logo from '../components/Logo';
import Modal from '../components/Modal';
import QRCode from 'qrcode.react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Button, DialogPanel, DialogTitle } from '@headlessui/react';

type Props = {}

function Home({ }: Props) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [showQRCodeModal, setShowQRCodeModal] = useState(false)
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

  const handleGenerateQRCode = async () => {
    const id = uuidv4()
    try {
      const data = await axios.post('https://api.qrcode.kiwi/api/messages', { id, name, message })
      setQRCodeValue(`https://qrcode.kiwi/id/${id}`)
      setShowQRCodeModal(true)
    } catch (error) {
      console.error('Error generating QR Code:', error)
    }
  }

  const handleInfoClick = () => {
    setShowInfoModal(true);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-20">
      <Logo />
      <div className="flex flex-col mt-10 w-96">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mr-2 px-4 py-2 border rounded-full"
        />
        <textarea
          placeholder="Write your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-32 mt-4 px-4 py-2 border rounded-2xl resize-none"
        />
        <div className="flex mt-6 flex-wrap">
          <button onClick={handleGenerateQRCode} className="grow px-4 py-2 bg-[#508d0d] text-white rounded-full mr-4">
            Generate QR Code
          </button>
          <button onClick={handleInfoClick} className="grow px-4 py-2 bg-gray-500 text-white rounded-full">
            How does it work?
          </button>
        </div>
      </div>
      <Modal isOpen={showQRCodeModal} setIsOpen={setShowQRCodeModal}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/80 border p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-black">
                Payment successful
              </DialogTitle>
              <div ref={qrRef}>
                <QRCode value={qrCodeValue} />
              </div>
              <div className="mt-4">
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 bg-green-500 text-white rounded-md mr-4"
                >
                  Download
                </button>
                <button className="px-4 py-2 bg-yellow-500 text-white rounded-md">Share</button>
              </div>
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
      <Modal isOpen={showInfoModal} setIsOpen={setShowInfoModal}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/80 border p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-black">
                Payment successful
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-black/50">
                Your payment has been successfully submitted. We've sent you an email with all of the details of your
                order.
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
    </div>
  );
}

export default Home