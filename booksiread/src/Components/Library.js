import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { MdDelete} from "react-icons/md";
import { FaSave} from "react-icons/fa";
import { AiTwotoneEdit} from "react-icons/ai";



export default function Library() {
    const [library,setLibrary]= useState([])
    const[,setError]=useState('')
    const[book,setBook] = useState({
        id:"",
        adi:"", 
        basim:"", 
        yazar:"",
    });
    const[updatedBook,setUpdatedBook]= useState({
        adi:"",
        basim:"", 
        yazar:""
    });
    const[visible,setVisible]= useState({
        isVisible : true,
        disabled: true,
    })


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
        .catch(setError=>{
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
        .catch(setError=>{
            setError('Hata')
        })
    }



    const onSave = (id) => {
        axios.put(`http://localhost:3000/librarys/${id}`, updatedBook)
        .then((response)=>{
            setVisible({
                isVisible: !visible.isVisible
            })
        })
        .catch(setError=>{
            setError('Hata')
        })
    }

    var change = () => {
        setVisible({
            isVisible: !visible.isVisible
        })
    }
    
    
    const isVisible = visible.isVisible;
    
    return (
        <div> 
            <h4> Books I Read</h4>
            <div className="booksInput">
                <input type="text" 
                placeholder="Kitap Ad??" 
                name="kitapadi"
                value={book.adi}
                onChange={(e)=>{setBook({...book,adi:e.target.value})}}/>

                <input type="text" 
                placeholder="Bas??m Tarihi" 
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
                            <div className="booksCard" key={book.id}>
                                    <div className="contentFlex">
                                        <div className="booksFlex">
                                            <h1>Kitap Ad??:</h1> 
                                            <input
                                            name="book"
                                            defaultValue={book.adi}
                                            disabled = {(visible.disabled)? "disabled" : ""}
                                            onChange={(e) => setUpdatedBook({...updatedBook, ...book,adi: e.target.value})}
                                            />
                                        </div>

                                        <div className="booksFlex">
                                            <h3>Bas??m Tarihi:</h3>
                                            <input
                                            name="basim"
                                            defaultValue={book.basim}
                                            disabled = {(visible.disabled)? "disabled" : ""}
                                            onChange={(e) =>setUpdatedBook({...updatedBook, ...book,basim: e.target.value})}
                                            />
                                        </div>
                                        
                                        <div className="booksFlex">
                                            <h3>Yazar:</h3>
                                            <input
                                            name="yazar"
                                            defaultValue={book.yazar}
                                            disabled = {(visible.disabled)? "disabled" : ""}
                                            onChange={(e) =>setUpdatedBook({...updatedBook, ...book, yazar: e.target.value})}
                                            />
                                        </div>
                                        <div className="buttonFlex">
                                            {
                                            isVisible ? 
                                            <AiTwotoneEdit onClick={()=>change()}className="AiTwotoneEdit"/>
                                            : <FaSave onClick={()=> onSave(book.id)} className="FaSave"/>
                                            }
                                            <MdDelete onClick={()=>onDeleteBook(book,book.id)} className="MdDelete"/>
                                            
                                        </div>
                                    </div>
                            </div>
                        )
                        
                    })
                }
            </div>
        </div>

        
    )
}
