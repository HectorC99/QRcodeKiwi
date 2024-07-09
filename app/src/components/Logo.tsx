import React from 'react';
import logoImage from '../assets/qrcodeKiwi.png'
import QRCode from 'qrcode.react';

type Props = {
  qrRef?: React.MutableRefObject<HTMLDivElement | null>;
  qrcode?: string;
}

function Logo({ qrRef, qrcode }: Props) {
  return (
    <div className={`kiwi-container ${qrcode && 'animate'}`}>
      <img className="kiwi" src={logoImage} alt="" />
      {qrcode && (
        <>
          <div ref={qrRef} className="qr-code-container">
            <QRCode value={qrcode} size={176} />
          </div>
          <div className="firework"></div>
        </>
      )}
    </div>
  )
}

export default Logo