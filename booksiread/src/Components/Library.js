import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { MdDelete } from "react-icons/md";
export default function Library() {
    const [library,setLibrary]= useState([])
    const[error,setError]=useState('')
    const[book,setBook] = useState({
        id:"",
        adi:"", 
        basim:"", 
        yazar:""
    })



    useEffect(()=>{
        axios.get('http://localhost:3000/library')
        .then(response=>{
            setLibrary(response.data)
            setError('')
        })
        .catch(error=>{
            setLibrary({})
            setError('Hata')
        })
    },[])


    
    const handleAdd = (e) => {
        setLibrary([...library,book])

        axios.post('http://localhost:3000/library',book)
        .then(response=>{
            setLibrary([...library,response.data])
  
            setError('')
        })
        .catch(error=>{
            setLibrary({})
            setError('Hata')
        })
    }

    const onDelete = () =>{
        
    }
    
    

    return (
        <div> 
            <h4> Books I Read</h4>
            <div className="booksInput">
                <input type="text" 
                placeholder="Kitap Adı" 
                name="kitapadi"
                value={book.adi}
                onChange={(e)=>{setBook({...book,adi:e.target.value})}}/>

                <input type="text" 
                placeholder="Basım Tarihi" 
                name="basim"
                value={book.basim}
                onChange={(e)=>{setBook({...book,basim:e.target.value})}}/>

                <input type="text" 
                placeholder="Yazar" 
                name="yazar"
                value={book.yazar}
                onChange={(e)=>{setBook({...book,yazar:e.target.value})}}/>
                <i class="fas fa-trash-alt"></i>

                <button onClick={handleAdd}>Ekle</button>
            </div>

            <div className="books">
                {
                    library.map((book,index)=>{
                        return(
                            <div className="booksCard" >
                                <h1>{index+1}. Kitap: {book.adi}</h1>
                                <h3>Basım Tarihi: {book.basim}</h3>
                                <h3>Yazar: {book.yazar}</h3>
                                <MdDelete onClick={onDelete()} className="MdDelete"/>
                            </div>
                        )
                        
                    })
                }
            </div>
        </div>

        
    )
}
