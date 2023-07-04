'use client';

import { Box } from 'shared/components';
import React, { MutableRefObject, useEffect, useRef } from 'react';
import QRCodeStyling, {
  Options as QRCodeStylingOptions,
} from 'qr-code-styling';

const qrCodeOptions: QRCodeStylingOptions = {
  width: 200,
  height: 200,
  image: 'telegram_logo.png',
  dotsOptions: {
    color: '#000',
    type: 'rounded',
  },
  backgroundOptions: {
    color: 'transparent',
  },
  imageOptions: {
    crossOrigin: 'anonymous',
    margin: 5,
  },
};

const useQRCodeStyling = (
  options: QRCodeStylingOptions
): QRCodeStyling | null => {
  if (typeof window !== 'undefined') {
    const QRCodeStylingLib = require('qr-code-styling');
    return new QRCodeStylingLib(options) as QRCodeStyling;
  }

  return null;
};

export const QRGenerator = ({ url }: { url: string }) => {
  const ref = useRef() as MutableRefObject<HTMLInputElement>;
  const qrCode = useQRCodeStyling(qrCodeOptions);

  if (typeof window === 'undefined') {
    return;
  }

  useEffect(() => {
    qrCode?.append(ref.current);
  }, []);

  useEffect(() => {
    qrCode?.update({
      data: url,
    });
  }, [url]);

  return (
    <div className="App">
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <div ref={ref} />
      </Box>
    </div>
  );
};
