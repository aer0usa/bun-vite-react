import {Box, Button, Card, CircularProgress, Typography} from '@mui/material';
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

function Test() {
    const [
        loremIpsum,
        loremIpsumError,
        isLoremIpsumLoading
    ] = useGetLoremIpsum(ipsumLink);
    return (
        <div className="testContainer">
            <h1>Test</h1>
            <p>
                This is a only a test.
            </p>
            <Box>
                {
                    isLoremIpsumLoading && !loremIpsumError && 
                        <div className="centerContainer">
                            <CircularProgress />
                        </div>
                }
                {
                    !isLoremIpsumLoading && !loremIpsumError && loremIpsum && loremIpsum.map(txt => (
                        <Card key={txt}>
                            <Typography
                                className="loremParagraph"
                                component="p"
                                gutterBottom
                                variant="paragraph" >
                                {txt}
                            </Typography>
                        </Card>
                    ))
                }
                {
                    !isLoremIpsumLoading && loremIpsumError &&
                        <>
                            <p>Lorem Ipsum Error:</p>
                            <pre className="red">{loremIpsumError.message}</pre>
                        </>
                }
            </Box>
            <div className="listContainer">
                {
                    data.map(item => (
                        <div key={item}>{item}</div>
                    ))
                }
            </div>
            <div className="centerContainer">
                <Typography variant="overline">
                    This is Material UI
                </Typography>
            </div>
            <div className="centerContainer">
                <Button variant="contained">Cool.</Button>
            </div>
        </div>
    );
}

export default Test;
