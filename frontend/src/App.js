import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isErrorMail, setIsErrorMail] = useState(false);
  const [mailSuccess, setMailSuccess] = useState(false);
  const [emailTo, setEmailTo] = useState('');
  const [emailTitle, setEmailTitle] = useState('');
  const [emailBody, setEmailBody] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_HOST}/messages`)
      .then(response => {
        if(!response.ok)
          throw new Error(response.status)

        return response.json();
      })
      .then(data => setData(data))
      .catch(() => setIsError(true))
  }, [data])

  const submit = (e) => {
    e.preventDefault();
    setIsErrorMail(false);
    setMailSuccess(false);

    fetch(`${process.env.REACT_APP_API_HOST}/sendMail`, {
      method: 'post',
      body: JSON.stringify({
        to: emailTo,
        title: emailTitle,
        body: emailBody
      })
    })
    .then(() => setMailSuccess(true))
    .catch(() => setIsErrorMail(true))
  }

  return (
    <div className="App">
      <h1>Messages</h1>
      {!isError && (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Messages</th>
            </tr>
          </thead>
          <tbody>
            { data.map(message => (
              <tr key={message.id}>
                <td>{message.id}</td>
                <td>{message.messages}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isError && (
        <h4>Impossible de charger les données</h4>
      )}
      <div>
        <h2>Envoyer un mail</h2>
        <form onSubmit={submit}>
          <div>
            {isErrorMail && (
              <h4>Impossible d'envoyer le mail</h4>
            )}
            {mailSuccess && (
              <h4>Le mail a été envoyé avec succés</h4>
            )}
          </div>
          <div>
            <label>Destinataire</label>
            <input type="text" value={emailTo} onChange={e => setEmailTo(e.target.value)}></input>
          </div>
          <div>
            <label>Titre</label>
            <input type="text" value={emailTitle} onChange={e => setEmailTitle(e.target.value)}></input>
          </div>
          <div>
            <label>Message</label>
            <input type="text" value={emailBody} onChange={e => setEmailBody(e.target.value)}></input>
          </div>
          <button type="submit">Envoyer</button>
        </form>
      </div>
    </div>
  );
}

export default App;
