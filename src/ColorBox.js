import React, { useState } from 'react';
import './ColorBox.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';

export default function ColorBox(props) {
  const { background, name, moreUrl, showLink } = props;
  const [copied, setCopy] = useState(false);

  const changeCopyState = () => {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1500);
  };

  const isDarkColor = chroma(background).luminance() <= 0.08;
  const isLightColor = chroma(background).luminance() >= 0.5;

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div style={{ background }} className='ColorBox'>
        <div
          style={{ background }}
          className={`copy-overlay ${copied && 'show'}`}
        ></div>
        <div className={`copy-message ${copied && 'show'}`}>
          <h1 className={isLightColor && 'dark-text'}>Copied</h1>
          <p className={isLightColor && 'dark-text'}>{background}</p>
        </div>
        <div className='copy-container'>
          <div className='box-content'>
            <span className={isDarkColor && 'light-text'}>{name}</span>
          </div>
          <button className={`copy-button ${isLightColor && 'dark-text'}`}>
            Copy
          </button>
        </div>
        {showLink && (
          <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
            <span className={`see-more ${isLightColor && 'dark-text'}`}>
              More
            </span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
}
