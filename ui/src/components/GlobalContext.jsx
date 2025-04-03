import { createContext, useState, useEffect, useContext } from "react";
const GlobalContext = createContext();

export function GlobalProvider({ children }){
    const [players, setPlayers] = useState([]);
    const [loadingPlayers, setLoadingPlayers] = useState(true);

    const [characters, setCharacters] = useState([]);
    const [loadingCharacters, setLoadingCharacters] = useState(true);

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

        fetch('http://localhost:8081/characters')
            .then(res => res.json())
            .then(data => {
            setCharacters(data);
            setLoadingCharacters(false);
            })
            .catch(err => {
            console.error('Failed to fetch characters:', err);
            setLoadingCharacters(false);
            });
    }, [])

    return(
        <GlobalContext.Provider 
        value={{ 
            players, 
             loadingPlayers,
             characters,
             loadingCharacters}}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    return useContext(GlobalContext);
  }