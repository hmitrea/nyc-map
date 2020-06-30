#!/bin/bash
#echo Hello World


geo2topo -n \
  adnan.geojson \
  > ca-tracts-topo.json

  toposimplify -p 1 -f \
  < ca-tracts-topo.json \
  > ca-simple-topo.json

  topoquantize 1e5 \
  < ca-simple-topo.json \
  > ca-quantized-topo.json

  # topomerge --mesh -f 'a !== b' counties=counties \
  # < ca-merge-topo.json \
  # > ca-topo.json
