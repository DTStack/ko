import React from 'react';
import '@/styles/App.css';

function App() {
    return (
        <>
            <div>
                <a href="https://dtstack.github.io/ko/" target="_blank" rel="noreferrer">
                    <img src="public/assets/KO.svg" className="logo" alt="Ko logo" />
                </a>
                <a href="https://react.dev" target="_blank" rel="noreferrer">
                    <img src="public/assets/react.svg" className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>KO + React</h1>
            <div className="card">
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">Click on the KO and React logos to learn more</p>
        </>
    );
}

export default App;
