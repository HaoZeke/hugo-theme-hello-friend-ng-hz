let
  sources = import ./nix/sources.nix;
  pkgs = import sources.nixpkgs { };
  stdenv = pkgs.stdenv;
  myGems = pkgs.bundlerEnv {
    name = "gems-for-some-project";
    gemdir = builtins.path { path = ./.; name = "hello-friend-ng-hz"; };
  };
  # haskellpkgs is a pinned version of nixpkgs
  # https://github.com/HaoZeke/haozeke.github.io/commit/e312ff597931fde168e4da6aec37164ef2616894#diff-a0745f7ed88cfac6058d1d4cfb57bc71127a28ad7c6756004142a90aab5ee99f
  hpkgs = import sources.haskellpkgs {};
  # Don't go beyond, or earlier than 2.13 until https://github.com/kaushalmodi/ox-hugo/issues/336 is closed
  nodePkgs = (pkgs.callPackage ./node.nix {
    inherit pkgs;
    nodejs = pkgs.nodejs-12_x;
  }).shell.nodeDependencies;
in pkgs.stdenv.mkDerivation {
  name = "rgoswami.me-0.1";

  srcs = builtins.path { path = ./.; name = "hello-friend-ng-hz"; };

  LANG = "en_US.UTF-8";

  LOCALE_ARCHIVE = "${pkgs.glibcLocales}/lib/locale/locale-archive";

  buildInputs = with pkgs; [
    # Shell
    bashInteractive
    direnv
    openssl
    # Build
    emacs
    hugo
    git
    curl
    nodejs
    postcss-cli
    # Ruby
    myGems
    (lowPrio myGems.wrappedRuby)
  ] ++ [ hpkgs.pandoc ];

  configurePhase = ''
    mkdir -p "$(pwd)/_libs"
    export R_LIBS_USER="$(pwd)/_libs"
    ln -s ${nodePkgs}/lib/node_modules ./node_modules
    export PATH="${nodePkgs}/bin:$PATH"
  '';

  buildPhase = ''
    # Build
    rake hugoBuild
  '';

  installPhase = "cp -r public $out";
}
