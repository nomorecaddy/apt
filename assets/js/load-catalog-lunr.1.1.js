


var catalog = [{
  "title": "STC",
  "link": "#",
  "category": "library",
  "excerpt": "Provides basic traffic quickcalls for the STC Tcl API session type and response maps for result and statistics views. Tested with STC FW version 4.75.",
  "class": "Tested by Spirent"
},{
  "title": "CloudStress",
  "link": "#",
  "category": "automation",
  "excerpt": "Example CloudStress test cases including goal-seeking, fixed, and mixed profile test scenarios.",
  "class": "Reference"
},{
  "title": "Cisco IOS",
  "link": "#",
  "category": "library",
  "excerpt": "Cisco IOS Quickcalls and response maps for Cisco routers.",
  "class": "Reference"    
},{
  "title": "Cisco ASR5K",
  "link": "#",
  "category": "library",
  "excerpt": "Quickcalls and response maps for Cisco ASR5K.",
  "class": "Community"    
},{
  "title": "Cisco Nexus",
  "link": "#",
  "category": "library",
  "excerpt": "Cisco Nexus QuickCalls and response maps for NXOS systems. Routing QuickCalls and response maps are included.",
  "class": "Community"    
},{
  "title": "Velocity",
  "link": "#",
  "category": "framework",
  "excerpt": "REST API QuickCalls for inventory, reservation, and user management in Velocity.",
  "class": "Community"
}]

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
                    '    <img src="'+categoryAttribute[catalog[ref].category].image+'" alt="Image" class="img-responsive">'+                     
                    '</div>'+  
                    
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
                            '<a href="#"><i class="fa fa-cloud-download fa-2x"></i></a>'+  
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

    
