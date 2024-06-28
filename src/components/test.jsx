"use client";

import {ErrorBoundary} from 'react-error-boundary';
import {PropTypes} from 'prop-types';
import './test.css'
import useGetLoremIpsum from './useGetLoremIpsum';

const data = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten"
];

const ipsumLink = "https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1";

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

function Test() {
    const [loremIpsum, loremIpsumError, isLoremIpsumLoading] = useGetLoremIpsum(ipsumLink);
    return (
        <ErrorBoundary FallbackComponent={Fallback}>
            <div className="testContainer">
                <h1>Test</h1>
                <p>
                    This is a only a test.
                </p>
                {
                    isLoremIpsumLoading && !loremIpsumError && 
                        <h3>Loading...</h3>
                }
                {
                    !isLoremIpsumLoading && !loremIpsumError && loremIpsum && loremIpsum.map(txt => (
                        <p key={txt}>{txt}</p>
                    ))
                }
                {
                    !isLoremIpsumLoading && loremIpsumError &&
                        <>
                            <p>Lorem Ipsum Error:</p>
                            <pre className="red">{loremIpsumError.message}</pre>
                        </>
                }
                <div className="listContainer">
                    {
                        data.map(item => (
                            <div key={item}>{item}</div>
                        ))
                    }
                </div>
            </div>
        </ErrorBoundary>
    );
}

export default Test;
