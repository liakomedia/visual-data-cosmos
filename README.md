# Visual Data Cosmos — the observable universe in real 3D

**Live: [vdata.liako.eu/cosmos](https://vdata.liako.eu/cosmos/)**

An interactive 3D map of the observable universe: ~131,000 objects from 20+ astronomical
catalogues, every one at its **true sky position** (RA / Dec, as measured from Earth) and
its published distance on a log-compressed radial ruler — from Phobos at its exact 2.77
Mars radii out to JADES-GS-z14-0 near the edge of the observable universe.

- 9,096 naked-eye stars (Yale Bright Star Catalogue), coloured by spectral class
- 19,983 galaxies from SDSS DR17 — the measured cosmic web, coloured by redshift
- Globular clusters, dwarf galaxies, open clusters, pulsars, supernova remnants,
  planetary nebulae, quasars, gravitational-wave events
- Confirmed exoplanets (NASA Exoplanet Archive), citizen-science planet candidates
  (ExoFOP-TESS, with per-point discoverer credit) and Backyard Worlds brown dwarfs
- Galaxies flattened to their real morphology — the Milky Way's disc is oriented to the
  true north galactic pole
- A live heliocentric Solar System with true moon systems
- Dark matter, dark energy, antimatter and the intergalactic medium as volumetric fields

Every dataset is cited in the in-app **✦ References** panel and in [DATA.md](DATA.md).

## Running locally

No build step — plain JavaScript, [Three.js](https://threejs.org) and
[3d-force-graph](https://github.com/vasturiano/3d-force-graph) from CDN (pinned to matching
revisions: a mismatch between the global THREE and the one bundled in 3d-force-graph makes
textures sample black).

```bash
python3 -m http.server 8000   # → http://localhost:8000/
```

`scripts/` holds the one-shot parsers that turned the raw catalogue downloads into the
compact JS data files the app ships with.

## Licence

Code is [MIT](LICENSE). **Not covered**: the catalogue-derived data files (see
[DATA.md](DATA.md) — they remain under their sources' terms), the NASA / Solar System
Scope imagery, and the LIAKO name and branding.

Sister projects: [visual-data-solar](https://github.com/liakomedia/visual-data-solar) ·
[visual-data-art](https://github.com/liakomedia/visual-data-art) — compiled by
[Liako](https://liako.eu).
