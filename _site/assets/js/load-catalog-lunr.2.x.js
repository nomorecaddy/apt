// builds lunr
var index = lunr(function () {
  this.ref('id')
  this.field('title')
  this.field('content')
  this.field('category')
  this.field('class')  

  this.add({
  title: "STC",
  category: "Library",
  content: "Provides basic traffic quickcalls for the STC Tcl API session type and response maps for result and statistics views. Tested with STC FW version 4.75.",
  class: "certified",
  id: 0})

  this.add({
  title: "CloudStress",
  category: "Automation",
  content: "Example CloudStress test cases including goal-seeking, fixed, and mixed profile test scenarios.",
  class: "reference",
  id: 1})

  this.add({
  title: "Velocity",
  category: "Framework",
  content: "REST API QuickCalls for inventory, reservation, and user management in Velocity.",
  class: "community",
  id: 2})
});

console.log( jQuery.type(index) );

// builds reference data
var store = [{
  "title": "STC",
  "link": "#",
  "image": "assets/images/image1.jpg",
  "date": "January 16, 2018",
  "category": "Library",
  "excerpt": "Provides basic traffic quickcalls for the STC Tcl API session type and response maps for result and statistics views. Tested with STC FW version 4.75."
},{
  "title": "CloudStress",
  "link": "#",
  "image": "assets/images/image2.jpg",
  "date": "January 6, 2018",
  "category": "Automation",
  "excerpt": "Example CloudStress test cases including goal-seeking, fixed, and mixed profile test scenarios."
},{
  "title": "Velocity",
  "link": "#",
  "image": "assets/images/image3.jpg",
  "date": "December 29, 2017",
  "category": "Framework",
  "excerpt": "REST API QuickCalls for inventory, reservation, and user management in Velocity."
}]
// builds search
$(document).ready(function() {
  $('input#search').on('keyup', function () {
    var resultdiv = $('#results');
    // Get query
    var query = $(this).val();
    // Search for it
    var result = index.search(query);
    // Show results
    resultdiv.empty();
    // Add status
    resultdiv.prepend('<p class="">Found '+result.length+' result(s)</p>');
    // Loop through, match, and add results
    for (var item in result) {
      var ref = result[item].ref;
      var searchitem = '<div class="result"><img src="'+store[ref].image+'" alt="'+store[ref].title+'" class="result-img"><div class="result-body"><a href="'+store[ref].link+'" class="post-title">'+store[ref].title+'</a><div class="post-date small">'+store[ref].category+' &times; '+store[ref].date+'</div><p>'+store[ref].excerpt+'</p></div>';
      resultdiv.append(searchitem);
    }
  });
});
