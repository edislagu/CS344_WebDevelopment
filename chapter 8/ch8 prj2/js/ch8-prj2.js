// first transform JSON data into javascript array
const photos = photoData;
// now loop thru this array and output cards for each photo.
for (let p of photos) {
   outputCard(p);
}

function outputCard(photo) {
   document.write('<article>');
   document.write(`<img src="images/${photo.filename}" alt="${photo.title}" />`);
   document.write('<div class="caption">');
   document.write(`<h2>${photo.title}</h2>`);
   document.write(`<p>${photo.location.city}, ${photo.location.country}</p>`)
   outputColors(photo.colors);
   document.write('</div>');
   document.write('</article>');


   function outputColors(colors) {
      document.write('<h3>Colors</h3>');
      for (let c of colors) {
         document.write(constructColor(c));
      }  
   }

   function constructColor(color) {
      let style = constructStyle(color);
      let tag = `<span style="${style}">${color.name}</span>`;
      return tag;
   }

   function constructStyle(color) {
      let spanStyle = `background-color: ${color.hex}; `;
      if (color.luminance < 70)
      spanStyle += 'color: white; ';
      return spanStyle;
   }

}