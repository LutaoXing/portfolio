
const model = {
    apiUrl : 'https://www.googleapis.com/books/v1/volumes', 
    keyword : 'javascript',
    currentBook: {},
    books: [],
    startIndex : 0,
    totalAvailableBooks : 0,
    hasMoreBook : true,
    itemPerPage : 10,
    nextStartIndex : function(){
        return model.startIndex + model.itemPerPage;
    }

}

const controller = {
    init: function () {
        this.retrieveBookFromAPI();
        bookView.init();
        bookListView.init();
        searchbookView.init();
    },
    retrieveBookFromAPI: function () {
        console.log(model.startIndex);
        fetch(`${model.apiUrl}?q=${model.keyword}&startIndex=${model.startIndex}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (books) {                
                model.books = model.books.concat(books.items);
                model.currentBook = books.items[0];

                if(books.totalItems < (model.nextStartIndex)){
                    model.hasMoreBook = false;                    
                }
                else{
                    model.startIndex = model.nextStartIndex();
                }

                bookListView.render();
                bookView.render();
                searchbookView.init();
            });
    },
    getBooks: function () {
        return model.books;
    },
    hasMoreBook : function(){
        return model.hasMoreBook;
    },
    getCurrentBook: function () {
        return model.currentBook;
    },
    setCurrentBook: function (book) {
        model.currentBook = book;
        bookView.render();
    },
    searchBook:function(keyword){
        model.keyword=keyword;
        model.startIndex=0;
        this.retrieveBookFromAPI();
    },
    clearBooks:function(){
        
    },
    loadMore : function(){
        if(model.hasMoreBook){
            this.retrieveBookFromAPI();
        }
        else{
            alert("no more book to load");
        }
        
    }

}

const bookListView = {
    init: function () {
        
        window.onscroll = function() {
            var d = document.documentElement;            
            var offset = parseInt(d.scrollTop + window.innerHeight) + 1;
            var height = d.offsetHeight;         
            console.log('offset = ' + offset);
            console.log('height = ' + height);          
            if (offset === height) {              
              controller.loadMore();
            }
          };
        

        this.bookListElem = document.getElementById('bookList');
        this.viewMoreBtn = document.getElementById('btnViewMore');
        this.viewMoreBtn.addEventListener('click',function(){
            controller.loadMore();
        });
    },
    render: function () {
        this.books = controller.getBooks();        
        this.books.forEach(function(book){            
            bookListView.bookListElem.appendChild(bookListView.buildBook(book));
        });        
    },
    buildBook : function(book){
        const bookDiv = document.createElement('div');
        console.log(book);
        bookDiv.classList.add('book');
        bookDiv.innerHTML = `
        <div class="content">
            <img src=${book.volumeInfo.imageLinks.smallThumbnail} alt="${book.volumeInfo.title}">
        </div>
        <div class="title">${book.volumeInfo.title}</div>
        `;
        bookDiv.addEventListener('click',function(){
            controller.setCurrentBook(book);
        });
        return bookDiv;
    }
}

const bookView = {
    init: function(){
        this.viewport = document.getElementById('viewerCanvas');
        google.books.load();
        google.books.setOnLoadCallback(function(){                        
            bookView.render();    
        });
        
    },
    render: function () {
        console.log(controller.getCurrentBook());       
        const viewer = new google.books.DefaultViewer(bookView.viewport);
        const currentBook = controller.getCurrentBook(); 
        viewer.load(currentBook.id);
    },

}
const searchbookView = {
    init: function(){
        this.textbox = document.getElementById('txtSearch');
       this.btnclick=document.getElementById('btnSearch');

       this.btnclick.addEventListener('click',function(){
           var bookname= searchbookView.textbox.value;
           console.log(bookname);
           controller.searchBook(bookname);
           bookListView.render();
       })   
    }

}


controller.init();
