const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0; 
let photosArray=[];

// unsplash API
const count = 30;
const apiKey = `qBqkKtss4ID7Gk6IOuOhx-AJ_ZTg_5s7nx7QOdcb1uY`;
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all images were loaded
function imageLoaded(){
    imagesLoaded ++;
    
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        console.log("ready is: ", ready);
       
    }
}

//Helper function to set Attributes on DOM Elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

//Create Elements for links and photos, add to DOM
function displayPhotos(){
    totalImages = photosArray.length;
    console.log("totalImages is: ", totalImages);
    //Run function for each object in photoArray
    photosArray.forEach((photo)=>{
        //Create <a> link to unsplash
        const item = document.createElement('a');
        //item.setAttribute('href', photo.links.html);
        //item.setAttribute('target', '_blank');
       setAttributes(item, {
            'href': photo.links.html,
            'target': '_blank',
        });
        //create <img> for photo
        const img = document.createElement('img');
        //img.setAttribute('src', photo.urls.regular);
        //img.setAttribute('alt', photo.alt_description);
        //img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            'src': photo.urls.regular,
            'alt': photo.alt_description,
            'title': photo.alt_description,
        });
        //event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        //put <img> inside <a>, and then put both of them inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
    
    
}

// get photos form unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        //console.log(photosArray);
        displayPhotos();
    }catch(error){
        console.log("error!", error);
    }
}

//check to see if scrolling to the bottom of the page, load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        imagesLoaded = 0;
        //console.log('window.innerHeight is: ', window.innerHeight);
        //console.log('window.scrollY is: ', window.scrollY);
        //console.log('window innerHeight+scrollY is: ', window.innerHeight+window.scrollY);
        //console.log('document.body.offsetHeight is: ', document.body.offsetHeight-1000);
        getPhotos();
        console.log('load more');
    }
    //console.log('scrolled');
});

// on load
getPhotos();