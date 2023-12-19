
const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
                '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.path+'">'+
                '</div><div class="card-content">'+
                '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#"></a></p></div>'+
                '<div class="card-reveal">'+
                '<span class="card-title grey-text text-darken-4">'+item.subTitle+'<i class="material-icons right">close</i></span>'+
                '<p class="card-text">'+item.description+'</p>'+
                '</div></div></div>';
        $("#card-section").append(itemToAppend)
    });
}

const formSubmitted = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.subTitle = $('#subTitle').val();
    formData.path = $('#path').val();
    formData.description = $('#description').val();

    
    formData.businessname = $('#businessname').val();
    formData.businesssuburb = $('#businesssuburb').val();
    formData.businessstate = $('#businessstate').val();
    formData.path = $('#path').val();
    formData.chargertypes = $('#chargertypes').val();
    formData.additionalservices = $('#additionalservices').val();
    formData.localityamenities = $('#localityamenities').val();


    console.log(formData);
    postCat(formData);
}

function postCat(cat){
    $.ajax({
        url:'/api/cat',
        type:'POST',
        data:cat,
        success: (result)=>{
            if (result.statusCode === 201) {
                alert('cat post successful');
            }
        }
    });
}

//function getAllCats(){
//    $.get('/api/cats', (response)=>{
        // response's data is in array format, so we can use it
//        if (response.statusCode === 200) {
//            addCards(response.data);
//       }
//    });
//}

function getAllCats() {
    $.ajax({
      url: '/api/cats',
      method: 'GET',
      success: function (response) {
        // response.data is still available for processing
        if (response.status === 200) {
          addCards(response.data);
        } else {
          // Handle unsuccessful responses here
          console.error("Error fetching cats:", response.status);
        }
      },
      error: function (error) {
        // Handle any errors during the request
        console.error("Error:", error);
      },
    });
  }



$(document).ready(function(){
    $('.sidenav').sidenav();
    $('.parallax').parallax();
    $('.modal').modal();
    $('.carousel').carousel();
    $('.materialboxed').materialbox();
    $('#formSubmit').click(()=>{
        formSubmitted();
    });
    $('.modal').modal();
    getAllCats();
});