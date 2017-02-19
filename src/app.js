import React from 'react';
import { render } from 'react-dom';
import pdfjs from 'pdfjs-dist';
import 'worker-loader!pdfjs-dist/build/pdf.worker';
import App from './components/App';

pdfjs.PDFJS.workerSrc = 'main.worker.js';

const rootElement = document.getElementById('content');

render(<App />, rootElement);
