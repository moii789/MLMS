import React from "react";

import QrReader from "react-qr-reader";

interface QRreaderComponent {
  handleScan: (data: String | null) => void;
}

const QRreaderComponent: React.FC<QRreaderComponent> = (props) => {
  return (
    <QrReader
      delay={300}
      onError={(err) => alert(err)}
      onScan={props.handleScan}
      style={{ width: "450px" }}
    />
  );
};

export default QRreaderComponent;
