import {useEffect, useState} from 'react'

export default function useGetLoremIpsum(url) {
    const [loremIpsum, setLoremIpsum] = useState(null);
    const [loremIpsumError, setLoremIpsumError] = useState(null);
    const [isLoremIpsumLoading, setIsLoremIpsumLoading] = useState(false);
    useEffect(() => {
        if(url) {
            setIsLoremIpsumLoading(true);
            fetch(url)
                .then(response => response.json())
                .then(result => {
                    setLoremIpsumError(null);
                    setLoremIpsum(result);
                    setIsLoremIpsumLoading(false);
                })
                .catch(error => {
                    setLoremIpsum(null);
                    setLoremIpsumError(error);
                    setIsLoremIpsumLoading(false);
                });
        }
    }, [url]);
    return [loremIpsum, loremIpsumError, isLoremIpsumLoading];
}
