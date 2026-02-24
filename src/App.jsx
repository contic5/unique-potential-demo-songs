import { useState,useEffect } from 'react'
import './App.css'
import SongElement from './SongElement';
import fetchData from './get_song_google_sheets';
import ColumnHandler from './ColumnHandler';

function App() 
{
  function handle_data()
  {
      console.log("Sorting with "+sort_column+" "+sort_direction);
      let song_data=[...song_dictionaries];
      if(sort_direction=="DESC")
      {
        if (Number.isNaN(song_data[0][sort_column])) 
        {
          song_data=song_data.sort((a,b) => b[sort_column].localeCompare(a[sort_column]));
        }
        else
        {
          song_data=song_data.sort((a,b) => b[sort_column]-a[sort_column]);
        }
      }
      else
      {
        if (Number.isNaN(song_data[0][sort_column])) 
        {
          song_data=song_data.sort((a,b) => a[sort_column].localeCompare(b[sort_column]));
        }
        else
        {
          song_data=song_data.sort((a,b) => a[sort_column]-b[sort_column]);
        }
      }
      /*const listItems = people.map(person => <li>{person}</li>);*/
      const page_song_data=song_data.slice((page-1)*10,page*10);
      console.log(page_song_data);
      let song_elements=page_song_data.map(song => <SongElement key={song.ID} song={song}></SongElement>);
      setSong_Elements_Mapped(song_elements);
  }
  function switch_page()
  {
    const song_data=[...song_dictionaries];
    const page_song_data=song_data.slice((page-1)*10,page*10);
    console.log(page_song_data);
    let song_elements=page_song_data.map(song => <SongElement key={song.ID} song={song}></SongElement>);
    setSong_Elements_Mapped(song_elements);
  }
  function update_sort(column,direction)
  {
    setSort_Column(column)
    setSort_Direction(direction);
    
    console.log(column+","+direction);
  }
  function handlePage(e)
  {
    setPage(parseInt(e.target.value));
  }
  function get_unique_values(song_dictionaries_temp)
  {
    let unique_values_arr=[];
    for(const column of columns)
    {
        let unique_values={};
        for(const song_dictionary of song_dictionaries_temp)
        {
          unique_values[song_dictionary[column]]=true;
        }
        unique_values_arr.push(Object.values(unique_values));
    }
    return unique_values_arr;
  }

  /*Target file is in Google Sheets*/
  /*Columns that will be used to sort data*/
  const columns=["ID","Rank","Name","Seconds"];
  const column_names_mapped=columns.map(column=><th key={column}>{column}</th>)

  const [column_handlers,setColumnHandlers]=useState(null);
  
  /*
  const columns_mapped_head=columns.map(column =><th key={column}>{column}</th>);
  const columns_mapped_body=columns.map(column=>
    <td key={column}>
    <button onClick={() => update_sort(column,"ASC")}>ASC</button>
    <button onClick={() => update_sort(column,"DESC")}>DESC</button>
    </td>
  );
  */

  const [ song_elements_mapped, setSong_Elements_Mapped ] = useState();

  //Create Buttons that let you sort by song data column
  const [ sort_direction, setSort_Direction ] = useState(null);
  const [ sort_column, setSort_Column ] = useState(null);

  const [song_dictionaries,setSongDictionaries]=useState(null);

  const [page,setPage]=useState(1);

  useEffect(() => {
    console.log("Effect Activated");
    if(song_dictionaries!=null)
    {
      handle_data();
    }
  }, [song_dictionaries,sort_column,sort_direction]); // <- this runs every time `data` changes

  useEffect(()=>{
    if(song_dictionaries!=null)
    {
      switch_page();
    }
  },[page])

  useEffect(() =>{
    async function get_data()
    {
      console.log("Fetching Google Sheets Data");
      const song_dictionaries_temp=await fetchData()
      setSongDictionaries(song_dictionaries_temp);

      const unique_values_arr=get_unique_values(song_dictionaries_temp);
      const column_handlers_temp=columns.map((column,index)=><ColumnHandler key={column}  unique_values={unique_values_arr[index]} column={column} update_sort={update_sort}></ColumnHandler>);
  setColumnHandlers(column_handlers_temp);
    }
    get_data();
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
        <h1>Unique Potential Demo Song Data</h1>
        <div className="block">
        <label htmlFor="page_top">Page</label>
        <input className="page" id="page_top" value={page} onChange={handlePage} type="number" min={1}></input>
        </div>

        <table>
        <thead>
        <tr>
        {column_names_mapped}
        </tr>
        </thead>
        <tbody>
        <tr>
        {column_handlers}
        </tr>
        </tbody>
        </table>
        <div className="block">{ song_elements_mapped }</div>
        <div className="block">
        <label htmlFor="page_bottom">Page</label>
        <input className="page" id="page_bottom" value={page} onChange={handlePage} type="number" min={1}></input>
        </div>
    </>
  );
}

export default App;