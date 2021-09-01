import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import DocumentMeta from 'react-document-meta';

class Example extends React.Component {
  render() {
    const meta = {
      title: 'Buat dan Rencanakan Acara - Littlecloud',
      description: 'Littlecloudeo adalah perusahaan event berbasis digital yang menyediakan berbagai kebutuhan acara',
      copyright: 'Littlecloud',
      author: 'Littlecloud',
      robots: 'index,follow',
      meta: {
        charset: 'utf-8',
        name: {
          keywords: 'event organizer'
        }
      }
    };
 
    return (
      <DocumentMeta {...meta}>
        <App />
      </DocumentMeta>
    );
  }
}

ReactDOM.render(
  <Example/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
