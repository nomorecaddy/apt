



var categoryAttribute = { 
    library: {
        color: 'cagreen',
        image: 'assets/images/home-img-6.jpg'
    },
    automation: {
        color: 'cablue',
        image: 'assets/images/home-img-4.jpg'        
    },
    framework: {
        color: 'caorange',
        image: 'assets/images/home-img-5.jpg'        
    }
}


var index = lunr(function () {
  this.ref('id')
  this.field('title')
  this.field('content')
});

for (var i = 0; i < catalog.length; i++) { 
  index.add({
    title: catalog[i].title,    
    content: catalog[i].excerpt,    
    id: i
  });
}


$(document).ready(function() {
  var resultdiv = $('#results');
  var numdisplayeddiv = $('#numDisplayed');

  function updateCardCount() {
      if ( $('div.card').length == 1) {
          var subjectString = 'Project';
      }
      else {
          var subjectString = 'Projects';            
      }      
      numdisplayeddiv.html($('div.card').length+' '+subjectString+' Displayed')
  }
    
  function showFullCatalog() {
      // Clear results
      resultdiv.empty();
      for (var i = 0; i < catalog.length; i++) {
            if ( $('#categorySelection').val() == 'all' || $('#categorySelection').val() == catalog[i].category ) {
                if ( $('#classSelection').val() == 'all' || $('#classSelection').val() == catalog[i].class ) {
                    showSearchResults(i); 
                }
            }   
      }
      updateCardCount();
  }

  function showSearchResults(ref) {
      
      var searchitem = '<div class="box card '+categoryAttribute[catalog[ref].category].color+'">' + 
                    '<div class="box-icon">'+
                    '<div class="line"></div>'+  
                    '<div class="info float-container">'+  
                    '<div class="col-sm-12 caorange-title">'+  
                        '<h3 class="text-uppercase">'+catalog[ref].title+'</h3>'+  
                        '<h4 class="text-uppercase">'+catalog[ref].category+'</h4>'+  
                    '</div>'+  
                    '<div class=card-desc>'+      
                    '<p>'+catalog[ref].excerpt+'</p>'+  
                    '</div>'+  
                    '<hr />'+      
                    '<div class="col-sm-12 location-main">'+   
                        '<div class="pull-left location">'+  
                            '<i class="fa fa-2x"></i><span>'+catalog[ref].class+'</span>'+  
                        '</div>'+  
                        '<div class="pull-right user-icons">'+               
                            '<a href='+catalog[ref].hrefReadme+'><i class="fa fa-file-text fa-2x"></i></a>'+  
                            '<a href='+catalog[ref].link+'><i class="fa fa-cloud-download fa-2x"></i></a>'+  
                        '</div>'+  
                    '</div>'+  
                    '</div>'+  
                '</div>'
      
      resultdiv.append(searchitem);
  }
    
  function findNow() {
    // Get query
    var query = $('input#search').val();
    if (query) {
        // Search for it
        var result = index.search(query);
        // Clear results
        resultdiv.empty();
        // Add status
        // resultdiv.prepend('<p class="">Found '+result.length+' result(s)</p>');
        // Loop through, match, and add results
        for (var item in result) {
          var ref = result[item].ref;
          if ( $('#categorySelection').val() == 'all' || $('#categorySelection').val() == catalog[ref].category ) {
            if ( $('#classSelection').val() == 'all' || $('#classSelection').val() == catalog[ref].class ) {
                showSearchResults(ref); 
            }
          }          
        }
        updateCardCount();
    } else {
        showFullCatalog();        
    }
  }
  
  $('select#categorySelection').on('change', function () {
    findNow();
  });
    
  $('select#classSelection').on('change', function () {
    findNow();
  });    
    
  $('input#search').on('keyup', function () {
    findNow();
  });    
    
        
  showFullCatalog();      
});

    
