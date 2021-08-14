import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { MdDelete } from "react-icons/md";



export default function Library() {
    const [library,setLibrary]= useState([])
    const[,setError]=useState('')
    const[book,setBook] = useState({
        id:"",
        adi:"", 
        basim:"", 
        yazar:""
    });
    const[updatedBook,setUpdatedBook]= useState({
        adi:"",
        basim:"", 
        yazar:""
    });


    useEffect(()=>{
        axios.get('http://localhost:3000/librarys')
        .then(response=>{
            setLibrary(response.data)
            setError('')
        })
        .catch(error=>{
            setError('Hata')
        })
    },[])


    
    const handleAdd = (e) => {
        setLibrary([...library,book])

        axios.post('http://localhost:3000/librarys',book)
        .then(response=>{
            setLibrary([...library,response.data])
  
            setError('')
        })
        .catch(error=>{
            setError('Hata')
        })
        console.log(book.id);
    }







    const onDeleteBook = (book,id) => {
        axios.delete(`http://localhost:3000/librarys/${book.id}`)
        .then(response=>{
            var array = [...library];
            var index = array.indexOf(book)
            array.splice(index, 1);
            setLibrary(array);
        })

    }



    const onSave = (id) => {
        axios.put(`http://localhost:3000/librarys/${id}`, updatedBook)
        .then((response)=>{
            window.location.reload();
        })


    }
    
    
    
    return (
        <div> 
            <h4> Books I Read</h4>
            <div className="booksInput">
                <input type="text" 
                placeholder="Kitap Adı" 
                name="kitapadi"
                value={book.adi}
                onChange={(e)=>{setBook({...updatedBook,adi:e.target.value})}}/>

                <input type="text" 
                placeholder="Basım Tarihi" 
                name="basim"
                value={book.basim}
                onChange={(e)=>{setBook({...updatedBook,basim:e.target.value})}}/>

                <input type="text" 
                placeholder="Yazar" 
                name="yazar"
                value={book.yazar}
                onChange={(e)=>{setBook({...updatedBook,yazar:e.target.value})}}/>
                <i class="fas fa-trash-alt"></i>

                <button onClick={handleAdd}>Ekle</button>
            </div>

            <div className="books">
                {
                    library.map((book,index)=>{
                        return(
                            <div className="booksCard" key={book.id}>
                                <div className="booksFlex">
                                    <h1>Kitap Adı:</h1> 
                                    <input
                                    name="book"
                                    defaultValue={book.adi}
                                    onChange={(e) => setUpdatedBook(e,book.id,index)}
                                    />
                                </div>

                                <div className="booksFlex">
                                    <h3>Basım Tarihi:</h3>
                                    <input
                                    name="basim"
                                    defaultValue={book.basim}
                                    onChange={(e) =>setUpdatedBook(e,book.id,index)}
                                    />
                                </div>
                                
                                <div className="booksFlex">
                                    <h3>Yazar:</h3>
                                    <input
                                    name="yazar"
                                    defaultValue={book.yazar}
                                    onChange={(e) =>setUpdatedBook(e,book.id,index)}
                                    />
                                </div>
                                <button onClick={()=> onSave(book.id)}>Save</button>
                                <MdDelete onClick={()=>onDeleteBook(book,book.id)} className="MdDelete"/>
                            </div>
                        )
                        
                    })
                }
            </div>
        </div>

        
    )
}
