const express =require("express");
const BodyParser = require("body-parser");

// Database
const database =require("./database.js");
const { get } = require("http");



// Intilialise
const booky = express();
booky.use(express.json());


booky.use(BodyParser.urlencoded({extended: true}));
booky.use(BodyParser.json());


/*
Route              /
Description       Get all the books
Access              Public
Parameter          None
Methods            Get
*/


booky.get("/",(req,res)=>{
    return res.json({books: database.books});
});


/*
Route              /is
Description       Get specific book on isbn
Access              Public
Parameter          isbn
Methods            Get
*/

booky.get("/is/:isbn",(req,res)=>{
    const getSpecificBook =database.books.filter((book)=>book.ISBN === req.params.isbn);
    
    if(getSpecificBook.length === 0) {
        return res.json({error:`No book found for the ISBIN of ${req.params.isbn}`})
    }
    else
    return res.json({book:getSpecificBook});
});

/*
Route              /c
Description       Get specific book based on category
Access              Public
Parameter          category
Methods            Get
*/

booky.get("/c/:category",(req,res)=>{
    const getSpecificBook = database.books.filter((book)=>book.category.includes(req.params.category));
    
    if(getSpecificBook.length === 0)
    return res.json({error:`No Book found for the category of ${req.params.category}`});
    else
    return res.json({book:getSpecificBook});
})

/*
Route              /l
Description       Get specific book based on language
Access              Public
Parameter          language
Methods            Get
*/


booky.get("/l/:language",(req,res)=>{
    const getSpecificBook = database.books.filter((book)=>book.language === req.params.language);
    if (getSpecificBook.length === 0)
    return res.json({error:`No book found for language on ${req.params.language}`});
    else
    return res.json({book:getSpecificBook});
})



/*
Route              /author
Description       Get all the authors
Access              Public
Parameter          None
Methods            Get
*/

booky.get("/author",(req,res)=>{
    
    return res.json({author: database.author});
});

/*
Route              /author
Description       Get specific authors
Access              Public
Parameter          id
Methods            Get
*/

booky.get("/author/:id",(req,res)=>{
    const getSpecificauthor = database.author.filter((author)=>author.id === parseInt(req.params.id));
    if(getSpecificauthor === 0)
    return res.json({error:`No author found on ${req.params.id}`});
    else
    return res.json({author:getSpecificauthor});
})
/*
Route              /author/book
Description       Get specific authors
Access              Public
Parameter          isbn
Methods            Get
*/


booky.get("/author/book/:isbn",(req,res)=>{
    const getSpecificauthor = database.author.filter((author)=>author.books.includes(req.params.isbn) );
    if (getSpecificauthor.length === 0)
    return res.json({error:`No author found on ${req.params.isbn}`})
    else
    return res.json({author:getSpecificauthor});
})

/*
Route              /publication
Description       Get all the  publications
Access              Public
Parameter          none
Methods            Get
*/


booky.get("/publication",(req,res)=>{
    return res.json({publication:database.publication});
})

/*
Route              /publication
Description       Get specific publication
Access              Public
Parameter          id
Methods            Get
*/

booky.get("/publication/:id",(req,res)=>{
    const getSpecificPublication = database.publication.filter((pub)=>pub.id === parseInt(req.params.id));
    if(getSpecificPublication.length === 0)
    return res.json({error:`No publication found on ${req.params.id}`});
    else
    return res.json ({publication:getSpecificPublication});
})

/*
Route              /book/new
Description        Add new book
Access              Public
Parameter          none
Methods            post
*/
booky.post("/book/new",(req,res)=>{
   
    const newBook = req.body;
    database.books.push(newBook);
    return res.json({updatedBooks:database.books});


})


/*
Route              /author/new
Description        Add new author
Access              Public
Parameter          none
Methods            post
*/

booky.post("/author/new",(req,res)=>{
    const newauthor = req.body;
    database.author.push(newauthor);
    return res.json({updatedAuthor:database.author});
});

/*
Route              /publication/new
Description        Add new publication
Access              Public
Parameter          none
Methods            post
*/





booky.post("/publication/new",(req,res)=>{
    const newpublication = req.body;
    database.publication.push(newpublication);
    return res.json({updatedPublication:database.publication});
});


/*****************PUT********************/

/*
Route              /publication/udate/book
Description        update and Add new publication
Access             Public
Parameter          isbn
Methods            pust
*/



booky.put("/publication/update/book/:isbn",(req,res)=>{
    //Update the publication database
    database.publication.forEach((pub)=>{
        if(pub.id === req.body.pubId){
            return pub.books.push(req.params.isbn);
        }
    });
    
    //update the book database
    database.books.forEach((book)=>{
        if(book.ISBN=== req.params.isbn){
            return book.publication.push(req.body.pubId);
            
        }
    });
    return res.json({
        books:database.books,
        publication:database.publication,
        message:"Successfully Updated database"
    })
    
})

/*****************DELETE********************/

/*
Route             /book/delete/:isbn
Description        delete book
Access             Public
Parameter          isbn
Methods            delete
*/



booky.delete("/book/delete/:isbn",(req,res)=>{
    // Whichever book doesnot match with ISBN ,just send it to database array
    // and rest will be filtered out
 const updatedBookDatabase = database.books.filter((book)=> book.ISBN !== req.params.isbn);
//  database.books =updatedBookDatabase;
 return res.json({book:updatedBookDatabase});
});



/*
Route             /author/delete/:id
Description        delete author
Access             Public
Parameter          id
Methods            delete
*/

booky.delete("/author/delete/:id",(req,res)=>{
    const updatedAuthor = database.author.filter((aut)=>aut.id !== parseInt(req.params.id));
    return res.json({book:updatedAuthor});
})

/*
Route             /book/delete/author/:isbn/:authorId
Description        delete author
Access             Public
Parameter          isbn and authorId
Methods            delete
*/
booky.delete("/book/delete/author/:isbn/:authorId",(req,res)=>{
    // update the book database
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
            const newAuthor = book.author.filter(
                (eachAuthor)=> eachAuthor !== parseInt(req.params.authorId)
                );
                book.author = newAuthor;
                return;
            }
    });



    //Update the author database


    database.author.forEach((eachAuthor)=>{
        if(eachAuthor.id === parseInt(eachAuthor.authorId)){
            const newBook = eachAuthor.books.filter(
                (book)=> book !== req.params.isbn
                );

               eachAuthor.books = newBook ; 
               return;
        }

        
    });
    
    
    return res.json({
       book:database.books,
       author:database.author,
       message: "Author was deleted!!!"
    });

});







 

booky.listen(3000,()=>{
    console.log( " server run on port 3000");
});