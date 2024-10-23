import { library } from '@fortawesome/fontawesome-svg-core';
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as fasBookmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(farBookmark, fasBookmark, faMagnifyingGlass);

export { FontAwesomeIcon };