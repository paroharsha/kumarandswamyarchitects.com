#!/bin/bash
# usage: fetch.sh list.tsv outdir
while IFS=$'\t' read -r name id; do
  [ -s "$2/$name.jpg" ] && continue
  curl -sL --retry 2 -o "$2/$name.jpg" "https://drive.usercontent.google.com/download?id=$id&export=download"
done < "$1"
