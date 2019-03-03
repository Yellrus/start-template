import $ from 'jquery';

// Enable inline svg in IE 11
import svg4everybody from 'svg4everybody';
// Enable picture in IE 11
import pictureFill from 'picturefill';
// Enable object-fit in IE 11
import objectFitImages from 'object-fit-images';

svg4everybody();
pictureFill();
objectFitImages();

$(document).ready(() => {
    console.log('Привет'); // eslint-disable-line no-console
});
