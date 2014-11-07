## CKAN-govdata Provider for [Koop](https://github.com/Esri/koop)
-----------

This provider makes it possible to access [govdata's ckan JSON API](https://www.govdata.de/metadatenschema) as either GeoJSON or an Esri FeatureService. This is particular useful for making maps and doing analysis on the web.

## Installation
To install/use this provider you first need a working installation of [Koop](https://github.com/Esri/koop). Then from within the koop directory you'll need to run the following:
 `npm install https://github.com/schlomm/koop-ckan_govdata/tarball/master`
### Installation
1. Perform the following steps to install the dwd-koop provider. Install [koop](https://github.com/Esri/koop) including its dependencies for a working and needed environment. 
2. Be sure that koop is not running before running this.   
3. Install koop-ckan govdata with the koop-dir via: `npm install https://github.com/schlomm/koop-ckan_govdata/tarball/master` 4. Start koop-server via `node server.js` or `nohup node server.js > output.log &`
5. Register govdata-Portal for the ckan-govdata koop provider: `curl --data "host=http://www.govdata.de&id=govdata" localhost:1337/ckan_govdata`


## Use govdata CKAN API
Because govdata's CKAN API does not follow some  'standards' of other ckan portals, this koop-provider is only an adapted one for the specific properties of govdata's structure. You do not need to register any host or instance like it is possible/needed in the overal [koop-ckan](https://github.com/chelm/koop-ckan). Once this provider's been installed you are ready for takeoff.  
What you'll need for that request to work is a dataset ID and a the URL of the ckan instance. The ID is what you'll use to reference datasets that come from ckan in Koop.   
To make sure this works you can visit: http://localhost/ckan-govdata and you should see the govdata.de host as a listed item.

## Access Govdata-CKAN Data
To get a list of all datasets on govdata.de, you can use the this URL:  
`your_server:port/ckan_govdata/govdata/<id>`  
To access a dataset hosted on govdata's, you'll need a "dataset id" from govdata's CKAN endpoint, which could be referenced in Koop like so:   
`your_server:port/ckan_govdata/govdata/<id>`

###### Used ckan-govdata schema and links which might be important.
- `https://www.govdata.de/ckan/api/action/package_list?-d` 
	- List all available datasets in the needed result-array, which is used [here](https://github.com/schlomm/koop-ckan_govdata/blob/master/models/ckan_govdata.js#L32).
- `https://www.govdata.de/ckan/api/action/package_show?id=glascontainer-hro-hro`
	- Shows a dataset with all its metadata, which is used [here](https://github.com/schlomm/koop-ckan_govdata/blob/master/models/ckan_govdata.js#L31) for parsing the metatdata for available "csv"-files.
- `https://www.govdata.de/ckan/api/3/action/package_search?q=keyword`
	- Searches for a specific phrase within all datasets.
- For more information, check the the official [CKAN API](http://docs.ckan.org/en/ckan-1.8.2/apiv3.html?highlight=package_list#parameters)

###### Standard ckan schema:
- portalURL/api/3/action/package_list
- portalURL/api/3/action/package_show?id=datasetID
- portalURL/api/3/action/package_search?q=keyword



## Examples 
Here are a few example datasets of data hosted in govdata's ckan as csv and in the right format, which can be processed via Koop: 

* oberbuergermeisterwahl_2012-hro-hro
* oberbuergermeisterwahl_2012-hro-hro
* simple_search_wwwberlindetestboaltglascontainer
* bremen236_c_4419_de
* friedhoefe-hro-hro
* poststellen-hro-hro
* reisebusparkplaetze-hro-hro
* reisebusterminals-hro-hro


Please note that most of govdata's datasets are not well formated and that those does not follow necessary standards. Especially the needed .csv-files do not work in the most cases, because of a wrong formats, which results in parsing errors for koop. Although the above mentioned example is useable, you are not able to make a Preview from it, because the needed geometries porperties are put in the wrong array. 

#### Differences between [koop-ckan_govdata](https://github.com/schlomm/koop-ckan_govdata) and [koop-ckan](https://github.com/chelm/koop-ckan) 

 - URL to CKAN Endpoint was changed (check koop-ckan_govdata/models/ckan_govdata.js)
 - Fixed error for csv parsing
 - Routing
 - Registering
  

## Credits
[koop-ckan_govdata](https://github.com/schlomm/koop-ckan_govdata) is a fork from [koop-ckan](https://github.com/chelm/koop-ckan) with some edits to allow querying govdata.de. Thanks to @chelm for this nice piece of software.  
