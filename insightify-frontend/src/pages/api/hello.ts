import requestIp from 'request-ip';

export default async function handle (req, res) {
    try {
        const result = await (await fetch('https://ip-geo-location.p.rapidapi.com/ip/185.129.3.166?format=json', {
            headers: {
                'X-RapidAPI-Key': '0d475852d6msh022f71d7c866450p156f2ajsn01542024fc2a',
                'X-RapidAPI-Host': 'ip-geo-location.p.rapidapi.com'
            }
        })).json();
        res.json(result);
    } catch (err) {
        res.json({});
    }
}