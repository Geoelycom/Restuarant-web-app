export default class Likes {
  constructor(){
    this.likes = [];
  }

  addLike(id, title, publisher, image_url){
    const like = {id, title, publisher, image_url};
    this.likes.push(like);
    //persist like data in local storage
    this.persistData();
    return like;
    
  }

  deleteLike(id){
    const index = this.likes.findIndex(el => el.id === id);
    this.likes.splice(index, 1);
    this.persistData();
    //persist like data in local storage

  }

  isLiked(id){
    return this.likes.findIndex(el => el.id === id) !== -1;
  }
getNumLikes(){
  return this.likes.length;
}

persistData(){
  localStorage.setItem('likes', JSON.stringify(this.likes));
}
getLikesFromStorage(){
  const storageItem = JSON.parse(localStorage.getItem('likes'));
  //retore lIKES if Likes is in the storage
  if (storageItem)
  this.likes = storageItem;
}
}