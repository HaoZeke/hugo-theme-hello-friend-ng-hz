let
  sources = import ./nix/sources.nix;
  pkgs = import sources.nixpkgs { };
  stdenv = pkgs.stdenv;
  myGems = pkgs.bundlerEnv {
    name = "gems-for-some-project";
    gemdir = ./.;
  };
  myHaskellEnv = pkgs.haskellPackages.ghcWithPackages
    (haskellPackages: with haskellPackages; [ pandoc_2_10_1 pandoc-citeproc ]);
  nodePkgs = (pkgs.callPackage ./node.nix {
    inherit pkgs;
    nodejs = pkgs.nodejs-12_x;
  }).shell.nodeDependencies;
in pkgs.stdenv.mkDerivation {
  name = "rgoswami.me-0.1";

  srcs = ./.;

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
    # Haskell
    myHaskellEnv
  ];

  configurePhase = ''
    mkdir -p "$(pwd)/_libs"
    export R_LIBS_USER="$(pwd)/_libs"
    eval $(egrep ^export ${myHaskellEnv}/bin/ghc)
    ln -s ${nodePkgs}/lib/node_modules ./node_modules
    export PATH="${nodePkgs}/bin:$PATH"
  '';

  buildPhase = ''
    # Build
    rake hugoBuild
  '';

  installPhase = "cp -r public $out";
}
