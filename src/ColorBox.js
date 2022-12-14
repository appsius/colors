import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { styles } from './styles/ColorBoxStyles';

function ColorBox(props) {
  const { background, name, moreUrl, showingFullPalette, classes } = props;
  const [copied, setCopy] = useState(false);

  const changeCopyState = () => {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1500);
  };

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div style={{ background }} className={classes.ColorBox}>
        <div
          style={{ background }}
          className={classNames(classes.copyOverlay, {
            [classes.showOverlay]: copied,
          })}
        ></div>
        <div
          className={classNames(classes.copyMsg, {
            [classes.showMsg]: copied,
          })}
        >
          <h1>Copied</h1>
          <p className={classes.copyText}>{background}</p>
        </div>
        <div>
          <div className={classes.boxContent}>
            <span className={classes.colorName}>{name}</span>
          </div>
          <button className={classes.copyButton}>Copy</button>
        </div>
        {showingFullPalette && (
          <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
            <span className={classes.seeMore}>More</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
}

export default withStyles(styles)(ColorBox);
