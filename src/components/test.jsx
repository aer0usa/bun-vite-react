import {useCallback, useState} from 'react'
import {
    Box,
    Button,
    Card,
    Checkbox,
    CircularProgress,
    FormControl,
    FormControlLabel,
    Grid,
    Link,
    RadioGroup,
    Radio,
    TextField,
    Typography
} from '@mui/material';
import './test.css'
import useGetLoremIpsum from './hooks/useGetLoremIpsum';

const BASE_IPSUM_LINK = "https://baconipsum.com/api/";
const DEFAULT_QUANTITY_NAMES = Object.freeze({
    "PARAGRAPHS": "paras",
    "SENTENCES": "sentences"
});

function Test() {
    const [ipsumLink, setIpsumLink] = useState("");
    const [count, setCount] = useState(2);
    const [quantityOf, setQuantityOf] = useState(DEFAULT_QUANTITY_NAMES.PARAGRAPHS);
    const [startWithLorem, setStartWithLorem] = useState(true);
    const [type, setType] = useState("all-meat");
    const handleChangeCount = useCallback(event => {
        setCount(event.target.value);
    }, []);
    const handleChangeQuantityOf = useCallback(event => {
        setQuantityOf(event.target.value);
    }, [])
    const handleChangeStart = useCallback(() => {
        setStartWithLorem(prev => !prev);
    }, []);
    const handleChangeType = useCallback(event => {
        setType(event.target.value);
    }, []);
    const handleSetLink = useCallback(() => {
        const newLink = `${BASE_IPSUM_LINK}?type=${type}&${quantityOf}=${count}${startWithLorem ? "&start-with-lorem=1" : ""}`;
        setIpsumLink(newLink);
    }, [count, quantityOf, startWithLorem, type]);
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
                <Grid container columnSpacing={1}>
                    <Grid item xs={3} >
                        <FormControl fullWidth>
                            <RadioGroup
                                name="type"
                                onChange={handleChangeType}
                                value={type}
                            >
                                <FormControlLabel
                                    value="all-meat"
                                    control={<Radio />}
                                    label="All Meat"
                                />
                                <FormControlLabel
                                    value="meat-and-filler"
                                    control={<Radio />}
                                    label="Meat and Filler"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} >
                        <TextField
                            inputProps={{
                                max: 10,
                                min: 1
                            }}
                            fullWidth
                            label="Count"
                            onChange={handleChangeCount}
                            type="number"
                            value={count}
                        />
                    </Grid>
                    <Grid item xs={3} >
                        <FormControl>
                            <RadioGroup
                                name="quantityOf"
                                onChange={handleChangeQuantityOf}
                                value={quantityOf}
                            >
                                <FormControlLabel
                                    value={DEFAULT_QUANTITY_NAMES.PARAGRAPHS}
                                    control={<Radio />}
                                    label="Paragraphs"
                                />
                                <FormControlLabel
                                    value={DEFAULT_QUANTITY_NAMES.SENTENCES}
                                    control={<Radio />}
                                    label="Sentences"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} >
                        <FormControl>
                            <FormControlLabel
                                control={<Checkbox checked={startWithLorem} onChange={handleChangeStart} />}
                                label="Start with Bacon Ipsum"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>
                            Thanks to <Link href="https://baconipsum.com/" target="_blank">baconipsum.com</Link>
                        </Typography>
                    </Grid>
                    <Grid item className="rightJustify" xs={6}>
                        <Button onClick={handleSetLink} variant="contained">Get Bacon</Button>
                    </Grid>
                </Grid>
                {
                    isLoremIpsumLoading && !loremIpsumError && 
                        <div className="centerContainer">
                            <CircularProgress />
                        </div>
                }
                {
                    !loremIpsumError && loremIpsum && loremIpsum.map(txt => (
                        <Card className="baconCard" key={txt}>
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
