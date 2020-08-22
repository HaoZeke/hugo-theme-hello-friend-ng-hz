{ sources ? import ./nix/sources.nix }:
let
  pkgs = import sources.nixpkgs { };
  nodeEnv = pkgs.callPackage ./node-env.nix { };
  nodePackages = pkgs.callPackage ./node-packages.nix {
    globalBuildInputs = with pkgs; [ zsh ];
    inherit nodeEnv;
  };
in nodePackages.shell
