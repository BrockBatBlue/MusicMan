import { getLyrics } from "genius-lyrics-api";
const options = {
    apiKey: 'DB7qjggVv1dGI0qhsam9XQ-JZoZTgJDVMIK4wBoBdT_vaC-hW0xZGzSVTDSZjLSh', // genius developer access token
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    optimizeQuery: true
};
 
getLyrics(options).then(lyrics => console.log(lyrics));
