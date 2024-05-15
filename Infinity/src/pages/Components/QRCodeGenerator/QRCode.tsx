import React from 'react';
import QRCode from 'react-qr-code';

function QRCodeGenerator({ data }: any) {
    return (
        <React.Fragment>
            {/* <h2>QR Code</h2> */}
            <QRCode
            style={{border: '20px solid white'}}
            size={350}
            level="L"
            value={data} />
        </React.Fragment>
    );
}

export default QRCodeGenerator;
