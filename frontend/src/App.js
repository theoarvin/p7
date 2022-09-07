import React, { useContext, useEffect, useState } from 'react';
import Routes from "./components/Routes";
import { UidContext } from './contexts/AppContext';

const App = () => {

  const [uid,setUid] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("user");
    const jwt = localStorage.getItem("jwt");
    setUid(user)
    
  }, [uid])
;
  return (
    <UidContext.Provider value={uid}>
       <Routes />
    </UidContext.Provider> 
  );
};

export default App;
