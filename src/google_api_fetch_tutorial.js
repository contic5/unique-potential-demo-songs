/*THIS KEY IS ONLY FOR ACCESSING PUBLIC GOOGLE FILES*/

//I can access read only files and files I can edit. I would need a full backend to securely store the key.
const public_apiKey =import.meta.env.GOOGLE_SHEETS_KEY;

const sheetId = '1Ezdd8k-pDlVocd0NHUkGwZXcegfG-KTOraM_uZUsr6s';
const range = 'Brawly Split';


async function fetchData()
{
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${public_apiKey}`)
  .then(response => response.json())
  .then(data => {
    console.log(data.values);
  });
}

fetchData();