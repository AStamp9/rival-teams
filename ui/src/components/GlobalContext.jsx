import { createContext, useState, useEffect, useContext } from "react";
const GlobalContext = createContext();

export function GlobalProvider({ children }){
    const [players, setPlayers] = useState([]);
    const [loadingPlayers, setLoadingPlayers] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8081/players")
            .then(res => res.json())
            .then(data => {
                setPlayers(data);
                setLoadingPlayers(false);
            })
            .catch(err => {
                console.log('Error fetching players', err);
                setLoadingPlayers(false);
            })
    }, [])

    return(
        <GlobalContext.Provider value={{ players, loadingPlayers}}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    return useContext(GlobalContext);
  }