// @ts-nocheck

import React from 'react';
import io from 'socket.io-client';
import { Terminal } from 'xterm';

import { AttachAddon } from 'xterm-addon-attach';
import { FitAddon } from 'xterm-addon-fit';
import { Unicode11Addon } from 'xterm-addon-unicode11';
import { SerializeAddon } from 'xterm-addon-serialize';
import { WebLinksAddon } from 'xterm-addon-web-links';

import { Helmet } from 'react-helmet';

import css from './Terminal.module.css';

import { useStore } from 'src/data/store/useStore';

// const someDiv = document.getElementById('terminal');

const HOST = 'http://localhost:3001/';
// const socket = io(HOST);
// const socket = io(HOST, {
//   transports: ['websocket'],
// });

// const socket = io(HOST, {
//   reconnection: true,
//   rejectUnauthorized: false,
// });
// console.log('main socket: ', socket);

// socket.on('connect_error', (err) => {
//   console.log(`connect_error due to ${err.message}`);
// });

// console.log('host: ', host);

let valid_term_data = '';

const ValidateTermData = (termData: string) => {
  // const setCommands = useStore((state) => state.setCommands);

  // const { setCommands } = useStore();
  // console.log('[FUNC] validate term data: ', termData.replace(/\\/g, '\\'));
  // console.log('term data: ', termData);
  // console.log

  if (
    (termData.includes('[6n') || termData.includes('/ # \\x1B[6n')) &&
    !termData.includes('\n')
  ) {
    return null;
    // console.log('incltermData.split('[6n')[1]);
  } else if (termData.includes('[1;34')) {
    // console.log('[FUNC] skip: ', termData);
    // } else if (termData.includes('\r') && termData.includes('\n')) {
  } else if (/\n/.test(termData) && /\r/.test(termData)) {
    // console.log('[FUNC RETURN]');
    // console.log('[FUNC] includes /r: ', termData);
    if (valid_term_data.length > 0) {
      const copy_for_return = valid_term_data;
      valid_term_data = '';
      // console.log('[FUNC] RETURN ', copy_for_return);
      return copy_for_return.trim();
      // setCommands(valid_term_data);
    }
  } else if (termData.includes('[J')) {
    if (valid_term_data.length > 0) {
      valid_term_data = valid_term_data.slice(0, -1);
    }
  } else {
    valid_term_data += termData;
    // console.log(
    //   '[FUNC] just right termData ',
    //   termData,
    //   ' to valid_term_data: ',
    //   valid_term_data,
    // );
  }

  return null;

  // setCommands(termData);
  // return <>hello</>;
};

