import { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Button, IconButton } from '@material-ui/core';
import { Twitter } from '@material-ui/icons';

import { withStyles } from '@material-ui/core/styles';

import CardContent from '@material-ui/core/CardContent';
import styled from '@emotion/styled'

import axios from 'axios';


const CardContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center; 
	min-height: 100vh;
	min-width: 100vh;
`

const Quote = styled.h3`
    font-family: 'Caveat', cursive;
	font-size: 50px;
	font-weight: 200;
	margin: 0px 40px;
	color: #cd5b45;

`

const AuthorContainer = styled.h4`
	display: flex;
	align-items: center;
	justify-content: center; 
	font-size: 30px;
	font-family: 'Caveat', cursive;
`

const ButtonsContainer = styled.h4`
	display: flex;
	align-items: center;
	margin: 10px 40px;

	justify-content: space-between; 
`

const StyledButton = withStyles({
	root: {
		background: 'coral',
		borderRadius: 3,
		border: 0,
		color: 'white',
		height: 40,
		padding: '0 30px',
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		"&:hover": {
			backgroundColor: "#cd5b45",
		}
	},
	label: {
		textTransform: 'capitalize',
	},
})(Button);

const useStyles = makeStyles({
	root: {
		width: 700,
	},
});

function App() {
	const classes = useStyles();
	const [quote, setQuote] = useState({});

	const fetchQuote = () => {
		axios.get("https://api.quotable.io/random").then((res) => {
			const q = {
				text: res.data.content,
				author: res.data.author,
			}
			setQuote(q);
		});
	}

	useEffect(() => {
		fetchQuote();
	}, [])

	return (
		<CardContainer>
			<Card className={classes.root} id="quote-box">
				<CardContent >
					<Quote id="text">
						“ {quote.text} ”
					</Quote>
					<AuthorContainer id="author">
						~ {quote.author}
					</AuthorContainer>
					<ButtonsContainer>
						<IconButton id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${quote.text}`} aria-label="tweet" component="a">
							<Twitter fontSize="large" />
						</IconButton>
						<StyledButton id="new-quote" onClick={fetchQuote}> Fetch Quote</StyledButton>
					</ButtonsContainer>
				</CardContent>
			</Card>
		</CardContainer>
	);
}
export default App;
