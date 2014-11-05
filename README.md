## CKAN-govdata Provider for [Koop](https://github.com/Esri/koop)
-----------

This provider makes it possible to access [govdata's ckan JSON API](https://www.govdata.de/metadatenschema) as either GeoJSON or an Esri FeatureService. This is particular useful for making maps and doing analysis on the web.

## Installation
To install/use this provider you first need a working installation of [Koop](https://github.com/Esri/koop). Then from within the koop directory you'll need to run the following:
 `npm install https://github.com/schlomm/koop-ckan_govdata/tarball/master`
### Installation
Perform the following steps to install the dwd-koop provider. Install [koop](https://github.com/Esri/koop) including its dependencies for a working and needed environment. 
Clone the repo  
`git clone git@github.com:Esri/koop.git`  
Enter the koop project directory  
`cd koop`  
Install koop-server and node.js dependencies  
`npm install`  
Install koop-ckan_govdata with the koop-dir via  
`npm install https://github.com/schlomm/koop-ckan_govdata/tarball/master` 

## Use govdata CKAN API
Because govdata's CKAN API does not follow some  'standards' of other ckan portals, this koop-provider is only an adapted one for the specific properties of govdata's structure. You do not need to register any host or instance like it is possible/needed in the overal [koop-ckan](https://github.com/chelm/koop-ckan). Once this provider's been installed you are ready for takeoff.  
What you'll need for that request to work is a dataset ID and a the URL of the ckan instance. The ID is what you'll use to reference datasets that come from ckan in Koop.   
To make sure this works you can visit: http://localhost/ckan-govdata and you should see the govdata.de host as a listed item.

## Access Govdata-CKAN Data
To get a list of all datasets on govdata.de, you can use the this URL:  
`your_server:port/ckan_govdata/govdata/<id>`  
To access a dataset hosted on govdata's, you'll need a "dataset id" from govdata's CKAN endpoint, which could be referenced in Koop like so:   
`your_server:port/ckan_govdata/govdata/<id>`


## Examples 
Here's a few examples of data hosted in ckan and accessed via Koop: 

* `GeoJSON: your_server:port/ckan_govdata/govdata/oberbuergermeisterwahl_2012-hro-hro`
* `FeatureService: your_server:port/ckan_govdata/govdata/oberbuergermeisterwahl_2012-hro-hro/FeatureService`

Please note that most of govdata's datasets are not well formated and that those does not follow necessary standards. Especially the needed .csv-files do not work in the most cases, because of a wrong formats, which results in parsing errors for koop. Although the above mentioned example is useable, you are not able to make a Preview from it, because the needed geometries porperties are put in the wrong array. 

#### Differences between [koop-ckan_govdata](https://github.com/schlomm/koop-ckan_govdata) and [koop-ckan](https://github.com/chelm/koop-ckan) 

 - URL to CKAN Endpoint was changed (check koop-ckan_govdata/models/ckan_govdata.js)
 - Fixed error for csv parsing
 - Routing
 - Registering
  
###### Some links, which could be important for further work:
Govdata Links:

 - `https://www.govdata.de/ckan/api/3/action/package_list?-d` -> A list of all available pakages.
 - `https://www.govdata.de/ckan/api/3/action/package_show?id=blablabla` 
 - `https://www.govdata.de/ckan/api/3/action/package_search or /api/3/action/package_search?q=blablbala`
 - `https://www.govdata.de/ckan/api/action/package_show?id=9c406e08-a5bc-4e15-ae07-5d942a64c731`
 - `https://www.govdata.de/ckan/api/rest/dataset/oberbuergermeisterwahl_2012-hro-hro`

## Credits
[koop-ckan_govdata](https://github.com/schlomm/koop-ckan_govdata) is a fork from [koop-ckan](https://github.com/chelm/koop-ckan) with some edits to allow querying govdata.de.  Thanks to @chelm for this nice piece of software.  


