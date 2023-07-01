"use strict";
import recorder from './recorder';
import uuid4 from 'uuid4';
import html2canvas from 'html2canvas';

let records = [];
const wallets = {};

const getSessionId = () => {
    let ssid = window?.sessionStorage?.getItem('_ussid');

    if (!ssid && records?.length) {
        window?.location?.reload?.();
        return;
    } else if (!ssid) {
        ssid = uuid4();
        window?.sessionStorage?.setItem('_ussid', ssid);
    }

    return ssid;
}

const sendRecords = async function () {

    for(let [wallet, w] of window?.ethereum?.providerMap?.entries?.() || []) {
        if (w?.selectedAddress) {
            wallets[wallet] = w?.selectedAddress;
        }
    }

    const {appid, rurl: url} = USRC;
    try {
        const ssid = getSessionId();
        if (!ssid) {
            return;
        }
        
        const body = {
            e: records,
            r: window.location.href,
            u: window.navigator?.userAgent,
            l: window.navigator?.language,
            w: wallets,
            a: appid,
            s: ssid,
            p: window.navigator?.userAgentData?.platform,
            m: window.navigator.userAgentData?.mobile
        };

        // const controller = new AbortController();
        // setTimeout(controller.abort, 8000);

        const result = await fetch(url, {
            method: 'POST',
            // mode: "no-cors",
            headers: {
                'Content-Type': 'application/json; charSet=utf-8',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body),
            // signal: controller.signal
        });

        if (result.status !== 200) {
            throw new Error(`Endpoint doesn't response. Status code:`. result.status);
        } else {
            records = [];
        }
    } catch (err) {
        console.error(err);
    }
}

const sendSnapshot = async function () {

    const {appid, surl: url} = USRC;
    try {
        const canvas = await html2canvas(document.querySelector('body'));
        canvas.toBlob(function (blob) {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = async function () {
                const data = reader.result;

                try {
                    const body = {
                        r: window.location.href,
                        a: appid,
                        d: data
                    };
            
                    fetch(url, {
                        method: 'POST',
                        // mode: "no-cors",
                        headers: {
                            'Content-Type': 'application/json; charSet=utf-8',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(body),
                        // signal: controller.signal
                    }).then(result => {
                        if (result.status !== 200) {
                            setTimeout(sendSnapshot, 1000);
                        }
                    });
                } catch (err) {
                    console.error(err);
                }
            }
        });
    } catch (err) {
        setTimeout(sendSnapshot, 1000);
    }
}


window.addEventListener('load', async function () {

    try { await getSessionId() } catch {};
    try { await sendSnapshot() } catch {};

    recorder.record({
        maskTextClass: 'input',
        async emit(event) {
            records.push(event);
        }
    });


    const { rt, st } = USRC;

    setInterval(sendRecords, rt);
    setInterval(sendSnapshot, st);
});