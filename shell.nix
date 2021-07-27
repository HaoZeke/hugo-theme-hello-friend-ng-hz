let
  sources = import ./nix/sources.nix;
  pkgs = import sources.nixpkgs { };
  stdenv = pkgs.stdenv;
  nodePkgs = (pkgs.callPackage ./node.nix {
    inherit pkgs;
    nodejs = pkgs.nodejs-12_x;
  }).shell.nodeDependencies;
  # haskellpkgs is a pinned version of nixpkgs
  # https://github.com/HaoZeke/haozeke.github.io/commit/e312ff597931fde168e4da6aec37164ef2616894#diff-a0745f7ed88cfac6058d1d4cfb57bc71127a28ad7c6756004142a90aab5ee99f
  hpkgs = import sources.haskellpkgs {};
  # Don't go beyond, or earlier than 2.13 until https://github.com/kaushalmodi/ox-hugo/issues/336 is closed
  hook = ''
    ln -s ${nodePkgs}/lib/node_modules ./node_modules
    export PATH="${nodePkgs}/bin:$PATH"
  '';
in pkgs.mkShell {
  buildInputs = with pkgs; [
    # Shell
    bashInteractive
    direnv
    openssl
    # Build
    hugo
    git
    curl
    nodejs
    postcss-cli
  ] ++ [ hpkgs.pandoc ];
  shellHook = hook;
  GIT_SSL_CAINFO = "${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt";
  LOCALE_ARCHIVE = stdenv.lib.optionalString stdenv.isLinux
    "${pkgs.glibcLocales}/lib/locale/locale-archive";
}
