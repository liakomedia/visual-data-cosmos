# Data sources — Visual Data Cosmos

Every dataset used by the app, with its source and citation. The data files shipped in
this repository are compact derived extracts of these sources; they are **not** covered by
the repository's MIT licence and remain under the terms of the original providers. If you
reuse them, cite the sources below. Compiled by [Liako](https://liako.eu).

| Dataset | In-repo file | Source | Citation |
|---|---|---|---|
| Bright stars (9,096, all naked-eye) | `includes/js/stars-bsc.js` | [Yale Bright Star Catalogue, 5th ed.](http://tdc-www.harvard.edu/catalogs/bsc5.html) | Hoffleit & Warren 1991 |
| Galaxy survey (19,983, uniform sample) | `includes/js/galaxies-sdss.js` | [SDSS DR17 SkyServer](https://www.sdss.org) SpecObj | Abdurro'uf et al. 2022 (SDSS DR17) |
| Milky Way globular clusters (145) | `includes/js/members.js` | [VizieR VII/202](https://vizier.cds.unistra.fr/viz-bin/VizieR?-source=VII/202) | Harris 1996 (2010 ed.) |
| Local Group galaxies (101) | `includes/js/members.js` | [VizieR J/AJ/144/4](https://vizier.cds.unistra.fr/viz-bin/VizieR?-source=J/AJ/144/4) | McConnachie 2012 |
| Virgo & Coma cluster members (542 + 958) | `includes/js/members.js` | SDSS DR17 targeted queries | Abdurro'uf et al. 2022 |
| M31 globular clusters (625 confirmed) | `includes/js/members.js` | [VizieR V/143 (RBC v5)](https://vizier.cds.unistra.fr/viz-bin/VizieR?-source=V/143) | Galleti et al., Revised Bologna Catalogue v5 |
| M33 star clusters | `includes/js/members2.js` | [VizieR J/ApJ/720/1674](https://vizier.cds.unistra.fr/viz-bin/VizieR?-source=J/ApJ/720/1674) | San Roman et al. 2010 |
| LMC/SMC clusters & associations (9,305) | `includes/js/members2.js` | [VizieR J/MNRAS/389/678](https://vizier.cds.unistra.fr/viz-bin/VizieR?-source=J/MNRAS/389/678) | Bica et al. 2008 |
| M87 globular clusters (1,664) | `includes/js/members2.js` | [VizieR J/ApJS/197/33](https://vizier.cds.unistra.fr/viz-bin/VizieR?-source=J/ApJS/197/33) | Strader et al. 2011 |
| M81 field/globulars, M51, M82, M101, Cen A, Sombrero, Antennae clusters | `includes/js/members3.js`, `members4.js` | VizieR: J/AJ/109/1055, J/ApJ/824/71, J/ApJ/766/20, J/ApJ/805/160, J/AJ/134/494, J/AJ/132/1593, J/AJ/140/75, J/ApJS/73/661 | Perelmuter & Racine 1995; Chandar et al. 2016; Lim et al. 2013; Simanton et al. 2015; Woodley et al. 2007; Spitler et al. 2006; Whitmore et al. 2010; Hodge et al. 1990 |
| Pleiades & Hyades member stars (1,841) | `includes/js/members4.js` | [Gaia DR2 open clusters, J/A+A/616/A10](https://vizier.cds.unistra.fr/viz-bin/VizieR?-source=J/A%2bA/616/A10) | Gaia Collaboration 2018 |
| Globular-cluster star fields (4×3,200) | `includes/js/members4.js` | [ESA Gaia DR3, VizieR I/355](https://vizier.cds.unistra.fr/viz-bin/VizieR?-source=I/355) | Gaia Collaboration 2023 |
| Local Volume galaxies | `includes/js/deep*.js` | [VizieR J/AJ/145/101](https://vizier.cds.unistra.fr/viz-bin/VizieR?-source=J/AJ/145/101) | Karachentsev et al. 2013 |
| Open clusters (Milky Way) | `includes/js/deep*.js` | [VizieR J/A+A/640/A1](https://vizier.cds.unistra.fr/viz-bin/VizieR?-source=J/A%2bA/640/A1) | Cantat-Gaudin et al. 2020 (Gaia) |
| Confirmed exoplanets | `includes/js/deep*.js` | [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu) | NASA Exoplanet Archive (Caltech/IPAC) |
| Pulsars | `includes/js/deep*.js` | [ATNF Pulsar Catalogue](https://www.atnf.csiro.au/research/pulsar/psrcat/) | Manchester et al. 2005 |
| Quasars | `includes/js/deep*.js` | [SDSS DR17](https://www.sdss.org) | Abdurro'uf et al. 2022 |
| Supernova remnants | `includes/js/deep*.js` | [VizieR VII/278](https://vizier.cds.unistra.fr/viz-bin/VizieR?-source=VII/278) | Green 2019 |
| Planetary nebulae | `includes/js/deep*.js` | [VizieR V/84 (Strasbourg–ESO)](https://vizier.cds.unistra.fr/viz-bin/VizieR?-source=V/84) | Acker et al. 1992 |
| Gravitational-wave events | `includes/js/deep*.js` | [GWTC via GWOSC](https://gwosc.org) | LIGO/Virgo/KAGRA GWTC |
| Galaxy redshift survey (all-sky) | `includes/js/deep3.js` | [2MASS Redshift Survey (2MRS)](http://tdc-www.harvard.edu/2mrs/) | Huchra et al. 2012 |
| Fast radio bursts | `includes/js/deep3.js` | [CHIME/FRB Catalog 1](https://www.chime-frb.ca/catalog) | CHIME/FRB Collaboration 2021 |
| Lyman-α emitters / deep survey | `includes/js/deep2.js` | [HETDEX](https://hetdex.org) | Mentuch Cooper et al. 2023 |
| Solar System small bodies (named comets & asteroids) | `includes/js/data.js` | [NASA/JPL Small-Body Database](https://ssd.jpl.nasa.gov/tools/sbdb_query.html) | JPL SBDB |
| Community exoplanet candidates (3,964) | `includes/js/exo2.js` | [ExoFOP-TESS Community TOIs](https://exofop.ipac.caltech.edu/tess/view_ctoi.php) | NASA / Caltech-IPAC ExoFOP, with per-point discoverer credit |
| Citizen-science brown dwarfs (582) | `includes/js/exo2.js` | [Backyard Worlds: Planet 9](https://www.backyardworlds.org) via [J/ApJS/253/7](https://vizier.cds.unistra.fr/viz-bin/VizieR?-source=J/ApJS/253/7) | Kirkpatrick et al. 2021 |
| Extragalactic planet candidates (3) | `includes/js/data.js` | literature | Di Stefano et al. 2021 (M51-ULS-1b); An et al. 2004 (PA-99-N2); Dai & Guerras 2018 (RX J1131−1231) |
| Named-object positions, distances, morphology | `includes/js/data.js` | [NASA/IPAC NED](https://ned.ipac.caltech.edu) · [SIMBAD (CDS)](https://simbad.cds.unistra.fr/simbad/) | Acknowledge NED (Caltech/JPL/NASA) and SIMBAD (CDS, Strasbourg) |
| Solar System bodies (masses, diameters, orbits) | `includes/js/data.js` | [NASA NSSDCA](https://nssdc.gsfc.nasa.gov/planetary/factsheet/) · [JPL SSD](https://ssd.jpl.nasa.gov) | NSSDCA; JPL Solar System Dynamics |

## Imagery (`includes/images/tex/`)

| Imagery | Source | Licence |
|---|---|---|
| Sun, planets, the Moon (2k maps) | [Solar System Scope](https://www.solarsystemscope.com/textures/) | **CC BY 4.0** |
| Moon & dwarf-planet global mosaics | NASA/JPL/USGS — Voyager, Galileo, Cassini, New Horizons & Dawn missions, via [Stellarium](https://github.com/Stellarium/stellarium/tree/master/textures) | NASA imagery: public domain; check per-file notes in Stellarium |

## Regenerating the data

`scripts/` holds the one-shot Node.js parsers that turned raw catalogue downloads
(VizieR TSV, SDSS SkyServer CSV, the Yale BSC fixed-width file, NASA archive APIs) into
the compact JS arrays the app ships with — kept for transparency and reproducibility.
