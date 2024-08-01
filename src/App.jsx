"use client";

import {useState} from 'react'
import {ErrorBoundary} from 'react-error-boundary';
import {PropTypes} from 'prop-types';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Test from './components/test.jsx'

Fallback.propTypes = {
    error: PropTypes.object
};

function Fallback({error}) {
    return (
        <>
            <p>Something went wrong.</p>
            <pre className="red">{error.message}</pre>
        </>
    );
}

function App() {
  const [count, setCount] = useState(0)

    return (
        <ErrorBoundary FallbackComponent={Fallback}>
            <div>
                <Test />
                { /*
                    <a href="https://vitejs.dev" target="_blank">
                        <img src={viteLogo} className="logo" alt="Vite logo" />
                    </a>
                    <a href="https://react.dev" target="_blank">
                        <img src={reactLogo} className="logo react" alt="React logo" />
                    </a>
                */ }
            </div>
            { /*
                <h1>Vite + React</h1>
                <div className="card">
                    <button onClick={() => setCount((count) => count + 1)}>
                        count is {count}
                    </button>
                    <p>
                        Edit <code>src/App.jsx</code> and save to test HMR
                    </p>
                </div>
                <p className="read-the-docs">
                    Click on the Vite and React logos to learn more
                </p>
            */ }
        </ErrorBoundary>
    )
}

export default App