export const Term = () => {
  let [isConnected, setIsConnected] = React.useState();
  let [command, setCommand] = React.useState('');
  const { setlessonInfo, setCommands } = useStore();

  React.useEffect(() => {
    const socket = io(HOST, {
      transports: ['websocket'],
    });

    setIsConnected(socket.connected);
    // const socket = io();

    // TODO: точно ли тут команды нужно чистить?
    // const
    // setCommands([]);

    var terminal = new Terminal({
      // screenKeys: true,
      // useStyle: true,
      cursorBlink: true,
      cursorStyle: 'bar',
      // fullscreenWin: true,
      // maximizeWin: true,
      screenReaderMode: true,
      cols: 128,
      theme: {
        foreground: 'white',
        background: '#2A2C34',
        cursor: 'help',
        //   lineHeight: 16,
      },
      fontSize: 16, // какой шрифт оптимальнее?
    });

    // const termBlock = React.useRef(null); // закомментил

    // var id = window.location.pathname.split("/")[3];
    var id = '289f0649716b462c89ce3a5129f2462b3873b7c442502cc41546669429c8ab05';

    //   var host = window.location.origin;
    //   const host = 'http://localhost:3001';
    //   //   const socket = io.connect(host);
    //   console.log('id: ', id);
    //   console.log('host: ', host);

    //   const socket = io(host);

    //   console.log('socket: ', socket);

    //   socket.emit('exec', id, $('#terminal').width(), $('#terminal').height());
    socket.emit('exec', id, 200, 200);

    //   console.log('socket: ', socket.connected);

    //   terminal.open(document.getElementById('terminal'));

    // React.useEffect(() => {
    socket.connected ? setIsConnected(true) : setIsConnected(false);
    // socket.on('connect', () => {
    //   setIsConnected(true);
    // });

    socket.on('connection', () => {
      console.log('connected!');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('dissconnet');
      setIsConnected(false);
    });

    // socket.io.on('error', (error) => {
    //   console.log('errrrrrrror: ', error);
    // });
    socket.on('error', (error) => {
      console.log('errrrrrrror: ', error);
    });

    const term = document.getElementById('terminal');

    // console.log('termBlock: ', termBlock);

    // terminal.open(termBlock.current!);
    terminal.open(term);

    const attachAddon = new AttachAddon(socket);
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    const webLinksAddon = new WebLinksAddon();
    terminal.loadAddon(webLinksAddon);
    const unicode11Addon = new Unicode11Addon();
    terminal.loadAddon(unicode11Addon);
    const serializeAddon = new SerializeAddon();
    terminal.loadAddon(serializeAddon);
    terminal.loadAddon(attachAddon);
    //   terminal._initialized = true;
    terminal.focus();

    setTimeout(function () {
      fitAddon.fit();
      socket.emit('cmd', 'export TERM=xterm\n');
      socket.emit(
        'cmd',
        'PS1="\\[\\033[01;31m\\]\\u\\[\\033[01;33m\\]@\\[\\033[01;36m\\]\\h \\[\\033[01;33m\\]\\w \\[\\033[01;35m\\]\\$ \\[\\033[00m\\]"\n',
      );
      socket.emit('cmd', "alias ls='ls --color'\n");
      socket.emit('cmd', "alias ll='ls -alF'\n");
      socket.emit('cmd', 'clear\n');
      // socket.emit('cmd', 'cd home\n');
      //   socket.emit('cmd', 'ls\n');
    });

    terminal.onResize(function (event) {
      var rows = event.rows;
      var cols = event.cols;
      //   console.log('resizing to', { cols: cols, rows: rows + 1 });
      socket.emit('resize', { cols: cols, rows: rows + 1 });
    });

    terminal.onTitleChange(function (event) {
      console.log(event);
    });

    window.onresize = function () {
      fitAddon.fit();
    };

    // terminal.onKey('enter', (data) => {
    //   console.log('enter data: ', data);
    // });

    // terminal.onKey();

    // terminal.writeln(
    //   [
    //     '    Xterm.js is the frontend component that powers many terminals including',
    //     '                           \x1b[3mVS Code\x1b[0m, \x1b[3mHyper\x1b[0m and \x1b[3mTheia\x1b[0m!',
    //     '',
    //     ' ┌ \x1b[1mFeatures\x1b[0m ──────────────────────────────────────────────────────────────────┐',
    //     ' │                                                                            │',
    //     ' │  \x1b[31;1mApps just work                         \x1b[32mPerformance\x1b[0m                        │',
    //     ' │   Xterm.js works with most terminal      Xterm.js is fast and includes an  │',
    //     ' │   apps like bash, vim and tmux           optional \x1b[3mWebGL renderer\x1b[0m           │',
    //     ' │                                                                            │',
    //     ' │  \x1b[33;1mAccessible                             \x1b[34mSelf-contained\x1b[0m                     │',
    //     ' │   A screen reader mode is available      Zero external dependencies        │',
    //     ' │                                                                            │',
    //     ' │  \x1b[35;1mUnicode support                        \x1b[36mAnd much more...\x1b[0m                   │',
    //     ' │   Supports CJK 語 and emoji \u2764\ufe0f            \x1b[3mLinks\x1b[0m, \x1b[3mthemes\x1b[0m, \x1b[3maddons\x1b[0m,            │',
    //     ' │                                          \x1b[3mtyped API\x1b[0m, \x1b[3mdecorations\x1b[0m            │',
    //     ' │                                                                            │',
    //     ' └────────────────────────────────────────────────────────────────────────────┘',
    //     '',
    //   ].join('\n\r'),
    // );

    terminal.onData((data) => {
      //   console.log('data includes: ', data.includes('\r'));
      //   setCommand((command += data));

      //   if (command.includes('\r')) {
      //     socket.emit('cmd', command);
      //     console.log('command is: ', command);
      //   }
      //   console.log('data: ', data);
      //   console.log('command: ', command);
      //   terminal.write(data);
      // console.log('cmd data: ', data.replace(/\\/g, '\\\\'));
      // console.log(
      //   'DATA!!!!!! -> ',
      //   typeof data,
      //   ' cond:',
      //   data === '[C' || data === '[D' || data === '[J',
      //   ' cond [D: ',
      //   data === '[D',
      // );
      // if (data === '[C' || data === '[D' || data === '[J') {
      //   console.log('arrow disallowed');
      // } else {
      //   socket.emit('cmd', data);
      // }

      switch (data) {
        // case '\u0003': // Ctrl+C
        //   socket.emit('cmd', '^C');
        //   break;
        case '\u007F':
          // console.log('remove data');
          socket.emit('cmd', '\u007F');
          break;
        case '\r': // Enter
          // runCommand(term, command);
          // command = '';
          socket.emit('cmd', '\r');
          break;
        default:
          // socket.emit('cmd', data);
          if (
            (data >= String.fromCharCode(0x20) &&
              data <= String.fromCharCode(0x7e)) ||
            data >= '\u00a0'
          ) {
            // command += e;
            // term.write(e);
            // console.log('data -> ', data);
            socket.emit('cmd', data);
          }
      }
      // console.log('data: ', data);

      // if (
      //   (data >= String.fromCharCode(0x20) &&
      //     data <= String.fromCharCode(0x7e)) ||
      //   data >= '\u00a0'
      // ) {
      //   // command += e;
      //   // term.write(e);
      //   console.log('data -> ', data);
      //   socket.emit('cmd', data);
      // }

      // socket.emit('cmd', data);
    });

    socket.on('show', (data) => {
      console.log('show data: ', data, 'data: ', data.termData);
      // console.log('data.progressInfo: ', data.progressInfo);
      const valid_data = ValidateTermData(data.termData.replace(/\\/g, '\\'));
      // console.log('valid_data: ', valid_data);
      if (valid_data !== null) {
        // console.log('setCommands');
        setCommands(valid_data);
      }
      setlessonInfo(data.progressInfo);
      terminal.write(data.termData);
    });

    socket.on('end', (status) => {
      // $('#terminal').empty();
      socket.disconnect();
      terminal.write(
        '\r\n\nconnection has been terminated from the server-side (hit refresh to restart)\n',
      );
    });
  }, []);

  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/xterm@4.18.0/css/xterm.min.css"
        />
        <script src="https://cdn.jsdelivr.net/npm/xterm@4.18.0/lib/xterm.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/xterm-addon-attach@0.6.0/lib/xterm-addon-attach.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/xterm-addon-fit@0.5.0/lib/xterm-addon-fit.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/xterm-addon-serialize@0.6.2/lib/xterm-addon-serialize.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/xterm-addon-unicode11@0.3.0/lib/xterm-addon-unicode11.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/xterm-addon-web-links@0.5.1/lib/xterm-addon-web-links.min.js"></script>
      </Helmet>
      {/* <p>Connected: {'' + isConnected}</p> */}
      {/* <p></>Terminal */}
      <div className={css.term} id="terminal"></div>
    </>
  );
};
