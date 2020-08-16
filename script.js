const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray=[];

// unsplash API
const count = 10;
const apiKey = `qBqkKtss4ID7Gk6IOuOhx-AJ_ZTg_5s7nx7QOdcb1uY`;
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Helper function to set Attributes on DOM Elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

//Create Elements for links and photos, add to DOM
function displayPhotos(){
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

// on load
getPhotos();