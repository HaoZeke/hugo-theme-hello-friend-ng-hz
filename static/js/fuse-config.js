// Kanged from: https://www.softwarecraftsperson.com/posts/2021-05-01-client-side-search-fuse/
summaryInclude = 80;
// https://fusejs.io/api/options.html
var fuseOptions = {
  shouldSort: true,
  includeMatches: true,
  includeScore: true,
  threshold: 0.6,
  useExtendedSearch: true,
  tokenize: true,
  matchAllTokens: false,
  location: 0,
  distance: 100,
  maxPatternLength: 64,
  minMatchCharLength: 1,
  keys: [
    { name: "title", weight: 0.8 },
    { name: "contents", weight: 5.6 },
    { name: "tags", weight: 0.4 },
    { name: "categories", weight: 0.3 }
  ]
};

var searchQuery = param("search-query");
if (searchQuery) {
  $("#search-query").val(searchQuery);
  executeSearch(searchQuery);
} else {
  $('#search-results').append("");
}

function executeSearch(searchQuery) {
  $.getJSON("/index.json", function (data) {
    var validResults = [];
    var pages = data;
    const fuse = new Fuse(pages, fuseOptions);
    var result = fuse.search(searchQuery);
    console.log(result);
    // Remove if score is less than 70
    for (var i=0, len=result.length; i<len; i++){
      if (result[i].score <= 0.7)
        validResults.push(result[i])
    }
    if (validResults.length > 0) {
      populateResults(validResults);
    } else {
      $('#search-results').append("<li>No matches found</li>");
    }
  });
}

function populateResults(result) {
  var filteredResults = [];
  var addedPermalinks = {};
  // remove multiple instances of the same page from the result set.
  for (var i=0, len=result.length; i<len; i++){
    // exclude search page from search results if the search query was 'search'
    if (!addedPermalinks.hasOwnProperty(result[i].item.permalink) &&
        (result[i].item.permalink.match(/\/search\//g) === null)){
      filteredResults.push(result[i]); addedPermalinks[result[i].item.permalink]
      = result[i].item.permalink; }
  }
  $.each(filteredResults, function (key, value) {
    var contents = value.item.contents;
    var snippet = "";
    var snippetHighlights = [];
    var tags = [];

    if (fuseOptions.tokenize) {
      snippetHighlights.push(searchQuery);
    } else {
      $.each(value.matches, function (matchKey, mvalue) {
        if (mvalue.key == "tags" || mvalue.key == "categories") {
          snippetHighlights.push(mvalue.value);
        } else if (mvalue.key == "contents") {
          start = mvalue.indices[0][0] - summaryInclude > 0 ? mvalue.indices[0][0] - summaryInclude : 0;
          end = mvalue.indices[0][1] + summaryInclude < contents.length ? mvalue.indices[0][1] + summaryInclude : contents.length;
          snippet += contents.substring(start, end);
          snippetHighlights.push(mvalue.value.substring(mvalue.indices[0][0], mvalue.indices[0][1] - mvalue.indices[0][0] + 1));
        }
      });
    }

    if (snippet.length < 1) {
      snippet += contents.substring(0, summaryInclude * 2);
      snippet += "...";
    }
    //pull template from hugo template definition
    var templateDefinition = $('#search-result-template').html();
    //replace values
    var commaSeparatedTags = (value.item.tags) ? value.item.tags.join(', ') : "";
    var commaSeparatedCategories = (value.item.categories) ? value.item.categories.join(', ') : "";
    var output = render(templateDefinition, { key: key, title: value.item.title, link: value.item.permalink, tags: commaSeparatedTags, categories: commaSeparatedCategories, snippet: snippet });

    $('#search-results').append(output);
  });
  $(".excerpt").mark(searchQuery);
}

function param(name) {
  return decodeURIComponent((location.search.split(name + '=')[1] || '').split('&')[0]).replace(/\+/g, ' ');
}

function render(templateString, data) {
  var conditionalMatches, conditionalPattern, copy;
  conditionalPattern = /\$\{\s*isset ([a-zA-Z]*) \s*\}(.*)\$\{\s*end\s*}/g;
  //since loop below depends on re.lastInxdex, we use a copy to capture any manipulations whilst inside the loop
  copy = templateString;
  while ((conditionalMatches = conditionalPattern.exec(templateString)) !== null) {
    if (data[conditionalMatches[1]]) {
      //valid key, remove conditionals, leave contents.
      copy = copy.replace(conditionalMatches[0], conditionalMatches[2]);
    } else {
      //not valid, remove entire section
      copy = copy.replace(conditionalMatches[0], '');
    }
  }
  templateString = copy;
  //now any conditionals removed we can do simple substitution
  var key, find, re;
  for (key in data) {
    find = '\\$\\{\\s*' + key + '\\s*\\}';
    re = new RegExp(find, 'g');
    templateString = templateString.replace(re, data[key]);
  }
  return templateString;
}
