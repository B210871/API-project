const books = [
    {
        ISBN:"12345book",
        title:"Tesla!!",
        pubDate:"2021-08-05",
        language:"en",
        numPage:250,
        author:[1,2],
        publication:[1],
        category:["tech","space","education"]
    }
]
const author =[
    {
        id:1,
        name:"Abhay",
        books:["12345book","secretBook"]
    }
,
    {
        id:2,
        name:"Akshay",
        books:["12345book"]
    }
]
const publication =[
    {
        id:1,
        name:"writex",
        books:["12345book"]
    },
    {
        id:2,
        name:"writex",
        books:[]
    },
    {
        id:4,
        name:"writex",
        books:[]
    }

]
module.exports = { books ,author ,publication };