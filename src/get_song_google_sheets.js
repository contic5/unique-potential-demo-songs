/*THIS KEY IS ONLY FOR ACCESSING PUBLIC GOOGLE FILES*/

//I can access read only files and files I can edit. I would need a full backend to securely store the key.
const public_apiKey =import.meta.env.VITE_GOOGLE_SHEETS_KEY;
console.log(public_apiKey);

const sheetId = '10e63cDwVSWvdwLs1M-gyw_Nic9XPDHYRiW1lJGBQIdc';
const range = 'Data';

function convert_to_dictionaries(rows)
{
    let dictionaries=[];
    let keys=[];
    for(let value of rows[0])
    {
        keys.push(value);
    }
    for(let i=1;i<rows.length;i++)
    {
        let dictionary={};
        for(let j=0;j<rows[i].length;j++)
        {
            const value=rows[i][j];
            if(Number.isFinite(value))
            {
                dictionary[keys[j]]=parseInt(rows[i][j]);
            }
            else
            {
                dictionary[keys[j]]=rows[i][j];
            }
        }
        dictionaries.push(dictionary);
    }
    return dictionaries;
}
export async function fetchData()
{
    if(public_apiKey==null||!public_apiKey)
    {
        return null;
    }
    const response=await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${public_apiKey}`)
    const data=await response.json()
    const rows=await data.values;
    const dictionaries=convert_to_dictionaries(rows);
    return dictionaries;
}

export default fetchData;