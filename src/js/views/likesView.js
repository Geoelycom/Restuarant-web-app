import {
  elements
} from "./base";

import { limitRecipeTitle } from './searchView';

export const toggleLikeButton = isLiked => {
  const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
  document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
};


export const toggleLikeMenu = numLikes => {
  elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};


export const RenderlikesMenuView = likes => {
const markUp = `
<li>
    <a class="likes__link" href="#${likes.id}">
        <figure class="likes__fig">
          <img src="${likes.image_url}" alt="${likes.title}">
        </figure>
        <div class="likes__data">
          <h4 class="likes__name">${limitRecipeTitle(likes.title)}</h4>
          <p class="likes__author">${likes.publisher}</p>
       </div>
     </a>
</li>

`;

elements.likesList.insertAdjacentHTML('beforeend', markUp);
};


export const deleteLike = id => {
const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
if (el)
el.parentElement.removeChild(el);
};