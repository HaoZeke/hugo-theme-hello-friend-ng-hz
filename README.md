# Hello Friend NG-HZ

A good way to see the capabilities of this theme [is this site](https://rgoswami.me).

## General information

This theme was highly inspired by the excellent [hello-friend](https://github.com/panr/hugo-theme-hello-friend), [hermit](https://github.com/Track3/hermit) and [hello-friend-ng](https://github.com/rhazdon/hugo-theme-hello-friend-ng/) themes.

## Features

- Theming: **dark/light mode**, depending on your preferences (dark is default, but you can change it)
- Great reading experience
  - (Default stack) [Bookerly](https://en.wikipedia.org/wiki/Bookerly), [Geomanist](https://www.atipofoundry.com/fonts/geomanist) and [Cascadia](https://github.com/microsoft/cascadia-code)
  - (Alternative) [Bookerly](https://en.wikipedia.org/wiki/Bookerly) with [**Inter UI font**](https://rsms.me/inter/), made by [Rasmus Andersson](https://rsms.me/about/) and [Hack](https://sourcefoundry.org/hack/)
- Hugo native code highlighting
- An easy way to modify the theme with Hugo tooling
- Fully responsive
- Support for social icons
- Supports multiple authors and listings
- Includes [Liberapay](https://liberapay.com/)
- Codefolding
- Author specific pages to support multiple authors
- Categories and tags with word-clouds
- Nix build system for hermetic builds
- Webmention support (**TBD**)
- Various Comment systems
  - [Utterances](https://github.com/utterance/utterances)
  - [Graphcomments](https://graphcomment.com/en/)
  - [CommentBox](https://commentbox.io/)
  - [Disqus](https://disqus.com/)
- Multiple Analytics Trackers
  - [Google](https://analytics.google.com/analytics/web/)
  - [Microsoft Clarity](https://clarity.microsoft.com/)
  - [GoatCounter](https://www.goatcounter.com/)
  - [Clicky](https://clicky.com/)
- Multiple Search Back-ends 
  - [stork](https://github.com/jameslittle230/stork)
  - [Fuse JS](https://fusejs.io/)
- Netlify spoiler (optional)

## How to start

You can download the theme manually by going to [https://github.com/HaoZeke/hugo-theme-hello-friend-ng-hz.git](https://github.com/HaoZeke/hugo-theme-hello-friend-ng-hz.git) and pasting it to `themes/hello-friend-ng-hz` in your root directory.

You can also clone it directly to your Hugo folder:

```bash
$ git clone https://github.com/HaoZeke/hugo-theme-hello-friend-ng-hz.git themes/hello-friend-ng-hz
```

If you don't want to make any radical changes, it's the best option, because you can get new updates when they are available. To do so, include it as a git submodule:

```bash
$ git submodule add https://github.com/HaoZeke/hugo-theme-hello-friend-ng-hz.git themes/hello-friend-ng-hz
```

### Stork Search
In order to use the `stork` search the build system needs to generate the `stork-posts.st` file.

``` bash
# exampleSite
cd exampleSite
hugo
stork build --input index.toml --output stork-posts.st
```

Where the stork installation instructions [are here](https://stork-search.net/).

### Fuse Search
The search is adopted from [this gist](https://gist.github.com/eddiewebb/735feb48f50f0ddd65ae5606a1cb41ae), along with these subsequent blog posts by [eddturtle](https://makewithhugo.com/add-search-to-a-hugo-site/) and [lonelydev](https://www.softwarecraftsperson.com/posts/2021-05-01-client-side-search-fuse/).

Note that though this requires less setup; it adds some additional weight (like `jquery`). However, it also includes some fuzzy searching logic.

## How to configure

The theme doesn't require any advanced configuration. Just copy the following config file.
Note: There are more options to configure. Take a look into the `config.toml` in `exampleSite`.

```toml
baseurl = "/"
languageCode = "en-us"
theme = "hello-friend-ng-hz"

[params]
  dateform        = "Jan 2, 2006"
  dateformShort   = "Jan 2"
  dateformNum     = "2006-01-02"
  dateformNumTime = "2006-01-02 15:04 -0700"

  # Set disableReadOtherPosts to true in order to hide the links to other posts.
  disableReadOtherPosts = false

  # Metadata mostly used in document's head
  description = "My new homepage or blog"
  keywords = "homepage, blog"
  images = [""]

  # Directory name of your blog content (default is `content/posts`)
  contentTypeName = "posts"

  # Default theme "light" or "dark"
  defaultTheme = "dark"
  
# Needed for search
[outputFormats]
[outputFormats.TOML]
mediaType = "application/toml"

[outputs]
  home = ["HTML", "RSS", "TOML", "JSON"]

[taxonomies]
  tag      = "tags"
  category = "categories"
  author   = "author"
  search   = "search" # Necessary!

[params.search]
  enable = true
  backend = "fuse" # can be stork or fuse

[languages]
  [languages.en]
    title = "Hello Friend NG HZ"
    subtitle = "A simple theme for Hugo"
    keywords = ""
    copyright = ""
    readOtherPosts = "Read other posts"

    [languages.en.params.logo]
      logoText = "hello friend ng hz"
      logoHomeLink = "/"
    # or
    #
    # path = "/img/your-example-logo.svg"
    # alt = "Your example logo alt text"

  # And you can even create generic menu
  [[menu.main]]
    identifier = "blog"
    name       = "Blog"
    url        = "/posts"
```

## How to run your site

From your Hugo root directory run:

```
$ hugo server -t hello-friend-ng-hz
```

and go to `localhost:1313` in your browser. From now on all the changes you make will go live, so you don't need to refresh your browser every single time.

## More things

### Built-in shortcodes

#### `image`

Properties:

- `src` (required)
- `alt` (optional)
- `position` (optional, default: `left`, options: [`left`, `center`, `right`])
- `style`

Example:

```golang
{{< image src="/img/hello.png" alt="Hello Friend" position="center" style="border-radius: 8px;" >}}
```

#### `figure`

Properties:

- `src` (required)
- `alt` (optional)
- `position` (optional, default: `left`, options: [`left`, `center`, `right`])
- `style` (optional)
- `caption` (optional)
- `captionPosition` (optional, default: `center`, options: [`left`, `center`, `right`]),
- `captionStyle` (optional)

Example:

```golang
{{< figure src="/img/hello.png" alt="Hello Friend" position="center" style="border-radius: 8px;" caption="Hello Friend!" captionPosition="right" captionStyle="color: red;" >}}
```

### Code highlighting

Supported languages: [Take a look here](https://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+css+clike+javascript+abap+actionscript+ada+apacheconf+apl+applescript+c+arff+asciidoc+asm6502+csharp+autohotkey+autoit+bash+basic+batch+bison+brainfuck+bro+cpp+aspnet+arduino+cil+coffeescript+clojure+ruby+csp+css-extras+d+dart+diff+markup-templating+docker+eiffel+elixir+elm+lua+erb+erlang+fsharp+flow+fortran+gcode+gedcom+gherkin+git+glsl+gml+go+graphql+groovy+less+handlebars+haskell+haxe+hcl+http+hpkp+hsts+ichigojam+icon+inform7+ini+io+j+java+scala+php+javastacktrace+jolie+n4js+markdown+json+julia+keyman+kotlin+latex+crystal+scheme+liquid+lisp+livescript+lolcode+makefile+django+matlab+mel+mizar+monkey+n1ql+typescript+nand2tetris-hdl+nasm+nginx+nim+nix+nsis+objectivec+ocaml+opencl+oz+parigp+parser+pascal+perl+php-extras+sql+powershell+processing+prolog+properties+protobuf+scss+puppet+pure+python+q+qore+r+jsx+renpy+reason+vala+rest+rip+roboconf+textile+rust+plsql+sass+stylus+smalltalk+smarty+soy+sas+twig+swift+yaml+tcl+haml+toml+tt2+pug+tsx+visual-basic+vbnet+velocity+verilog+vhdl+vim+wasm+wiki+xeora+xojo+xquery+tap)

By default the theme is using PrismJS to color your code syntax. All you need to do is to wrap you code like this:

<pre>
``` html
  // your code here
```
</pre>

### Favicon

Use [RealFaviconGenerator](https://realfavicongenerator.net/) to generate these files, put them into your site's static folder:

- android-chrome-192x192.png
- android-chrome-512x512.png
- apple-touch-icon.png
- favicon-16x16.png
- favicon-32x32.png
- favicon.ico
- mstile-150x150.png
- safari-pinned-tab.svg
- site.webmanifest

## Available Social Icons:

- [codechef](https://simpleicons.org/?q=codechef)
- [codepen](https://simpleicons.org/?q=codepen)
- [docker](https://simpleicons.org/?q=docker)
- [email](https://feathericons.com/?query=mail)
- [facebook](https://simpleicons.org/?q=facebook)
- gitbook
- [github](https://feathericons.com/?query=github)
- [gitlab](https://feathericons.com/?query=gitlab)
- [instagram](https://feathericons.com/?query=instagram)
- [kaggle](https://simpleicons.org/?q=kaggle)
- [keybase](https://simpleicons.org/?q=keybase)
- [mastodon](https://simpleicons.org/?q=mastodon)
- [linkedin](https://feathericons.com/?query=linked)
- [podcasts-apple](https://simpleicons.org/?q=podcast)
- [podcasts-google](https://simpleicons.org/?q=podcast)
- [slack](https://simpleicons.org/?q=slack)
- stackoverflow
- telegram
- twitch
- twitter
- youtube
- goodreads
- calendly
- google scholar
- orcid
- publons

If you need another one, just open an issue or create a pull request with the desired icon. :)

## Known issues

There is a bug in Hugo that sometimes causes the main page not to render correctly. The reason is an empty taxonomy part.
Related issue tickets: [!14](https://github.com/rhazdon/hugo-theme-hello-friend-ng/issues/14) [!59](https://github.com/rhazdon/hugo-theme-hello-friend-ng/issues/59).

Either you comment it out completely or you write the following in

```toml
[taxonomies]
  tag      = "tags"
  category = "categories"
```

## How to edit the theme

If you really want to edit the theme, you need to install Node dependencies. To do this, go to the theme directory (from your Hugo root directory):

```
$ cd themes/hello-friend-ng
```

and then run:

```{bash}
nix-shell
# For setting the right path
ln -s $NODE_PATH node_modules
```

## Third Party

- [modern-normalize](https://github.com/sindresorhus/modern-normalize)
- [Feather Open Source Icons](https://github.com/feathericons/feather)
- [Simple Icons](https://simpleicons.org/)
- [Flag Icon](https://github.com/lipis/flag-icon-css)

## License

Copyright © 2020--present Rohit Goswami

Copyright © 2019-2020 Djordje Atlialp

The theme is released under the MIT License.
