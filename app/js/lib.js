function readyFn( jQuery ) {
  $("button").click(function(){

    var images = localStorage.getItem('imageData')

    // if images are not saved on cache yet, i fetch them
    if(!images){
      $.ajax({
        method: "POST",
        url: "http://localhost/gig/ajax/ajax.php",
        data: { action: "get_data" }
      })
        .done(success)
        .fail(error)
    }else {
      // else i call success and create the DOM images
      success(images)
    }
  })

  function success( images ) {
    // parse json object
    var imagesParsed = JSON.parse(images)
    // save imageDate to localStorage
    localStorage.setItem('imageData',JSON.stringify(imagesParsed))

    //get the row element
    var row = document.getElementById('row')

    // clean the row 
    cleanColumn(row)

    //create the DOM elements with the images
    for(var i=0; i<= imagesParsed.length-1; i++){
      //get the keys
      var imgKey = Object.keys(imagesParsed[i])

      // create new column element & add seleb attr. & add class
      var colElement = document.createElement('div')
      colElement.className = 'column'
      colElement.setAttribute('seleb', imgKey)

      // create new image element & add class
      var imgElement = document.createElement('img')
      imgElement.setAttribute('number', i+1)
      imgElement.setAttribute('idx',i)
      imgElement.src = '../images/'+imagesParsed[i][imgKey]

      // append image to column
      colElement.appendChild(imgElement)

      //append column to the row
      row.appendChild(colElement);
    }
  }

  function error( jqXHR, textStatus ) {
    alert( "Request failed: " + textStatus );
  }

  function cleanColumn(rowNode){
    while (rowNode.firstChild) {
      rowNode.removeChild(rowNode.firstChild);
    }
  }

  $('#celebreties').change(function(ev){
    var selectedValue = ev.target.value
    var columns = document.querySelectorAll('.gallery .column')
    //call updateSelectedImage to update the border to the seleted image 
    updateSelectedImage(columns,selectedValue)
  })

  $(document).on ("click", "img", function (ev) {
    var selectedImage = ev.target
    // get images index.
    var idx = Number(ev.target.getAttribute('idx'))
    //reset image's number to 1.
    selectedImage.setAttribute('number',1)

    var columnAttr = selectedImage.parentElement.getAttribute('seleb')
    var columns = document.querySelectorAll('.gallery .column')

    //call updateSelectedImage to update the border to the selected image 
    updateSelectedImage(columns,columnAttr)

    var nextIdx = idx
    //update images Numbering
    for(var i=2;i<=4;i++){
      nextIdx += 1
      
      $( "img[idx="+(nextIdx%4)+"]").attr("number",i)
    }
  });

  /* loops through columns elements and:
    1. cleans .selected
    2. add .selected on the selected (either from <select> or from image click) image
  */
  function updateSelectedImage(columns,selectedValue){
    columns.forEach(function(column) {
      var attr = column.getAttribute('seleb')
      console.log(attr)
      if(attr == selectedValue){
        // add .selected on the image
        column.firstChild.classList.add('selected')
      }else {
        // remove .selected from image
        column.firstChild.classList.remove('selected')
      }
    });
  }
}

$( document ).ready( readyFn );
