import React, { useEffect } from 'react';
import logo from './logo.svg';
import { useAppSelector } from './app/hooks';
import './App.css';
import { selectStatus, selectError } from './app/appSlice';
import SignIn from './features/users/SignIn';
import SignUp from './features/users/SignUp';
import { Files } from './features/files/Files';

const Loading = () => (<div>Loading...</div>)

function App() {

  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);

  let component = <></>

  switch (status) {
    case 'failed': component = <div><SignIn/><p>{error}</p></div>; break;
    case 'signup': component = <SignUp/>; break;
    case 'loading': component = <Loading/>; break;
    case 'files': component = <Files/>; break;
    default: component = <SignIn/>; break;
  }

  return(<div className="App">{component}</div>)
}

export default App;
