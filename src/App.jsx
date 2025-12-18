import { useState,useEffect } from 'react'
import './mystyle.css'
import SongElement from './SongElement';
import fetchData from './get_song_google_sheets';

function App() 
{
  function handle_data()
  {
      console.log("Sorting with "+sort_column+" "+sort_direction);
      let sorted_data=[...song_dictionaries];
      if(sort_direction=="DESC")
      {
        if (Number.isNaN(sorted_data[0][sort_column])) 
        {
          sorted_data=sorted_data.sort((a,b) => b[sort_column].localeCompare(a[sort_column]));
        }
        else
        {
          sorted_data=sorted_data.sort((a,b) => b[sort_column]-a[sort_column]);
        }
      }
      else
      {
        if (Number.isNaN(sorted_data[0][sort_column])) 
        {
          sorted_data=sorted_data.sort((a,b) => a[sort_column].localeCompare(b[sort_column]));
        }
        else
        {
          sorted_data=sorted_data.sort((a,b) => a[sort_column]-b[sort_column]);
        }
      }
      /*const listItems = people.map(person => <li>{person}</li>);*/
      console.log(sorted_data);
      let song_elements=sorted_data.map(song => <SongElement key={song.ID} song={song}></SongElement>);
      setSong_Elements_Mapped(song_elements);
  }
  function update_sort(column,direction)
  {
    setSort_Column(column)
    setSort_Direction(direction);
    
    console.log(column+","+direction);
  }

  /*Target file name*/
  const file_name='Unique Potential Demo Songs.xlsx';
  /*Columns that will be used to sort data*/
  const columns=["ID","Rank","Name","Seconds"];
  const columns_mapped_head=columns.map(column =><th key={column}>{column}</th>);
  const columns_mapped_body=columns.map(column=>
    <td key={column}>
    <button onClick={() => update_sort(column,"ASC")}>ASC</button>
    <button onClick={() => update_sort(column,"DESC")}>DESC</button>
    </td>
  );

  const [ song_elements_mapped, setSong_Elements_Mapped ] = useState();

  //Create Buttons that let you sort by song data column
  const [ sort_direction, setSort_Direction ] = useState(null);
  const [ sort_column, setSort_Column ] = useState(null);

  const [song_dictionaries,setSongDictionaries]=useState(null);

  useEffect(() => {
    console.log("Effect Activated");
    if(song_dictionaries!=null)
    {
      handle_data();
    }
  }, [song_dictionaries,sort_column,sort_direction]); // <- this runs every time `data` changes

  useEffect(() =>{
    console.log("Fetching Google Sheets Data");
    fetchData(file_name)
    .then(setSongDictionaries)
  },[]);


  if(!song_dictionaries)
  {
    return (
      <>
          <div>
              <h1>Unique Potential Demo Song Data</h1>
              <h2>Loading...</h2>
            </div>
      </>
    );
  }

  return (
    <>
        <div>
        <h1>Unique Potential Demo Song Data</h1>
        <table>
            <thead>
            <tr>
            {columns_mapped_head}
            </tr>
            </thead>
            <tbody>
            <tr>
            {columns_mapped_body}
            </tr>
            </tbody>
            </table>
            <div>{ song_elements_mapped }</div>
        </div>
    </>
  );
}

export default App;