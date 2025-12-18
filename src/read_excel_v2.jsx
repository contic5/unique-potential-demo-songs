/*
USAGE

Call await get_data with the target filename.

EXAMPLE 
Add this in parent file (App.jsx)

const [boss_dictionaries,setBossDictionaries]=useState([]);

useEffect(() =>{
    console.log("Fetching Excel Data");
    fetch_data('Video Game Bosses.xlsx')
    .then(setBossDictionaries)
},[]);
*/

import readXlsxFile from 'read-excel-file';

export async function handle_data(data)
{
    let dictionaries=[];

    for(let i=1;i<data.length;i++)
    {
        let dictionary={};
        for(let j=0;j<data[0].length;j++)
        {
            const key=data[0][j];
            dictionary[key]=data[i][j];
        }
        dictionaries.push(dictionary);
    }
    console.log(dictionaries);
    return dictionaries;
}
export async function fetch_data(target_file)
{
    console.log("Awaiting");
    const dictionaries=await fetch('/'+target_file)
    .then(response => response.blob())
    .then(blob => readXlsxFile(blob,{sheet:"Data"}))
    .then(async(rows) => {
      // `rows` is an array of rows
      // each row being an array of cells
      console.log("Await done");
      const data_inner= await handle_data(rows);
      console.log("Dictionary");
      console.log(data_inner);
      return data_inner;
    })
    return dictionaries;
}

export default fetch_data;