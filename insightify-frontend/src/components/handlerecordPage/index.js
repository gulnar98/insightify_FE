import style from './assets/css/style.module.css';
import RecordingAside from "../RecordingAside";
import RecordingsHeader from '../recordingsHeader';
import RecordingsInformation from '../recordingsInformation';
import Button from '../../UI/button/Button';
import Check from '../../UI/checkbox';
import LastDayAddFilter from '../lastDayAddFilter/lastDayAddFilterContainer';
import ListViewDelete from '../list-view-delete';
import { Checkbox } from '@mui/material';
import { useEffect, useState } from 'react';
import DeletePopUp from '../DeletePopup';

const buttonCancelProps = {
    btncolor: "#white",
    textColor: "#3A3A3A",
    text: "Cancel",
    padding: "12px 17px",
    border: "none",
    borderRadius: '6px',
    fontFamily: "Inter",
    fontSize: '14px',
    fontWeight: '600'
}

const listviewprops = {
    btncolor: "white",
    text: "Delete",
    border: "solid 1px #9A3530",
    textColor: "#9A3530",
    borderRadius: "4px",
    padding: "7px 15px",
    fontSize: "1em",
    fontWeight: "700"
};

const yesdelete = {
    btncolor: "#9A3530",
    textColor: "#ffff",
    text: "Yes, delete",
    padding: "12px 17px",
    border: "none",
    borderRadius: '6px',
    fontFamily: "Inter",
    fontSize: '14px',
    fontWeight: '600'
}

const exitbtnprops = {
    btncolor: "white",
    text: "✕",
    border: "none",
    textColor: "#757575",
    borderRadius: "4px",
    padding: "7px 15px",
    fontSize: "1em",
    fontWeight: "700",
}

const buttonProps = {
  btncolor: "#1F75CC",
  btncolorHover: "#1F75CC",
  text: "NFT Whale",
  textColorHover: "white",
  border: "solid 1px #1F75CC",
  textColor: "white",
  borderRadius: "4px",
  padding: "7px 15px",
  fontSize: "1em"
};

const btnMirrorProps = {
  btncolor: "rgb(255, 255, 255)",
  btncolorHover: "rgb(255, 255, 255)",
  text: "MIRROR",
  textColorHover: "#707070",
  border: "solid 1px #707070",
  textColor: "#707070",
  borderRadius: "5px",
  padding: "7px 10px",
  fontSize: "1em"
};

const btnEnsProps = {
  btncolor: "rgb(255, 255, 255)",
  btncolorHover: "rgb(255, 255, 255)",
  text: "ENS",
  textColorHover: "#707070",
  border: "solid 1px #707070",
  textColor: "#707070",
  borderRadius: "5px",
  padding: "7px 10px",
  fontSize: "1em"
};

const btnApeProps = {
  btncolor: "rgb(255, 255, 255)",
  btncolorHover: "rgb(255, 255, 255)",
  text: "APE",
  textColorHover: "#707070",
  border: "solid 1px #707070",
  textColor: "#707070",
  borderRadius: "5px",
  padding: "7px 10px",
  fontSize: "1em"
};

export default function HandlerecordPage({ sessions, forceReload }) {
  const [headerButton, setHeaderButton] = useState(false);
  const [infoButton, setInfoButton] = useState(false);
  const [deleteButton, setDeleteButton] = useState(false);
  const [removeButton, setRemoveButton] = useState(false);
  const [checkedRows, setCheckedRows] = useState([]);
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [deletePopupIsOpen, setDeletePopupIsOpen] = useState(false);

  useEffect(() => {
    if (sessions?.length) {
      setCheckedRows(state => new Array(sessions?.length).fill(false));
    }
  }, [sessions]);

  useEffect(() => {
    if (checkedRows?.some(value => value)) {
      setPopupIsOpen(state => true);
    } else {
      setPopupIsOpen(state => false);
    }
  }, [checkedRows]);
  

  return (
    <div className={style.container}>
      <div className={style.leftDiv}>
        <RecordingAside />
      </div>
      <div className={style.rightDiv}>
        <h1 className={style.title}>Recordings</h1>
        <div className={style.divv}>
          <LastDayAddFilter />
        </div>
        <table className={style.table}>
          <thead>
            <RecordingsHeader
              checkbox={<Checkbox onClick={() => {
                setHeaderButton(state => !headerButton);
                setCheckedRows(state => new Array(checkedRows.length).fill(!headerButton));
              }} />}
            />
          </thead>
          <tbody>
          {sessions?.map?.((session, index) => (
            <RecordingsInformation
              key={`recordinginformation-${index}`}
              sessionId={session.sessionId}
              checked={checkedRows[index]}

              onChange={e => {
                const arr = [...checkedRows];
                arr[index] = e.target.checked;
                setCheckedRows(state => arr);
              }}

              iss={infoButton}
              labelBtn={<Button {...buttonProps} />}
              walletImage={null}
              web3={session?.web3}
              dateProps={new Date(session.timestamp).toLocaleDateString('en-US', {
                // weekday: 'long',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
              countryProps={{
                name: session?.countryName,
                flag: session?.countryFlag
              }}
              platform={session.platform}
              userAgent={session.userAgent}
              actionProps={session.actionsCount}
              pagesProps={session.pagesCount}
              durationProps={session.duration}
              landingPage={new URL(session.enterPage).pathname}
              exitPage={new URL(session.exitPage).pathname}
            />
          ))}
          </tbody>
        </table>
        {popupIsOpen && (
          <ListViewDelete btn={<Button {...listviewprops} onClick={() => {
            setPopupIsOpen(state => false);
            setDeletePopupIsOpen(state => true);
          }}/>} 
          exitBtn={<Button {...exitbtnprops} onClick={() => {
            setPopupIsOpen(state => false);
            setCheckedRows(state => new Array(sessions?.length).fill(false));
          }}/>}>
            {checkedRows.filter(value => value).length} recording selected
          </ListViewDelete>
        )}

        {deletePopupIsOpen && (
          <DeletePopUp 
            
            exitBtn={<Button {...exitbtnprops} onClick={() => {
              setDeletePopupIsOpen(state => false);
              setCheckedRows(state => new Array(sessions?.length).fill(false));
            }}/>}

            yesdelete={<Button {...yesdelete} onClick={() => {
              const ids = [];
              for(let i in checkedRows) {
                if (!checkedRows[i] || !sessions?.[i]?.sessionId) {
                  continue;
                }

                ids.push(sessions?.[i]?.sessionId);
              }

              if (!ids.length) {
                setDeletePopupIsOpen(state => false);
                setCheckedRows(state => new Array(sessions?.length).fill(false));
                return;
              }

              fetch(`/api/record/delete`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                body: JSON.stringify({
                  ids
                })
              })
              .then(result => result.json())
              .then(result => {
                forceReload(Math.random() * Math.random());
                setDeletePopupIsOpen(state => false);
                setCheckedRows(state => new Array(sessions?.length).fill(false));
              })
            }} />}

            buttonCancel={<Button {...buttonCancelProps} onClick={() => {
                setDeletePopupIsOpen(state => false);
                setCheckedRows(state => new Array(sessions?.length).fill(false));
              }}
            />}
          />
        )}
      </div>
    </div>
  );
}
